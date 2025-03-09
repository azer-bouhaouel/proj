import { useContext } from "react";
import { AuthContext } from "../context/authContext";

import UpdateProfileForAdmin from "./UpdateProfileForAdmin";
import UpdateProfileForEmployee from "./UpdateProfileForEmployee";
import { Navigate } from "react-router-dom";

function UpdateProfile() {
  const { user } = useContext(AuthContext);

  if (user.role == "admin") {
    return <UpdateProfileForAdmin />;
  }

  if (user.role === "project manager") {
    return <UpdateProfileForEmployee />;
  }

  return <Navigate to="/" />;
}
export default UpdateProfile;
