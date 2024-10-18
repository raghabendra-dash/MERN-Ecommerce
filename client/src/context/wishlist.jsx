import { useContext, createContext, useState, useEffect } from "react";
import { triggerCustomToast } from "../components/Toast/CustomToast";
import axios from "axios";
import { useAuth } from "./auth";

const WishlistContext = createContext();

// eslint-disable-next-line react/prop-types
const WishlistProvider = ({ children }) => {
  const { isAdmin, auth } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    // getting user wishlist items from server
    const fetchWishlistItems = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/wishlist`,
          {
            headers: {
              Authorization: auth?.token,
            },
          },
        );
        setWishlistItems(res.data.wishlistItems);
      } catch (error) {
        console.error("Error fetching data from wishlist product page:", error);
        //server error
        error.response?.status === 500 &&
          triggerCustomToast("error", "Error in Fetching Wishlist Items!");
      }
    };
    auth?.token && !isAdmin && fetchWishlistItems();
  }, [auth?.token, isAdmin]);

  return (
    <WishlistContext.Provider value={{ wishlistItems, setWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
};

//custom hook->
const useWishlist = () => {
  return useContext(WishlistContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { WishlistProvider, useWishlist };
