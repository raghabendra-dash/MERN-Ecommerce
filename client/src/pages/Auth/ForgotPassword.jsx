/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import forgot from "../../assets/images/forgot.png";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Spinner from "./../../components/Spinner";
import SeoData from "../../SEO/SeoData";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const ForgotPassword = () => {
  //hooks->
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  //form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      email === "test@test.com" ||
      email === "seller@buzzbuy.com" ||
      email === "store@flipkart.com"
    ) {
      triggerCustomToast(
        "error",
        "Functionality is disabled for testing account! Please create a new one!",
      );
      setEmail("");
      setConfirmPassword("");
      setPassword("");
      return;
    }
    setIsSubmitting(true);
    try {
      if (userFound) {
        if (password !== confirmPassword) {
          triggerCustomToast("error", "Password does not match!");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/forgot-password`,
          {
            email,
            password,
          },
        );
        console.log(response);

        if (response.status === 200) {
          setUserFound(false);
          triggerCustomToast("success", "Password Reset Successfully!");
          navigate("/login");
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/user-exist`,
          {
            email,
          },
        );

        if (response.status === 200) {
          setUserFound(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      //user not registered
      error.response?.status === 401 &&
        error.response.data?.errorType === "invalidUser" &&
        triggerCustomToast("error", "User not Found!");
      //server error
      error.response?.status === 500 &&
        triggerCustomToast(
          "error",
          "Something went wrong! Please try after sometime.",
        ) &&
        navigate("/forgot-password");
    } finally {
      setIsSubmitting(false);
    }
  };

  // display content
  return (
    <>
      <SeoData
        title="Forgot Password - Existing User"
        description="Forgot Password"
      />

      <div className="container mt-5 bg-primaryBg py-[2px] sm:mt-0 md:mt-0 lg:mt-0">
        <div className="md:flow-row mx-auto my-10 flex w-full flex-col items-center bg-white shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] sm:w-[75%] sm:flex-row lg:flex-row">
          {/* left view  */}
          <div className="h-full w-full bg-black md:w-[40%] lg:w-[40%]">
            <div className="mt-10 flex h-full flex-col gap-6 px-6">
              <div className="text-2xl font-bold text-white">
                <h2>Forgot Password</h2>
              </div>
              <div className="text-sm text-slate-300">
                <p>Forgot your password? No worries, we've got you covered!</p>
              </div>
              <div className="mt-8">
                <img src={forgot} alt="auth image" />
              </div>
            </div>
          </div>

          {/* forgot password form */}
          <div className="relative flex h-full w-full flex-col gap-y-10 p-10 sm:w-[60%] md:w-[60%] lg:w-[60%]">
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="h-full w-full">
                <form
                  action="/login"
                  method="post"
                  className="mx-auto w-[90%] transition-all"
                  onSubmit={handleFormSubmit}
                >
                  <div className="space-y-4 pt-3 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="peer h-8 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none"
                        placeholder="Email address"
                        required
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // Email pattern
                      />
                      <label
                        htmlFor="email"
                        className="peer-placeholder-shown:text-gray-440 absolute -top-3 left-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
                      >
                        Enter Your Email Address
                      </label>
                    </div>
                    {userFound && (
                      <>
                        <div className="relative">
                          <input
                            autoComplete="off"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="peer h-8 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none"
                            placeholder="Password"
                            required
                            minLength="5"
                          />
                          <label
                            htmlFor="password"
                            className="peer-placeholder-shown:text-gray-440 absolute -top-3 left-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
                          >
                            New Password
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            autoComplete="off"
                            id="confirm_password"
                            name="confirm_password"
                            value={confirmPassword}
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="peer h-8 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-blue-400 focus:outline-none"
                            placeholder="Confirm Password"
                            required
                          />
                          <label
                            htmlFor="confirm_password"
                            className="peer-placeholder-shown:text-gray-440 absolute -top-3 left-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
                          >
                            Confirm Password
                          </label>
                          <span
                            className="absolute bottom-2 right-3 cursor-pointer hover:text-black"
                            onClick={handlePasswordToggle}
                          >
                            {!showPassword && <AiFillEye />}
                            {showPassword && <AiFillEyeInvisible />}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="text-[9px] text-slate-500">
                      <p>
                        By continuing, you agree to BuzzBuy's Terms of Use and
                        Privacy Policy.
                      </p>
                    </div>

                    <div className="relative flex flex-col">
                      <button className="rounded-sm bg-primary px-2 py-1 text-[14px] font-[500] uppercase text-white">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
