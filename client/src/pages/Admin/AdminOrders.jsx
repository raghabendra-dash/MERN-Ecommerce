import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useAuth } from "../../context/auth";
import SeoData from "../../SEO/SeoData";
import orderNotFound from "../../assets/images/order-not-found.png";

const AdminOrders = () => {
  const { auth } = useAuth();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // fetch orders from server
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/admin-orders`,
          {
            headers: {
              Authorization: auth?.token,
            },
          },
        );
        if (response?.data?.orders) {
          setOrders(response.data.orders);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [auth?.token]);

  return (
    <>
      <SeoData title="Admin Orders | BuzzBuy" />

      <main className="w-full p-2 md:px-8">
        {/* <!-- row --> */}
        {/* <!-- orders column --> */}
        <div className="flex items-center w-full">
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex w-full flex-col gap-3 overflow-hidden pb-5">
              {/* <!-- search hbar --> */}
              <form
                // onSubmit={searchOrders}
                className="mx-auto mb-2 flex w-full items-center justify-between rounded border bg-white hover:shadow-md sm:w-10/12"
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  name="search"
                  placeholder="Search your orders here"
                  className="flex-1 rounded-l p-2 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="flex h-full items-center gap-1 rounded-r bg-primary px-1 py-2.5 text-sm text-white hover:bg-primary/90 sm:px-4"
                >
                  <SearchIcon sx={{ fontSize: "20px" }} />
                  <p className="text-[10px] sm:text-[14px]">Search</p>
                </button>
              </form>
              {/* <!-- search bar --> */}

              {orders?.length === 0 && (
                <div className="flex flex-col items-center gap-2 rounded-sm bg-white p-10">
                  <img
                    draggable="false"
                    src={orderNotFound}
                    alt="Empty Orders"
                    className="h-[200px] w-[200px]"
                  />
                  <span className="text-lg font-medium">
                    Sorry, no orders found
                  </span>
                  <p>Get some orders first!</p>
                </div>
              )}

              {orders
                ?.map((order) => {
                  const {
                    _id,
                    orderStatus,
                    buyer,
                    createdAt,
                    paymentId,
                    shippingInfo,
                    amount,
                    products,
                  } = order;
                  return products.map((item, index) => (
                    <OrderItem
                      item={item}
                      key={index}
                      orderId={_id}
                      orderStatus={orderStatus}
                      createdAt={createdAt}
                      paymentId={paymentId}
                      buyer={buyer}
                      shippingInfo={shippingInfo}
                      amount={amount}
                    />
                  ));
                })
                .reverse()}
            </div>
          )}
        </div>
        {/* <!-- orders column --> */}
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default AdminOrders;
