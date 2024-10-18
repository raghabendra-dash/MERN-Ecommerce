import { useAuth } from "../../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { IoClose } from "react-icons/io5";
import user from "../../assets/images/user.png";

const AdminMenu = ({ toggleMenu }) => {
  const { auth, LogOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    LogOut();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex w-full flex-col gap-3 shadow-xl">
      <div className="relative flex items-start gap-4 rounded-sm bg-white p-3 shadow-md">
        <img src={user} alt="admin svg" className="h-14 w-14" />

        <div className="flex flex-col justify-center p-1">
          <span>Hello,</span>
          <span className="text-[16px] font-[600]">{auth?.user?.name}</span>
        </div>
        <div
          className="absolute right-4 top-2 cursor-pointer rounded-full p-1 transition-all duration-200 ease-in-out hover:scale-[1.06] hover:bg-gray-200 md:hidden"
          onClick={toggleMenu}
        >
          <IoClose className="h-6 w-6" />
        </div>
      </div>

      <div className="flex flex-col justify-center overflow-y-auto rounded-sm bg-white sm:shadow-md">
        <div className="flex flex-col justify-center border-b-[1px]">
          <div className="flex flex-row items-center gap-6 py-[8px] pl-[10px]">
            <PersonIcon className="text-base text-primary" />
            <div className="text-sm font-semibold text-slate-500">
              ADMIN DASHBOARD
            </div>
          </div>
          <div className="mb-2 mt-0 flex flex-col text-sm font-[300] text-black">
            <NavLink
              to="./profile"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "bg-[#f1f3f5] font-[600] text-primary" : ""
              }
            >
              <div className="flex h-[40px] items-center px-[60px] hover:bg-[#f1f3f5] hover:text-primary">
                Profile Information
              </div>
            </NavLink>
            <NavLink
              to="/admin/orders "
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "bg-[#f1f3f5] font-[600] text-primary" : ""
              }
            >
              <div className="flex h-[40px] items-center px-[60px] hover:bg-[#f1f3f5] hover:text-primary">
                Orders
              </div>
            </NavLink>

            <NavLink
              to="./all-products"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "bg-[#f1f3f5] font-[600] text-primary" : ""
              }
            >
              <div className="flex h-[40px] items-center px-[60px] hover:bg-[#f1f3f5] hover:text-primary">
                Products
              </div>
            </NavLink>

            <NavLink
              to="./add-product"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "bg-[#f1f3f5] font-[600] text-primary" : ""
              }
            >
              <div className="flex h-[40px] items-center px-[60px] hover:bg-[#f1f3f5] hover:text-primary">
                Add Product
              </div>
            </NavLink>

            <NavLink
              to="./users"
              onClick={scrollToTop}
              className={({ isActive }) =>
                isActive ? "bg-[#f1f3f5] font-[600] text-primary" : ""
              }
            >
              <div className="flex h-[40px] items-center px-[60px] hover:bg-[#f1f3f5] hover:text-primary">
                Users
              </div>
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col justify-center border-b-[1px]">
          <div className="group flex flex-row items-center gap-6 py-[8px] pl-[10px]">
            <PowerSettingsNewIcon className="text-[16px] text-primary" />
            <button
              className="flex h-[40px] w-full items-center text-[14px] font-[600] text-slate-500 group-hover:text-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <span className="text-xs font-medium">Frequently Visited:</span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link to="/forgot-password">Change Password</Link>
            <Link to="/admin/orders">Track Order</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
