import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const Deactivate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { isAdmin, LogOut } = useAuth();

  const handleDeactivate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/deactivate`,
        {
          email,
          phone,
        },
      );
      // console.log(response);

      if (response.status === 200) {
        triggerCustomToast("success", response.data.message);
        LogOut();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      error.response?.status === 401 &&
        error.response.data?.errorType === "phoneMismatch" &&
        triggerCustomToast("error", error.response.data.message);
    }
  };
  return (
    <>
      <ScrollToTopOnRouteChange />
      <div className="flex h-full w-full flex-col items-center p-4 sm:flex-row sm:items-start">
        <div className="h-full p-2 sm:w-[50%] sm:border-r-2">
          <div>
            <div className="text-[16px] font-[500] leading-7">
              When you deactivate your account
            </div>
            <div className="p-4 text-[12px] text-slate-500">
              <ul className="list-disc leading-8">
                <li>You are logged out of your BuzzBuy Account</li>
                <li>Your public profile on BuzzBuy is no longer visible</li>
                <li>
                  Your reviews/ratings are still visible, while your profile
                  information is shown as ‘unavailable’ as a result of
                  deactivation.
                </li>
                <li>
                  Your wishlist items are no longer accessible through the
                  associated public hyperlink. Wishlist is shown as
                  ‘unavailable’ as a result of deactivation
                </li>
                <li>
                  You will be unsubscribed from receiving promotional emails
                  from BuzzBuy
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5 p-2 sm:w-[50%]">
          <div className="w-full text-center text-[16px] font-[500] leading-7">
            Are you sure you want to leave?
          </div>
          <div className="">
            <form
              action="/deactivate"
              method="post"
              onSubmit={handleDeactivate}
              className="flex w-full flex-col items-center gap-4"
            >
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Confirm Your Email Address"
                className="w-[220px] border-2 p-2 focus:outline-1 focus:outline-primaryBlue"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // Email pattern
              />
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                className="w-[220px] border-2 p-2 focus:outline-1 focus:outline-primaryBlue"
                inputMode="numeric" // Set input mode to numeric
                pattern="[0-9]*" // Allow only numeric values
                minLength="10"
                maxLength="10"
                placeholder="Confirm Your Mobile Number"
              />

              <div className="relative flex items-center">
                <button className="w-full rounded-sm bg-red-600 px-2 py-1 text-[14px] font-[500] uppercase text-white">
                  Deactivate
                </button>
              </div>
            </form>
          </div>
          <Link
            to={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
            className="flex w-full items-center justify-center text-[14px] font-[600] uppercase text-primaryBlue"
          >
            No, Let me Stay
          </Link>
        </div>
      </div>
    </>
  );
};

export default Deactivate;
