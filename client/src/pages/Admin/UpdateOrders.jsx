import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Tracker from "./../user/Orders/Tracker";
import Spinner from "../../components/Spinner";
import { useAuth } from "../../context/auth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SeoData from "../../SEO/SeoData";

const UpdateOrders = () => {
  const params = useParams();
  const orderId = params.id;

  const [loading, setLoading] = useState(false);
  const [UpdateOrders, setUpdateOrders] = useState([]);
  const [status, setStatus] = useState("");
  const { auth } = useAuth();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    // fetch order detail from server
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/v1/user/admin-order-detail?orderId=${orderId}`,
          {
            headers: {
              Authorization: auth?.token,
            },
          },
        );
        if (response?.data?.orderDetails) {
          setUpdateOrders(...response.data.orderDetails);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [auth?.token, orderId, reload]);

  const amount = UpdateOrders?.amount;
  const orderItems = UpdateOrders?.products;
  const buyer = UpdateOrders?.buyer;
  const paymentId = UpdateOrders?.paymentId;
  const shippingInfo = UpdateOrders?.shippingInfo;
  const createdAt = UpdateOrders?.createdAt;
  const orderStatus = UpdateOrders?.orderStatus;

  const updateOrderSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update/order-status`,
        { status, orderId },
        {
          headers: { Authorization: auth?.token },
        },
      );
      if (res.status === 200) {
        setReload(!reload);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                  <div className="mx-10 my-8 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-md font-[600]">Update Status</h3>
                      <Link
                        to="/admin/orders"
                        className="ml-1 flex items-center gap-0 font-medium uppercase text-primary"
                      >
                        <ArrowBackIosIcon sx={{ fontSize: "14px" }} />
                        <span className="text-[12px]">Go Back</span>
                      </Link>
                    </div>
                    <div>
                      <form
                        onSubmit={updateOrderSubmitHandler}
                        className="flex flex-col items-start justify-between gap-3"
                      >
                        <div className="flex gap-2">
                          <p className="text-sm font-medium">Current Status:</p>
                          <p className="text-sm">{orderStatus}</p>
                        </div>
                        <FormControl fullWidth sx={{ marginTop: 1 }}>
                          <InputLabel id="order-status-select-label">
                            Status
                          </InputLabel>
                          <Select
                            labelId="order-status-select-label"
                            id="order-status-select"
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-[50%]"
                          >
                            <MenuItem value={"Shipped"}>Shipped</MenuItem>

                            <MenuItem value={"Out For Delivery"}>
                              Out For Delivery
                            </MenuItem>

                            <MenuItem value={"Delivered"}>Delivered</MenuItem>
                          </Select>
                        </FormControl>
                        <button
                          type="submit"
                          className="rounded bg-primary px-4 py-2 text-[14px] text-white shadow hover:font-medium hover:shadow-lg"
                        >
                          Update
                        </button>
                      </form>
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

export default UpdateOrders;
