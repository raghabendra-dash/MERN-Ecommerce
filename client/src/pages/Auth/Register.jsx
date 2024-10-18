import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import signup from "../../assets/images/signup.png";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Spinner from "../../components/Spinner";
import Checkbox from "@mui/material/Checkbox";
import SeoData from "../../SEO/SeoData";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckbox = () => {
    setIsSeller(!isSeller);
  };

  const navigate = useNavigate();

  //form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (password !== confirmPassword) {
        triggerCustomToast("error", "Password does not match!");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
        {
          name,
          email,
          phone,
          password,
          address,
          isSeller,
        },
      );
      console.log(response);

      // Registration successful
      response.status === 201 &&
        triggerCustomToast(
          "success",
          "User Registered Successfully! Please Login...",
        ) &&
        navigate("/login");

      // Email already registered
      response.status === 200 &&
        triggerCustomToast(
          "error",
          "Email is already registered! Please Login...",
        ) &&
        navigate("/login");
    } catch (error) {
      console.error("Error:", error);

      //server error
      error.response.status === 500 &&
        triggerCustomToast(
          "error",
          "Something went wrong! Please try after sometime.",
        ) &&
        navigate("/register");
    } finally {
      setIsSubmitting(false);
    }
  };

  //display content
  return (
    //SEO
    <>
      <SeoData
        title="Sign up - New User"
        description="Register new user with details"
      />
      {isSubmitting ? (
        <Spinner />
      ) : (
        <div className="container mt-5 bg-primaryBg py-[2px] sm:mt-0 md:mt-0 lg:mt-0">
          <div className="md:flow-row mx-auto my-10 flex w-full flex-col items-center bg-white shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] sm:w-[75%] sm:flex-row lg:flex-row">
            {/* left view  */}
            <div className="h-full w-full bg-black md:w-[40%] lg:w-[40%]">
              <div className="mt-10 flex h-full flex-col gap-6 px-6">
                <div className="text-2xl font-bold text-white">
                  <h2>Looks like you&apos;re new here!</h2>
                </div>
                <div className="text-sm text-slate-300">
                  <p>Sign up with the required details to get started.</p>
                </div>
                <div className="mt-8">
                  <img src={signup} alt="auth image" />
                </div>
              </div>
            </div>

            {/* sign up form */}
            <div className="w-full p-10 sm:w-[60%]">
              <div className="flex h-full w-full flex-col items-center">
                <form
                  action="/register"
                  method="post"
                  className="mx-auto w-[90%] transition-all"
                  onSubmit={handleFormSubmit}
                >
                  <div className="space-y-4 pt-3 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="peer h-6 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none"
                        placeholder="Full Name"
                        required
                      />
                      <label
                        htmlFor="name"
                        className="peer-placeholder-shown:text-gray-440 absolute -top-3 left-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
                      >
                        Full Name
                      </label>
                    </div>
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
                        autoComplete="on"
                        id="phone"
                        name="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="peer h-8 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none"
                        placeholder="Mobile Number"
                        required
                        inputMode="numeric" // Set input mode to numeric
                        pattern="[0-9]*" // Allow only numeric values
                        minLength="10"
                        maxLength="10"
                      />
                      <label
                        htmlFor="phone"
                        className="peer-placeholder-shown:text-gray-440 absolute -top-3 left-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
                      >
                        Mobile Number
                      </label>
                    </div>
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
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="confirm_password"
                        name="confirm_password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="peer h-8 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none"
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
                    <div className="relative">
                      <input
                        autoComplete="on"
                        id="address"
                        name="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="peer h-8 w-full border-b-2 text-sm text-gray-900 placeholder-transparent focus:border-primary focus:outline-none"
                        placeholder="Address"
                        required
                      />
                      <label
                        htmlFor="address"
                        className="peer-placeholder-shown:text-gray-440 absolute -top-3 left-0 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-gray-600"
                      >
                        Address
                      </label>
                    </div>
                    <div className="relative">
                      <Checkbox
                        size="small"
                        onChange={handleCheckbox}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                      <span className="text-[12px] font-[500] text-gray-700">
                        Register as Seller
                      </span>
                    </div>
                    <div className="relative flex flex-col">
                      <button className="rounded-sm bg-primary px-2 py-1 text-[14px] font-[500] uppercase text-white">
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
                <div className="relative mt-4 w-full">
                  <Link to="/login">
                    <button className="ml-[5%] w-[90%] bg-white px-4 py-2 text-[12px] font-[600] text-primaryBlue shadow-[0px_0px_8px_2px_rgba(212,212,212,0.6)] transition-all hover:shadow-[0px_0px_8px_2px_rgba(212,212,212,0.8)]">
                      Existing User? Log in
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
