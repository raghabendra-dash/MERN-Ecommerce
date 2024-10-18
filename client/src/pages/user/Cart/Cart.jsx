/* eslint-disable no-unused-vars */
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../../context/cart";
import SaveForLater from "./SaveForLater";
import ScrollToTopOnRouteChange from "./../../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../../SEO/SeoData";
import PriceCard from "./PriceCard";
import { useAuth } from "../../../context/auth";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { triggerCustomToast } from "../../../components/Toast/CustomToast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { auth } = useAuth();
  //stripe details
  const publishKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
  const secretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;
  let frontendURL = window.location.origin; // Get the frontend URL
  const { cartItems, saveLaterItems } = useCart();

  const navigate = useNavigate();

  //PAYMENT USING STRIPE
  const handlePayment = async () => {
    const stripe = await loadStripe(publishKey);

    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/user/create-checkout-session`,
      {
        products: cartItems,
        frontendURL: frontendURL,
        customerEmail: auth?.user?.email,
      },
      {
        headers: {
          Authorization: auth?.token,
        },
      },
    );
    const session = response.data.session;
    console.log("session: ", session);
    //storing session id to retrieve payment details after successful
    localStorage.setItem("sessionId", session.id);
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log("result: ", result);

    if (result.error) {
      console.log(result.error);
    }
  };

  const placeOrderHandler = () => {
    if (!auth.token) {
      triggerCustomToast("error", "Please login first!");
      navigate("/login");
      return;
    }
    handlePayment();
  };

  return (
    <>
      <ScrollToTopOnRouteChange />
      <SeoData title="Shopping Cart | BuzzBuy" />
      <main className="w-full pt-5">
        {/* <!-- row --> */}
        <div className="m-auto mt-0 flex w-full flex-col gap-3.5 sm:mt-4 sm:w-11/12 sm:flex-row">
          {/* <!-- cart column --> */}
          <div className="flex-1">
            {/* <!-- cart items container --> */}
            <div className="flex flex-col bg-white shadow">
              <span className="border-b px-2 py-4 text-lg font-medium sm:px-8">
                My Cart ({cartItems?.length})
              </span>
              {cartItems?.length === 0 ? (
                <EmptyCart />
              ) : (
                cartItems?.map((item, i) => (
                  <CartItem product={item} inCart={true} key={i} />
                ))
              )}
              {/* <!-- place order btn --> */}
              <div className="sticky bottom-0 left-0 flex items-center justify-between bg-white">
                {/* test card details */}
                <div
                  className={`p-2 text-xs ${
                    cartItems.length < 1 ? "hidden" : "inline-block"
                  } w-full`}
                >
                  <p>
                    For payment purposes, you can use the following test card
                    details:
                  </p>
                  <ul>
                    <li>
                      <strong>Card Number:</strong> 4242 4242 4242 4242
                    </li>
                    <li>
                      <strong>Expiry Date:</strong> Any future date (e.g.,
                      12/25)
                    </li>
                    <li>
                      <strong>CVV:</strong> Any 3-digit number (e.g., 123)
                    </li>
                  </ul>
                </div>

                <button
                  onClick={placeOrderHandler}
                  disabled={cartItems.length < 1 ? true : false}
                  className={`${
                    cartItems.length < 1 ? "hidden" : "bg-primary"
                  } mx-2 my-4 w-full rounded-sm py-4 font-medium text-white shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:mx-6 sm:w-1/3`}
                >
                  PLACE ORDER
                </button>
              </div>
              {/* <!-- place order btn --> */}
            </div>
            {/* <!-- cart items container --> */}

            {/* <!-- saved for later items container --> */}
            <div className="mb-8 mt-5 flex flex-col bg-white shadow">
              <span className="border-b px-2 py-4 text-lg font-medium sm:px-8">
                Saved For Later ({saveLaterItems?.length})
              </span>
              {saveLaterItems?.map((item, i) => (
                <SaveForLater product={item} key={i} />
              ))}
            </div>
            {/* <!-- saved for later container --> */}
          </div>
          {/* <!-- cart column --> */}

          <PriceCard cartItems={cartItems} />
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default Cart;
