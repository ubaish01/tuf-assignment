import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../service/request";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AUTH = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
};

const useAuth = () => {
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await postRequest(AUTH.LOGIN, data);
      if (res.data?.user?.id) {
        localStorage.setItem("login", "true");
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        setLogin(true);
        toast.success(res.data?.message);
        navigate("/dashboard");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await getRequest(AUTH.LOGOUT);
      if (res?.data?.success) {
        localStorage.removeItem("login");
        localStorage.removeItem("user");
        toast.success("Logged out succesfully");
        setLogin(false);
        navigate("/");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("login");
    setLogin(Boolean(loginStatus || false));
  }, []);

  return {
    isLogin,
    login,
    logout,
    isLoading,
  };
};

export default useAuth;
