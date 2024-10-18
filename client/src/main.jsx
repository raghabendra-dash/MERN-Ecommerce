import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { WishlistProvider } from "./context/wishlist.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer
          style={{
            fontSize: "14px",
          }}
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Zoom
        />
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>,
);
