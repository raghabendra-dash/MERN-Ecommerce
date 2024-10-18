import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Actions from "./Actions";
import SeoData from "../../SEO/SeoData";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const AllProducts = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/product/seller-product`,
          {
            headers: {
              Authorization: auth.token,
            },
          },
        );

        res.status === 201 && setProducts(res.data.products);
        setLoading(false);
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
    //initial call to fetch data from server
    fetchData();
  }, [auth.token]);
  //update products details on client side after deletion
  const updateDeletedProduct = (id) => {
    setProducts((prevProducts) => {
      // Filter out the deleted product from the previous products
      return prevProducts.filter((product) => product._id !== id);
    });
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full">
              <img
                draggable="false"
                src={params.row.image}
                alt={params.row.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 0.1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 70,
      flex: 0.1,
      renderCell: (params) => {
        return (
          <>
            {params.row.stock < 10 ? (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 p-1 font-[500] text-red-700">
                {params.row.stock}
              </span>
            ) : (
              <span className="">{params.row.stock}</span>
            )}
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params.row.price?.toLocaleString()}</span>;
      },
    },
    {
      field: "discount_price",
      headerName: "Discount Price",
      type: "number",
      minWidth: 100,
      headerAlign: "left",
      align: "left",
      flex: 0.2,
      renderCell: (params) => {
        return <span>₹{params.row.discount_price?.toLocaleString()}</span>;
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.1,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <Rating
            readOnly
            value={params.row.rating}
            size="small"
            precision={0.5}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Actions
            name={params.row.name}
            updateDeletedProduct={updateDeletedProduct}
            id={params.row.id}
          />
        );
      },
    },
  ];

  const rows = [];

  products?.forEach((item) => {
    rows.unshift({
      id: item._id,
      name: item.name,
      image: item.images[0]?.url,
      category: item.category,
      stock: item.stock,
      price: item.price,
      discount_price: item.discountPrice,
      rating: item.ratings,
    });
  });
  return (
    <>
      <SeoData title="All Products - BuzzBuy Seller" />

      {loading ? (
        <Spinner />
      ) : (
        <div className="relative h-full w-full p-2">
          <div className="flex items-center justify-between p-2">
            <h1 className="font-semibold uppercase">products</h1>
            <Link
              to="/admin/dashboard/add-product"
              className="rounded bg-primary px-4 py-2 font-medium text-white shadow hover:shadow-lg"
            >
              New Product
            </Link>
          </div>
          <div className="h-full w-full">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              disableSelectIconOnClick
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
