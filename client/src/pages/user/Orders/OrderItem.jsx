/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/functions";

const OrderItem = ({
  item,
  orderId,
  orderStatus,
  createdAt,
  paymentId,
  buyer,
  shippingInfo,
  amount,
}) => {
  return (
    <Link
      to={`./order_details/${orderId}`}
      className="flex flex-col items-center gap-5 rounded border bg-white p-3 hover:shadow-lg md:flex-row md:items-start md:px-5 lg:px-8"
    >
      {/* <!-- image container --> */}
      <div className="h-20 w-full sm:w-32">
        <img
          draggable="false"
          className="h-full w-full object-contain"
          src={item?.image}
          alt={item?.name}
        />
      </div>
      {/* <!-- image container --> */}

      {/* <!-- order desc container --> */}
      <div className="flex w-full flex-col justify-between md:flex-row">
        <div className="flex w-[300px] flex-col gap-1 overflow-hidden">
          <p className="text-sm">
            {item?.name.length > 40
              ? `${item?.name.substring(0, 40)}...`
              : item?.name}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Quantity: {item?.quantity}
          </p>
        </div>

        <div className="mt-1 flex flex-col gap-2 md:mt-0 md:w-1/2 md:flex-row md:gap-20">
          <p className="w-[100px] text-sm">
            ₹{item?.discountPrice.toLocaleString()}
          </p>

          <div className="flex flex-col gap-2">
            <p className="flex w-[250px] items-center gap-1 text-sm font-medium">
              {orderStatus === "Shipped" ? (
                <>
                  <span className="pb-0.5 text-orange">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Shipped
                </>
              ) : orderStatus === "Delivered" ? (
                <>
                  <span className="pb-0.5 text-primaryGreen">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Delivered
                </>
              ) : orderStatus === "Out For Delivery" ? (
                <>
                  <span className="pb-0.5 text-yellow-500">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Out For Delivery
                </>
              ) : (
                <>
                  <span className="pb-0.5 text-primary">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Ordered on {formatDate(createdAt)}
                </>
              )}
            </p>
            {orderStatus === "Delivered" ? (
              <p className="ml-1 text-xs">Your item has been Delivered</p>
            ) : orderStatus === "Shipped" ? (
              <p className="ml-1 text-xs">Your item has been Shipped</p>
            ) : orderStatus === "Processed" ? (
              <p className="ml-1 text-xs">Seller has processed your order</p>
            ) : orderStatus === "Out For Delivery" ? (
              <p className="ml-1 text-xs">Your order is Out for Delivery</p>
            ) : (
              <p className="ml-1 text-xs">Your order has been placed</p>
            )}
          </div>
        </div>
      </div>
      {/* <!-- order desc container --> */}
    </Link>
  );
};

export default OrderItem;
