import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function PublicRoute() {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
