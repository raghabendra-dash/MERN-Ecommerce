/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BiHomeSmile } from "react-icons/bi";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { BsCart2, BsBox } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLogin, MdLogout } from "react-icons/md";
import { useAuth } from "../../context/auth";
import SearchBar from "./SearchBar";
import { useCart } from "../../context/cart";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { auth, LogOut } = useAuth();
  const { cartItems } = useCart();

  const toggleDropdown = () => {
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    LogOut();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[10000] h-[70px] w-full bg-white shadow-lg">
      <nav className="h-full p-1 sm:px-4 sm:py-2 md:px-12">
        <div className="flex h-full w-full items-center justify-between gap-1.5 sm:gap-6 md:gap-8 lg:gap-16">
          {/* primary div */}
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-10 sm:h-14 sm:w-14" />
          </Link>

          {/* secondary div */}
          <div className="flex w-[70%] flex-1 items-center gap-1 sm:gap-5 lg:gap-14">
            {/* search bar*/}
            <SearchBar />
            {/* home */}
            <div className="group hidden items-center rounded-full px-2 py-2 hover:bg-slate-100 sm:flex sm:px-3">
              <NavLink to="/" className="flex items-center gap-1">
                <BiHomeSmile className="text-2xl" />
                <span className="hidden text-lg md:block lg:block">Home</span>
              </NavLink>
            </div>

            {/* Account */}
            <div
              className={`group relative flex cursor-pointer items-center rounded-full px-2 py-2 sm:px-3 ${
                auth.user ? "hover:bg-slate-100" : "hover:bg-primary"
              } `}
              onMouseEnter={toggleDropdown}
              onMouseLeave={closeDropdown}
            >
              {auth.user ? (
                <div className="flex items-center gap-1">
                  <AiOutlineUser className="text-xl sm:text-2xl" />
                  <span className="hidden max-w-fit text-lg md:block">
                    <p>{auth.user.name.split(" ")[0]}</p>
                  </span>
                  <span>
                    <RiArrowDropDownLine className="transition-all group-hover:rotate-[180deg]" />
                  </span>
                </div>
              ) : (
                <div className="flex w-fit items-center gap-1">
                  <Link
                    to="/login"
                    className="flex gap-1 group-hover:text-white"
                  >
                    <AiOutlineUser className="text-xl group-hover:text-white sm:text-2xl" />
                    <span className="hidden max-w-fit whitespace-nowrap text-[18px] md:block lg:block">
                      <p>Sign in</p>
                    </span>
                  </Link>
                  <span>
                    <RiArrowDropDownLine className="transition-all group-hover:rotate-[180deg] group-hover:text-white" />
                  </span>
                </div>
              )}

              {/* dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute -left-[80%] top-[38px] z-50 w-[140px] rounded-b-md bg-white p-2 shadow-2xl transition-all sm:-left-[2px] sm:top-[44px]">
                  <ul>
                    {!auth.user && (
                      <li className="rounded-md p-1 hover:bg-slate-100">
                        <Link
                          to="/register"
                          className="flex items-center gap-3"
                        >
                          <MdLogin className="text-[14px]" />
                          <span className="text-[16px]">Sign up</span>
                        </Link>
                      </li>
                    )}
                    <li className="rounded-md p-1 hover:bg-slate-100">
                      <Link
                        to={`${
                          auth?.user?.role === 1 ? "/admin" : "/user"
                        }/dashboard`}
                        className="flex items-center gap-3"
                      >
                        <AiOutlineUser className="text-[14px]" />
                        <span className="text-[16px]">My Profile</span>
                      </Link>
                    </li>
                    {/* if user is not admin */}
                    {auth.user?.role !== 1 && (
                      <li className="rounded-md p-1 hover:bg-slate-100">
                        <Link
                          to="/user/wishlist"
                          className="flex items-center gap-3"
                        >
                          <AiOutlineHeart className="text-[14px]" />
                          <span className="text-[16px]">Wishlist</span>
                        </Link>
                      </li>
                    )}
                    <li className="rounded-md p-1 hover:bg-slate-100">
                      <Link
                        to={`${
                          auth?.user?.role === 1 ? "/admin" : "/user"
                        }/orders`}
                        className="flex items-center gap-3"
                      >
                        <BsBox className="text-[14px]" />
                        <span className="text-[16px]">Orders</span>
                      </Link>
                    </li>

                    {auth.user && (
                      <li className="rounded-md p-1 hover:bg-slate-100">
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className="flex items-center gap-3"
                        >
                          <MdLogout className="text-[14px]" />
                          <span className="text-[16px]">Logout</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* cart */}
            {auth?.user?.role !== 1 && (
              <div className="group flex items-center rounded-full p-2 hover:bg-stone-100 sm:p-3">
                <NavLink
                  to="/cart"
                  className="relative flex items-center gap-1"
                >
                  <span className="absolute bottom-3 left-2 h-4 w-4 rounded-[50%] bg-primary text-center text-xs font-semibold text-white">
                    {cartItems?.length}
                  </span>
                  <BsCart2 className="text-xl sm:text-2xl" />
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
