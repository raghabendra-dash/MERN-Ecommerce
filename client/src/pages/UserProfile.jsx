import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";
import { triggerCustomToast } from "../components/Toast/CustomToast";

const UserProfile = () => {
  const { auth, setAuth } = useAuth();
  const [profile, setProfile] = useState(false);
  const [emailSection, setEmailSection] = useState(false);
  const [phoneSection, setPhoneSection] = useState(false);
  const [email, setEmail] = useState(auth?.user?.email);
  const [name, setName] = useState(auth?.user?.name);
  const [phone, setPhone] = useState(auth?.user?.phone);
  const [nameInputFocused, setNameInputFocused] = useState(false);

  const handleProfile = () => {
    setProfile(!profile);
  };

  const handleEmail = () => {
    setEmailSection(!emailSection);
  };

  const handlePhone = () => {
    setPhoneSection(!phoneSection);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    try {
      setProfile(false);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
        {
          newName: name,
          email: auth?.user?.email,
        },
      );
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          name: name,
        },
      });
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(response.data));

      triggerCustomToast("success", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      setEmailSection(false);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/update-details`,
        {
          newEmail: email,
          email: auth?.user?.email,
        },
      );
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          email: email,
        },
      });
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(response.data));

      triggerCustomToast("success", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePhoneSubmit = async (e) => {
    setPhoneSection(false);
    e.preventDefault();

    try {
      setProfile(false);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/v1/auth/update-details`,
        {
          newPhone: phone,
          email: auth?.user?.email,
        },
      );
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          phone: phone,
        },
      });
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(response.data));

      triggerCustomToast("success", response.data.message);
    } catch (error) {
      console.error("Error:", error);
      //user not found
      error.response?.status === 401 &&
        error.response.data?.errorType === "invalidUser" &&
        triggerCustomToast("error", "User not Found!");
      //server error
      error.response?.status === 500 &&
        triggerCustomToast(
          "error",
          "Something went wrong! Please try after sometime.",
        );
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-start gap-10 p-5">
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-5">
            <div className="text-[16px] font-[600]">Personal Information</div>
            <button
              className="text-sm font-medium text-primary"
              onClick={handleProfile}
            >
              {!profile ? "Edit" : "Cancel"}
            </button>
          </div>
          <div className="h-[50px]">
            {profile ? (
              <form
                action="/update-details"
                method="post"
                onSubmit={handleNameSubmit}
                className="flex items-center gap-6"
              >
                <div
                  className={`flex max-h-[50px] min-h-[50px] w-[220px] flex-col border-2 p-2 ${
                    nameInputFocused ? "border-1 border-primary" : ""
                  }`}
                >
                  <label htmlFor="name" className="text-[10px]">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setNameInputFocused(true)}
                    onBlur={() => setNameInputFocused(false)}
                    className="text-[14px] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="h-[40px] w-[80px] rounded-sm bg-primary px-4 py-2 font-[600] text-white"
                  onClick={handleNameSubmit}
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex min-h-[50px] w-[220px] items-center border-2 p-2 text-slate-500">
                {auth?.user?.name}
              </div>
            )}
          </div>
        </div>
        {/* email section */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-5">
            <div className="text-[16px] font-[600]">Email Address</div>
            <button
              className="text-[14px] font-[500] text-primary"
              onClick={handleEmail}
            >
              {!emailSection ? "Edit" : "Cancel"}
            </button>
          </div>
          <div className="flex gap-6">
            {emailSection ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[220px] border-2 p-2 focus:outline-1 focus:outline-primary"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // Email pattern
              />
            ) : (
              <div className="w-[220px] border-2 p-2 text-slate-500">
                {auth?.user?.email}
              </div>
            )}

            {emailSection && (
              <button
                className="h-[40px] w-[80px] rounded-sm bg-primary px-4 py-2 font-[600] text-white"
                onClick={handleEmailSubmit}
              >
                Save
              </button>
            )}
          </div>
        </div>
        {/* Mobile section */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-5">
            <div className="text-[16px] font-[600]">Mobile Number</div>
            <button
              className="text-[14px] font-[500] text-primary"
              onClick={handlePhone}
            >
              {!phoneSection ? "Edit" : "Cancel"}
            </button>
          </div>
          <div className="flex gap-6">
            {phoneSection ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-[220px] border-2 p-2 focus:outline-1 focus:outline-primary"
                inputMode="numeric" // Set input mode to numeric
                pattern="[0-9]*" // Allow only numeric values
                minLength="10"
                maxLength="10"
              />
            ) : (
              <div className="w-[220px] border-2 p-2 text-slate-500">
                {auth?.user?.phone}
              </div>
            )}

            {phoneSection && (
              <button
                className="h-[40px] w-[80px] rounded-sm bg-primary px-4 py-2 font-[600] text-white"
                onClick={handlePhoneSubmit}
              >
                Save
              </button>
            )}
          </div>
        </div>

        {/* deactivate account */}
        <div className="mt-4 text-sm font-medium">
          <p className="text-gray-500">Not happy with the services?</p>
          <Link
            to="./deactivate"
            className="text-base text-primary hover:underline"
          >
            Deactivate Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
