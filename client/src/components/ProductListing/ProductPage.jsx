/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "../../pages/Home/ProductsListing/ProductSlider.jsx";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { fashionProducts } from "../../utils/fashion";
import { electronicProducts } from "../../utils/electronics";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { useCart } from "../../context/cart";
import SeoData from "../../SEO/SeoData";
import ProductImage from "../Product Page/ProductImage.jsx";
import ProductDescription from "../Product Page/ProductDescription.jsx";
import { triggerCustomToast } from "../Toast/CustomToast.js";
import { useWishlist } from "../../context/wishlist.jsx";

const ProductDetails = () => {
  const { auth } = useAuth();
  const { cartItems, addItems } = useCart();
  const { wishlistItems, setWishlistItems } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});

  const { productId } = useParams();

  const addToCartHandler = () => {
    const item = {
      productId: product._id,
      name: product.name,
      stock: product.stock,
      image: product.images[0].url,
      brandName: product.brand.name,
      price: product.price,
      discountPrice: product.discountPrice,
      seller: product.seller,
    };
    addItems(item, 1);
  };

  //fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/product/${productId}`,
        );
        // console.log(res.data.product);
        res.status === 201 && setProduct(res.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        // product not found
        error.response?.status === 404 &&
          triggerCustomToast("error", "Product Not Found!");

        //server error
        error.response?.status === 500 &&
          triggerCustomToast(
            "error",
            "Something went wrong! Please try after sometime.",
          );
      }
    };
    fetchProduct();
  }, [productId]);

  let itemInWishlist = wishlistItems?.find((id) => id === productId);
  // Optimistic UI update
  const updateWishlistUI = (add) => {
    setWishlistItems((prev) =>
      add
        ? [...prev, product._id]
        : prev.filter((item) => item !== product._id),
    );
  };

  const addToWishlistHandler = async () => {
    let type = itemInWishlist ? "remove" : "add";
    try {
      // Update the UI before the API call
      updateWishlistUI(type === "add");
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
        {
          productId: productId,
          type,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        },
      );
      // console.log(res);
      res.status === 201 &&
        triggerCustomToast(
          "success",
          type === "add"
            ? "Product Added To Wishlist"
            : "Product Removed From Wishlist",
        );
    } catch (error) {
      console.log(error);
      // Revert UI update if there is an error
      updateWishlistUI(type !== "add");

      if (error.message.includes("401")) {
        triggerCustomToast("error", "Please Login First");
      } else {
        triggerCustomToast("error", "Something went wrong!");
      }
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SeoData title={product?.name} />
          <ScrollToTopOnRouteChange />
          <main className="w-full">
            {/* <!-- product image & description container --> */}
            <div className="relative flex h-full flex-col items-start bg-white sm:p-2 lg:flex-row">
              {/* <!-- image wrapper --> */}
              <ProductImage
                product={product}
                itemInWishlist={itemInWishlist}
                cartItems={cartItems}
                productId={productId}
                addToWishlistHandler={addToWishlistHandler}
                addToCartHandler={addToCartHandler}
              />
              {/* <!-- image wrapper --> */}

              {/* <!-- product desc wrapper --> */}
              <ProductDescription product={product} productId={productId} />
              {/* <!-- product desc wrapper --> */}
              {/* <!-- product image & description container --> */}
            </div>

            {/* Sliders */}
            <div className="mt-6 flex flex-col gap-3">
              <ProductSlider
                title={"Recommendation"}
                products={[...fashionProducts, ...electronicProducts]}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
