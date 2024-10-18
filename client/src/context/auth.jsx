import { useContext, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { triggerCustomToast } from "../components/Toast/CustomToast";
import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [isAdmin, setIsAdmin] = useState(0);
  const [isContextLoading, setIsContextLoading] = useState(true);
  useEffect(() => {
    const data = Cookies.get("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
      setIsAdmin(parsedData?.user?.role === 1);
    }
    setIsContextLoading(false);
  }, []);

  // make sure server is running when user visits the wesbsite
  useEffect(() => {
    const activateBackend = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/`);
        console.log("Backend: ", res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    activateBackend();
  }, []);
  //Function to Logout user
  const LogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    Cookies.remove("auth");
    triggerCustomToast("success", "Logged out Successfully!");
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, LogOut, isAdmin, isContextLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook->
const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
