import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Home() {
  const { user } = useContext(AuthContext);
  if (user.role == "admin") {
    return <div>ADMIN , under construction</div>;
  }
  if (user.role == "project manager") {
    return <div>PROJECT MANAGER , under construction</div>;
  }
  if (user.role == "warehouse manager") {
    return <div>WAREHOUSE MANAGER , under construction</div>;
  }
}

export default Home;
