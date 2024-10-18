import { Route, Routes, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import Deactivate from "../Auth/Deactivate";
import Reviews from "./Reviews";
import PaymentCards from "./PaymentCards";
import SeoData from "../../SEO/SeoData";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  useEffect(() => {
    if (window.location.pathname === "/user/dashboard") navigate("./profile");
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <SeoData title="User Dashboard" />
      <div className="py-[5px]">
        <div className="flex items-start justify-between gap-5 px-2 py-2 text-[14px] sm:px-[50px] sm:py-[40px]">
          <div
            className={`sm:w-[25%] ${
              isMenuOpen ? "relative h-full w-full bg-white" : "hidden"
            } sm:inline-block`}
          >
            <UserMenu toggleMenu={toggleMenu} />
          </div>
          <div
            className={`w-full rounded-sm bg-white shadow-md sm:w-[75%] ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="rounded px-2 py-2 text-lg text-primary underline sm:hidden"
            >
              {isMenuOpen ? "Close" : <GiHamburgerMenu />}
            </button>
            <Routes>
              {/* <Route path="" element={<UserProfile />} /> */}
              <Route path="profile" element={<UserProfile />} />
              <Route path="address" element={<AddressComponent />} />
              <Route path="payment-cards" element={<PaymentCards />} />
              <Route path="user-review" element={<Reviews />} />
              <Route path="profile/deactivate" element={<Deactivate />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
