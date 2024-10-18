/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../../pages/Home/Banner/Banner.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/auth.jsx";
import { useNavigate } from "react-router-dom";

const ProductImage = ({
  product,
  cartItems,
  productId,
  itemInWishlist,
  addToCartHandler,
  addToWishlistHandler,
}) => {
  const navigate = useNavigate();
  const { auth, setAuth, LogOut, isAdmin, isContextLoading } = useAuth();
  const itemInCart = cartItems.some((item) => item.productId === productId);

  const buyNow = () => {
    addToCartHandler();
    navigate("/cart");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  return (
    <div className="top-16 h-auto w-full lg:sticky lg:w-[35%]">
      {/* <!-- imgBox --> */}
      <div className="m-3 flex flex-col gap-3">
        <div className="relative h-full w-full border pb-6">
          <Slider {...settings}>
            {product?.images.length > 1 ? (
              product?.images?.map((item, i) => (
                <img
                  draggable="false"
                  className="h-96 w-full object-contain"
                  src={item.url}
                  alt={product.name}
                  key={i}
                />
              ))
            ) : (
              <img
                draggable="false"
                className="h-96 w-full object-contain"
                src={product?.images[0]?.url}
                alt={product?.name}
              />
            )}
          </Slider>
          <div
            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-lg ${
              isAdmin ? "hidden" : ""
            } `}
          >
            <span
              onClick={addToWishlistHandler}
              className={`${
                itemInWishlist
                  ? "text-red-500"
                  : "text-gray-300 hover:text-red-500"
              } cursor-pointer`}
            >
              <FavoriteIcon sx={{ fontSize: "18px" }} />
            </span>
          </div>
        </div>

        <div className="flex w-full gap-3">
          {/* <!-- add to cart btn --> */}
          {product.stock > 0 && (
            <button
              onClick={itemInCart ? goToCart : addToCartHandler}
              disabled={isAdmin}
              className="flex w-1/2 items-center justify-center gap-2 rounded-sm bg-black p-2 text-white shadow hover:shadow-lg disabled:cursor-not-allowed sm:p-4"
            >
              <ShoppingCartIcon />
              {itemInCart ? "GO TO CART" : "ADD TO CART"}
            </button>
          )}
          <button
            onClick={buyNow}
            disabled={isAdmin || product.stock < 1}
            className={`flex items-center justify-center gap-2 rounded-sm p-4 text-white shadow hover:shadow-lg disabled:cursor-not-allowed ${
              product.stock < 1
                ? "w-full cursor-not-allowed bg-gray-300"
                : "w-1/2 bg-primary"
            }`}
          >
            <FlashOnIcon />
            {product?.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
          </button>
          {/* <!-- add to cart btn --> */}
        </div>
      </div>
      {/* <!-- img box --> */}
    </div>
  );
};

export default ProductImage;
