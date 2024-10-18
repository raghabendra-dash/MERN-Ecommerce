import { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import Spinner from "../../../components/Spinner";
import SeoData from "../../../SEO/SeoData";
import wishlist from "../../../assets/images/wishlist.png";
import { triggerCustomToast } from "../../../components/Toast/CustomToast";

const Wishlist = () => {
  const { auth, isAdmin } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 5; // Number of items per page

  useEffect(() => {
    // Fetch wishlist count and product details
    const fetchWishlist = async (page) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/v1/user/wishlist-products?page=${page}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: auth.token,
            },
          },
        );
        const newItems = res.data.wishlistItems;
        // append new items in state
        setWishlistItems((prev) => [...prev, ...newItems]);
        setCount(res?.data?.totalItems || 0);
        setIsLoading(false);
        setIsLoadMore(false);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };
    auth.token && !isAdmin && fetchWishlist(page); // Fetch initial page
  }, [page, auth.token, isAdmin]);

  // Fetch more wishlist items when "Load more" is clicked
  const handleLoadMore = () => {
    setIsLoadMore(true);
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      if (nextPage <= Math.ceil(count / pageSize)) {
        return nextPage;
      }
      return prevPage;
    });
  };

  // Remove item from wishlist
  const updateWishlist = async (productId) => {
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/update-wishlist`,
        { productId, type: "remove" },
        { headers: { Authorization: auth.token } },
      );
      triggerCustomToast("success", "Product Removed From Wishlist");
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      setCount((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      triggerCustomToast("error", "Something went wrong!");
    }
  };

  return (
    <>
      <SeoData title="My Wishlist" />

      {isLoading && page === 1 ? (
        <Spinner />
      ) : (
        <div className="mx-auto flex w-full gap-3.5 p-2 sm:p-6 md:p-10">
          <div className="flex-1 bg-white shadow">
            {/* Wishlist container */}
            <div className="flex flex-col">
              <span className="border-b px-4 py-4 text-lg font-medium sm:px-8">
                My Wishlist ({count})
              </span>

              {wishlistItems.length === 0 ? (
                <div className="m-6 flex flex-col items-center gap-2 text-center">
                  <img
                    draggable="false"
                    className="-ml-5 h-40 w-40 object-contain"
                    src={wishlist}
                    alt="Empty Wishlist"
                  />
                  <span className="mt-6 text-lg font-medium">
                    Empty Wishlist
                  </span>
                  <p>You have no items in your wishlist. Start adding!</p>
                </div>
              ) : (
                wishlistItems.map((item, index) => (
                  <Product {...item} func={updateWishlist} key={index} />
                ))
              )}

              {count > wishlistItems.length && (
                <span className="text-md flex items-center justify-center border-b px-4 py-4 font-medium sm:px-8">
                  <button
                    onClick={handleLoadMore}
                    className="font-semibold text-primary"
                    disabled={isLoadMore}
                  >
                    {isLoadMore ? "Loading..." : "Load more items"}
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
