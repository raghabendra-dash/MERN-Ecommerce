/* eslint-disable react/jsx-key */
import Pagination from "@mui/material/Pagination";
import { useState, useEffect } from "react";
import Product from "../../components/ProductListing/Product";
import { useLocation } from "react-router-dom";
import Spinner from "./../../components/Spinner";
import axios from "axios";
import SeoData from "../../SEO/SeoData";
import SideFilter from "../../components/ProductListing/SideFilter";
import { makeStyles } from "@mui/styles";
import productNotFound from "../../assets/images/order-not-found.png";
import { triggerCustomToast } from "../../components/Toast/CustomToast";
import { useWishlist } from "../../context/wishlist";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#DB4444",
    },
  },
}));

const Products = () => {
  const location = useLocation();
  // const { auth, isAdmin } = useAuth();
  const { wishlistItems, setWishlistItems } = useWishlist();
  const classes = useStyles();

  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : "",
  );
  const [ratings, setRatings] = useState(0);
  const [products, setProducts] = useState([]);

  // pagination----->
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(products?.length);
  const productsPerPage = 8;
  // Calculate the total number of pages
  const totalPages = Math.ceil(productsCount / productsPerPage);
  // Calculate the range of products to display on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  //updating the products to display on current page
  const currentProducts = products.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    //fetching filtered products from sever
    const fetchFilteredData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/product/filtered-products`,
          {
            params: {
              category: category,
              priceRange: [
                parseInt(price[0].toFixed()),
                parseInt(price[1].toFixed()),
              ],
              ratings: ratings,
            },
          },
        );
        // console.log(res.data);

        res.status === 404 && triggerCustomToast("error", "No Products Found!");

        res.status === 201 && setProducts(res.data.products);
        setLoading(false);
        setProductsCount(res.data.products.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);

        //server error
        error.response?.status === 500 &&
          triggerCustomToast(
            "error",
            "Something went wrong! Please try after sometime.",
          );
      }
    };
    fetchFilteredData();
  }, [price, category, ratings]);

  return (
    <>
      <SeoData title="All Products | BuzzBuy" />

      <main className="w-full py-2">
        {/* <!-- row --> */}
        <div className="mx-auto mt-2 flex gap-3 sm:mx-3">
          {/* <!-- sidebar column  --> */}
          <SideFilter
            price={price}
            category={category}
            ratings={ratings}
            setPrice={setPrice}
            setCategory={setCategory}
            setRatings={setRatings}
          />
          {/* <!-- sidebar column  --> */}

          {/* <!-- search column --> */}
          <div className="relative flex-1">
            {/* No products found */}
            {!loading && products?.length === 0 && (
              <div className="flex flex-col items-center justify-start gap-5 rounded-sm bg-white p-6 shadow-sm sm:min-h-[750px] sm:p-16">
                <img
                  draggable="true"
                  className="h-[250px] w-[250px] object-contain"
                  src={productNotFound}
                  alt="Search Not Found"
                />
                <h1 className="text-2xl font-medium text-gray-900">
                  Sorry, no results found!
                </h1>
                <p className="-mt-2 text-center text-base text-slate-500 sm:text-xl">
                  Please check the spelling or try searching for something else.
                </p>
              </div>
            )}

            {loading ? (
              <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner />
              </div>
            ) : (
              products?.length !== 0 && (
                <div className="flex w-full flex-col items-center justify-center gap-2 overflow-hidden bg-white pb-4">
                  <div className="grid min-h-[750px] w-full grid-cols-1 place-content-start gap-1 divide-y-2 overflow-hidden pb-4 sm:grid-cols-4 sm:divide-y-0">
                    {currentProducts?.map((product) => (
                      <Product
                        key={product._id}
                        {...product}
                        wishlistItems={wishlistItems}
                        setWishlistItems={setWishlistItems}
                      />
                    ))}
                  </div>
                  {productsCount > productsPerPage && (
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      classes={{ ul: classes.ul }}
                      onChange={handlePageChange}
                      color="standard"
                    />
                  )}
                </div>
              )
            )}
          </div>
          {/* <!-- search column --> */}
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default Products;
