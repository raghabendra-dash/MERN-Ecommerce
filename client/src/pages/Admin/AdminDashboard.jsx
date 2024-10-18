import { Route, Routes, useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import UserProfile from "../UserProfile";
import AddressComponent from "../AddressComponent";
import PanCardComponent from "../PanCardComponent";
import CreateProduct from "./CreateProduct";
import AllProducts from "./AllProducts";
import Users from "./Users";
import Deactivate from "../Auth/Deactivate";
import EditProduct from "./EditProduct";
import SeoData from "../../SEO/SeoData";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/admin/dashboard") {
      navigate("./profile");
    }
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <SeoData title="Admin Dashboard" />
      <div className="h-full py-[5px]">
        <div className="flex h-full items-start justify-between gap-3 p-2 md:gap-5 md:p-4 lg:p-5">
          <div
            className={`md:w-[25%] ${
              isMenuOpen ? "relative z-50 h-full w-full bg-white" : "hidden"
            } md:inline-block`}
          >
            <AdminMenu toggleMenu={toggleMenu} />
          </div>
          <div
            className={`h-full w-full rounded-sm bg-white shadow-md md:w-[75%] ${
              isMenuOpen ? "hidden" : "block"
            }`}
          >
            <button
              onClick={toggleMenu}
              className="m-1 rounded-full p-1.5 hover:bg-primaryHover/30 md:hidden"
            >
              <GiHamburgerMenu className="h-6 w-6 text-primary" />
            </button>
            <Routes>
              <Route path="" element={<UserProfile />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="add-product" element={<CreateProduct />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="users" element={<Users />} />
              <Route path="profile/deactivate" element={<Deactivate />} />
              <Route path="product/:productId" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
