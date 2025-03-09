import { Outlet, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "./context/authContext";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import makeNameLogo from "./utils/fullName.js";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user.passwordChanged) {
    return <UpdateProfile />;
  }

  return (
    <div id="myApp" className="w-full h-screen flex ">
      <div
        id="side-bar"
        className={`absolute flex flex-col lg:relative w-64 h-full bg-blue-800 text-white overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }  lg:translate-x-0 z-10`}
      >
        <div id="nav-bar" className=" w-full h-16 flex justify-between ">
          <div id="profile" className=" flex flex-1 ">
            <div className="bg-blue-900 flex justify-center items-center w-16">
              <p
                className="text-xl cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                {makeNameLogo(user.fullName)}
              </p>
            </div>
            <div className="flex flex-col bg-blue-900 text-white justify-center gap-1 px-2 py-1 flex-1">
              <p className="text-sm overflow-hidden">{user.fullName}</p>
              <p className="text-xs">{user.role}</p>
            </div>
          </div>

          <button
            className="lg:hidden bg-blue-800 text-white w-16 h-16 text-xl"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            X
          </button>
        </div>

        {/* all the side bar buttons */}

        <div id="side-bar-buttons" className="w-full flex-1 ">
          {user.role === "admin" && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/estimation");
              }}
            >
              Estimation Tool
            </button>
          )}

          {user.role === "admin" && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/addInstallation");
              }}
            >
              Add Installation
            </button>
          )}

          {(user.role === "admin" || user.role === "project manager") && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/displayInstallations");
              }}
            >
              Display Installations
            </button>
          )}

          {user.role === "admin" && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/addEmployee");
              }}
            >
              Add Employee
            </button>
          )}

          {user.role === "admin" && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/displayEmployees");
              }}
            >
              Display Employees
            </button>
          )}

          {user.role === "admin" && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/addClient");
              }}
            >
              Add Client
            </button>
          )}

          {user.role === "admin" && (
            <button
              className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
              onClick={() => {
                navigate("/displayClients");
              }}
            >
              Display Clients
            </button>
          )}
        </div>

        <div id="side-bar-footer" className=" w-full h-16">
          <button
            onClick={() => {
              logout();
            }}
            className="h-16 w-full bg-blue-600 text-white text-xl cursor-pointer"
          >
            logout
          </button>
        </div>
      </div>

      <div id="main-menu" className="bg-gray-100 h-full flex-1 flex flex-col ">
        <div id="nav-bar" className="lg:hidden w-full h-16 bg-black flex">
          <button
            className="bg-blue-800 text-white w-16 h-16 text-xl"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            X
          </button>
        </div>

        <div id="content-area" className="overflow-auto flex-1">
          {/* main content here */}
          <Outlet />
        </div>
      </div>
      {/* overlayer */}
      {isOpen && (
        <div
          id="overlayer"
          className="fixed inset-0 bg-black opacity-50 "
        ></div>
      )}
    </div>
  );
}

export default App;
