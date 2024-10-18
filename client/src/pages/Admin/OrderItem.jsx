/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";

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
      className="flex flex-col items-center gap-5 rounded border bg-white px-4 py-5 hover:shadow-lg md:flex-row md:px-8"
    >
      {/* <!-- image container --> */}
      <div className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32">
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

        <div className="mt-1 flex flex-col gap-2 sm:mt-0 sm:w-1/2 md:flex-row md:gap-20">
          <p className="w-[100px] text-sm">
            ₹{item?.discountPrice.toLocaleString()}
          </p>

          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-1 text-xs font-medium md:text-sm">
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
                  <span className="pb-0.5 text-primaryGreen">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Out For Delivery
                </>
              ) : (
                <>
                  <span className="pb-0.5 text-primary">
                    <CircleIcon sx={{ fontSize: "14px" }} />
                  </span>
                  Order received on {formatDate(createdAt)}
                </>
              )}
            </p>
            {orderStatus === "Delivered" ? (
              <p className="ml-1 text-xs">Item successfully delivered</p>
            ) : orderStatus === "Out For Delivery" ? (
              <p className="ml-1 text-xs">Product is out for delivery</p>
            ) : orderStatus === "Shipped" ? (
              <p className="ml-1 text-xs">You have processed this order</p>
            ) : (
              <p className="ml-1 text-xs">Order received</p>
            )}
          </div>
        </div>
      </div>
      {/* <!-- order desc container --> */}
    </Link>
  );
};

export default OrderItem;
