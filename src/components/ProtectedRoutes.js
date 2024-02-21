import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import { jwtDecode } from "jwt-decode";
const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem("token");
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  const decode = jwtDecode(isAuth);
  const time = Date.now() / 1000;
  if (decode.exp < time) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  } else {
    return <Layout />;
  }
};

export default ProtectedRoutes;
