import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import DisplayInstallationsForAdmin from "./DisplayInstallationsForAdmin";
import DisplayInstallationsForManager from "./DisplayInstallationsForManager";

function DisplayInstallations() {
  const { user } = useContext(AuthContext);

  if (user.role === "admin") {
    return <DisplayInstallationsForAdmin />;
  }

  if (user.role === "project manager") {
    return <DisplayInstallationsForManager />;
  }

  return <Navigate to="/" />;
}

export default DisplayInstallations;
