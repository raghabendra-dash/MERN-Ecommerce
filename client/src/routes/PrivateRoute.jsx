/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { triggerCustomToast } from "../components/Toast/CustomToast";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth, isContextLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/user-auth`,
          {
            headers: {
              Authorization: auth?.token,
            },
          },
        );

        res.data.ok ? setOk(true) : setOk(false);
      } catch (error) {
        console.log(error);

        if (error.response.status === 401 && !isContextLoading) {
          //check for authentication when context gets updated from cookie
          setTimeout(() => {
            triggerCustomToast("error", "Please Log in to access Details!");
            navigate("/login", {
              state: location.pathname,
            });
          }, 500);
        }
      }
    };
    !isContextLoading && authCheck();
  }, [auth?.token, isContextLoading, location.pathname, navigate]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
