/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { triggerCustomToast } from "../Toast/CustomToast";

const Product = ({
  _id,
  images,
  name,
  ratings,
  numOfReviews,
  price,
  discountPrice,
  wishlistItems,
  setWishlistItems,
}) => {
  const { auth, isAdmin } = useAuth();

  //check if item is present in user wishlist or not
  const itemInWishlist = wishlistItems?.some((itemId) => {
    return itemId === _id;
  });

  // Optimistic UI update
  const updateWishlistUI = (add) => {
    setWishlistItems((prev) =>
      add ? [...prev, _id] : prev.filter((item) => item !== _id),
    );
  };

  // add to wishlist function
  const addToWishlistHandler = async () => {
    const type = itemInWishlist ? "remove" : "add";
    try {
      // Update the UI before the API call
      updateWishlistUI(type === "add");

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
        { productId: _id, type },
        { headers: { Authorization: auth.token } },
      );
    } catch (error) {
      console.error(error);
      if (error.message.includes("403")) {
        triggerCustomToast(
          "error",
          "Admins are not allowed to add items to the wishlist",
        );
      } else if (error.message.includes("401")) {
        triggerCustomToast("error", "Please Login First");
      } else {
        triggerCustomToast(
          "error",
          "Something went wrong! Please try again later.",
        );
      }
      // Revert UI update if there is an error
      updateWishlistUI(type !== "add");
    }
  };

  return (
    <>
      <ScrollToTopOnRouteChange />
      <div className="relative">
        {/* <!-- wishlist badge --> */}
        <span
          onClick={addToWishlistHandler}
          className={`${
            itemInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"
          } ${isAdmin ? "hidden" : ""} absolute right-3 top-2 z-10 cursor-pointer`}
        >
          <FavoriteIcon sx={{ fontSize: "20px" }} />
        </span>
        {/* <!-- wishlist badge --> */}
        <div className="relative flex w-full flex-col items-center gap-2 rounded-sm px-4 py-6 hover:shadow-lg">
          {/* <!-- image & product title --> */}
          <Link
            to={`/product/${_id}`}
            className="group flex w-full flex-col items-center text-center"
          >
            <div className="h-48 w-44">
              <img
                draggable="false"
                className="h-full w-full object-contain"
                src={images && images[0]?.url}
                alt={name}
              />
            </div>
          </Link>
          {/* <!-- image & product title --> */}

          {/* <!-- product description --> */}
          <div className="flex w-full flex-col items-start gap-2">
            <h2 className="group-hover:text-primary-blue mt-4 text-left text-sm font-[500] leading-6">
              {name.length > 25 ? `${name.substring(0, 25)}...` : name}
            </h2>
            {/* <!-- rating badge --> */}
            <span className="flex items-start justify-between gap-2 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-0.5 rounded-sm bg-[#22ba20] px-1.5 py-0.5 text-xs text-white">
                {ratings.toFixed(1)}
                <StarIcon sx={{ fontSize: "14px" }} />
              </span>
              <span>({numOfReviews})</span>
            </span>
            {/* <!-- rating badge --> */}

            {/* <!-- price container --> */}
            <div className="text-md flex items-center gap-1.5 font-medium">
              <span>₹{discountPrice.toLocaleString()}</span>
              <span className="text-xs text-gray-500 line-through">
                ₹{price.toLocaleString()}
              </span>
              <span className="text-primary-green text-xs">
                {getDiscount(price, discountPrice)}%&nbsp;off
              </span>
            </div>
            {/* <!-- price container --> */}
          </div>
          {/* <!-- product description --> */}
        </div>
      </div>
    </>
  );
};

export default Product;
