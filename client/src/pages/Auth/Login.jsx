import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/Spinner";
import Cookies from "js-cookie";
import SeoData from "../../SEO/SeoData";
import login from "../../assets/images/login.png";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const Login = () => {
  //hooks->
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth, isAdmin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  useEffect(() => {
    triggerCustomToast();
    if (auth.token) {
      isAdmin ? navigate("/admin/dashboard") : navigate("/user/dashboard");
    }
  }, [navigate, auth, isAdmin]);
  // axios.defaults.headers.common["Authorization"] = auth.token;

  //form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
      );
      // console.log(response);

      if (response.status === 200) {
        triggerCustomToast("success", "Logged in Successfully!");
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });

        Cookies.set("auth", JSON.stringify(response.data), {
          expires: 7,
        });
        navigate(location.state || "/");
      }
    } catch (error) {
      console.error("Error:", error);
      // invalid password
      error.response?.status === 401 &&
        error.response.data?.errorType === "invalidPassword" &&
        triggerCustomToast("error", "Wrong password!");
      //user not registered
      error.response?.status === 401 &&
        error.response.data?.errorType === "invalidUser" &&
        triggerCustomToast("error", "User not Registered!");
      //server error
      error.response?.status === 500 &&
        triggerCustomToast(
          "error",
          "Something went wrong! Please try after sometime.",
        ) &&
        navigate("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  // display content
  return (
    <>
      <SeoData
        title="Log in - Existing User"
        description="Log in with user details"
      />
      {isSubmitting ? (
        <Spinner />
      ) : (
        <div className="container mt-5 bg-primaryBg py-[2px] sm:mt-0 md:mt-0 lg:mt-0">
          <div className="md:flow-row mx-auto my-5 flex w-full flex-col items-center bg-white shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] sm:w-[75%] sm:flex-row lg:flex-row">
            {/* left view  */}
            <div className="h-full w-full bg-black md:w-[40%] lg:w-[40%]">
              <div className="mt-5 flex h-full flex-col gap-2 px-6 md:mt-8 md:gap-4">
                <div className="text-2xl font-bold text-white">
                  <h2>Log in</h2>
                </div>
                <div className="text-base text-gray-300">
                  <p>Get access to your Orders, Wishlist and Recommendations</p>

                  <div className="mt-2 space-y-2 text-xs">
                    <p>
                      <span>
                        User <br />
                      </span>
                      username - test@test.com <br />
                      password - test123
                    </p>
                    <p>
                      <span>
                        Admin <br />
                      </span>
                      username - seller@buzzbuy.com <br />
                      password - admin123
                    </p>
                  </div>
                </div>
                <div className="h-fit w-full">
                  <img src={login} alt="auth image" className="h-full w-full" />
                </div>
              </div>
            </div>

            {/* sign up form */}
            <div className="flex h-full w-full flex-col gap-y-10 p-10 sm:w-[60%] md:w-[60%] lg:w-[60%]">
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
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
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
                        Password
                      </label>
                      <span
                        className="absolute bottom-2 right-3 cursor-pointer hover:text-black"
                        onClick={handlePasswordToggle}
                      >
                        {!showPassword && <AiFillEye />}
                        {showPassword && <AiFillEyeInvisible />}
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-500">
                      <p>
                        By continuing, you agree to BuzzBuy&apos;s Terms of Use
                        and Privacy Policy.
                      </p>
                    </div>

                    <div className="relative flex flex-col">
                      <button className="rounded-lg bg-primary px-2 py-1 text-[14px] font-[500] uppercase text-white">
                        Log in
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="relative -mt-7 w-full text-center">
                <Link
                  to="/forgot-password"
                  className="text-[12px] font-[500] text-primaryBlue"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="relative mt-4 w-full text-center">
                <Link
                  to="/register"
                  className="text-[12px] font-[500] text-primaryBlue"
                >
                  New to BuzzBuy? Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
