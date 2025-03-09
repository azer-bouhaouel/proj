import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import EstimationTool from "./pages/EstimationTool.jsx";
import PrivateRoute from "./security/PrivateRoute.jsx";
import PublicRoute from "./security/PublicRoute.jsx";
import AddInstallation from "./pages/AddInstallation.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import AddClient from "./pages/AddClient.jsx";
import DisplayClients from "./pages/DisplayClients.jsx";
import DisplayEmployees from "./pages/DisplayEmployees.jsx";
import DisplayInstallations from "./pages/DisplayInstallations.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<UpdateProfile />} />
              <Route path="/estimation" element={<EstimationTool />} />
              <Route path="/addInstallation" element={<AddInstallation />} />
              <Route path="/addEmployee" element={<AddEmployee />} />
              <Route path="/addClient" element={<AddClient />} />
              <Route path="/displayClients" element={<DisplayClients />} />
              <Route path="/displayEmployees" element={<DisplayEmployees />} />
              <Route
                path="/displayInstallations"
                element={<DisplayInstallations />}
              />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
