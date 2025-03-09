import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function PrivateRoute() {
  const { token } = useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
