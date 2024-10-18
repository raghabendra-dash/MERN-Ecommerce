/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tracker from "./Tracker";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import SeoData from "../../../SEO/SeoData";

const OrderDetails = () => {
  const params = useParams();
  const orderId = params.id;

  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    // fetch order detail from server
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/v1/user/order-detail?orderId=${orderId}`,
          {
            headers: {
              Authorization: auth?.token,
            },
          },
        );
        if (response?.data?.orderDetails) {
          setOrderDetails(...response.data.orderDetails);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [auth?.token, orderId]);

  const amount = orderDetails?.amount;
  const orderItems = orderDetails?.products;
  const buyer = orderDetails?.buyer;
  const paymentId = orderDetails?.paymentId;
  const shippingInfo = orderDetails?.shippingInfo;
  const createdAt = orderDetails?.createdAt;
  const orderStatus = orderDetails?.orderStatus;

  return (
    <>
      <SeoData title="Order Details | BuzzBuy" />

      <main className="w-full py-2 sm:py-8">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              <div className="flex min-w-full flex-col rounded-sm bg-white shadow sm:flex-row">
                <div className="border-r sm:w-1/2">
                  <div className="mx-10 my-8 flex flex-col gap-3">
                    <h3 className="text-md font-[600]">Delivery Address</h3>
                    <h4 className="font-medium">{buyer?.name}</h4>
                    <p className="text-sm">{`${shippingInfo?.address}, ${shippingInfo?.landmark}, ${shippingInfo?.city}, ${shippingInfo?.state} - ${shippingInfo?.pincode}`}</p>
                    <div className="flex gap-2 text-sm">
                      <p className="font-medium">Email</p>
                      <p>{buyer?.email}</p>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <p className="font-medium">Phone Number</p>
                      <p>{shippingInfo?.phoneNo}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="mx-10 my-8 flex flex-col gap-3">
                    <h3 className="text-md font-[600]">More Actions</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[14px]">Download Invoice</span>
                      <Link
                        to="/"
                        className="w-[150px] rounded-sm border-[1px] border-gray-200 bg-white px-4 py-2 text-center text-[12px] font-[600] uppercase text-primary transition-all duration-200 ease-in-out hover:bg-primary hover:text-white"
                      >
                        Download
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {orderItems?.map((item) => {
                const { _id, image, name, discountPrice, quantity, seller } =
                  item;

                return (
                  <div
                    className="flex min-w-full flex-col rounded-sm bg-white px-2 py-5 shadow sm:flex-row"
                    key={_id}
                  >
                    <div className="flex flex-col gap-2 sm:w-1/2 sm:flex-row">
                      <div className="h-20 w-full sm:w-32">
                        <img
                          draggable="false"
                          className="h-full w-full object-contain"
                          src={image}
                          alt={name}
                        />
                      </div>
                      <div className="flex flex-col gap-1 overflow-hidden">
                        <p className="text-sm">
                          {name.length > 60
                            ? `${name.substring(0, 60)}...`
                            : name}
                        </p>
                        <p className="mt-2 text-xs text-gray-600">
                          Quantity: {quantity}
                        </p>
                        <p className="text-xs text-gray-600">
                          Seller: {seller?.name}
                        </p>
                        <span className="font-medium">
                          ₹{(quantity * discountPrice).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-600">
                          Payment Id: {paymentId}
                        </span>
                        <span className="text-xs text-gray-600">
                          Order Date: {new Date(createdAt).toDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full flex-col sm:w-1/2">
                      <Tracker
                        orderOn={createdAt}
                        activeStep={
                          orderStatus === "Delivered"
                            ? 3
                            : orderStatus === "Out For Delivery"
                              ? 2
                              : orderStatus === "Shipped"
                                ? 1
                                : 0
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default OrderDetails;
