/* eslint-disable react/prop-types */
import { getDeliveryDate, getDiscount } from "../../../utils/functions";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/cart";
import { useState } from "react";
import { triggerCustomToast } from "../../../components/Toast/CustomToast";

const CartItem = ({ product, inCart }) => {
  const { addItems, removeItems, addLater } = useCart();
  // console.log(product);
  const [quantity, setQuantity] = useState(product?.quantity);

  const increaseQuantity = (product) => {
    const newQty = quantity + 1;
    if (newQty > product?.stock) {
      triggerCustomToast("warning", "Product Stock is Limited!");
      return;
    }
    setQuantity(newQty);
    addItems(product, newQty);
  };

  const decreaseQuantity = (product) => {
    const newQty = quantity - 1;
    if (newQty < 1) return;
    setQuantity(newQty);
    addItems(product, newQty);
  };

  const removeCartItem = (product) => {
    removeItems(product);
  };

  const saveForLaterHandler = (product) => {
    // dispatch(saveForLater(id));
    addLater(product);
    // console.log("Save for later clicked");
    // enqueueSnackbar("Saved For Later", { variant: "success" });
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden border-b py-5 pl-2 sm:pl-6">
      <Link
        to={`/product/${product?.productId}`}
        className="flex w-full flex-col items-stretch gap-5 sm:flex-row"
      >
        {/* <!-- product image --> */}
        <div className="h-28 w-full flex-shrink-0 sm:w-1/6">
          <img
            draggable="false"
            className="h-full w-full object-contain"
            src={product?.image}
            alt={product?.name}
          />
        </div>
        {/* <!-- product image --> */}

        {/* <!-- description --> */}
        <div className="flex w-full flex-col sm:gap-5">
          {/* <!-- product title --> */}
          <div className="flex flex-col items-start justify-between gap-1 pr-5 sm:flex-row sm:gap-0">
            <div className="group flex flex-col gap-0.5 sm:w-3/5">
              <p className="group-hover:text-primary">
                {product?.name?.length > 30
                  ? `${product?.name?.substring(0, 30)}...`
                  : product?.name}
              </p>
              <span className="text-sm text-gray-500">
                Seller: {product?.brandName}
              </span>
            </div>

            <div className="flex w-[50%] flex-col sm:gap-2">
              <p className="text-sm">
                Delivery by {getDeliveryDate()} |{" "}
                <span className="line-through">₹{40}</span>{" "}
                <span className="text-primary">Free</span>
              </p>
            </div>
          </div>
          {/* <!-- product title --> */}

          {/* <!-- price desc --> */}
          <div className="flex items-baseline gap-2 text-xl font-medium">
            <span className="text-sm font-normal text-gray-500 line-through">
              ₹{(product?.price * product?.quantity).toLocaleString()}
            </span>
            <span>
              ₹{(product?.discountPrice * product?.quantity).toLocaleString()}
            </span>

            <span className="text-sm font-[600] text-primary">
              {getDiscount(product?.price, product?.discountPrice)}
              %&nbsp;off
            </span>
          </div>
          {/* <!-- price desc --> */}
        </div>
        {/* <!-- description --> */}
      </Link>

      {/* <!-- save for later --> */}
      <div className="flex justify-between pr-4 sm:justify-start sm:gap-6 sm:pr-0">
        {/* <!-- quantity --> */}
        <div className="flex w-[130px] items-center justify-between gap-2">
          <span
            onClick={() => decreaseQuantity(product)}
            className="flex h-7 w-7 cursor-pointer select-none items-center justify-center rounded-full border bg-gray-50 text-3xl font-light hover:bg-gray-200"
          >
            <p>-</p>
          </span>
          <input
            className="qtyInput w-11 select-none rounded-sm border py-0.5 text-center text-sm font-medium text-gray-700 outline-none"
            value={quantity}
            disabled
          />
          <span
            onClick={() => increaseQuantity(product)}
            className="flex h-7 w-7 cursor-pointer select-none items-center justify-center rounded-full border bg-gray-50 text-xl font-light hover:bg-gray-200"
          >
            +
          </span>
        </div>
        {/* <!-- quantity --> */}
        {inCart && (
          <>
            <button
              onClick={() => saveForLaterHandler(product)}
              className="font-medium hover:text-primary sm:ml-4"
            >
              SAVE FOR LATER
            </button>
            <button
              onClick={() => removeCartItem(product)}
              className="font-medium hover:text-gray-500"
            >
              REMOVE
            </button>
          </>
        )}
      </div>
      {/* <!-- save for later --> */}
    </div>
  );
};

export default CartItem;
