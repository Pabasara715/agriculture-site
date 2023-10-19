import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OrderHistory from "./pages/User/OrderHistory";
import OrderRequest from "./pages/User/OrderRequest";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isRegistration = location.pathname === "/registration";

  return (
    <div>
      <div className="flex relative">
        {isLoginPage || isRegistration ? null : (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        )}

        <div
          className={
            "dark:bg-main-dark-bg bg-main-bg min-h-screen w-full" +
            (isLoginPage || isRegistration ? "" : " md:ml-72")
          }
        >
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/orderrequest" element={<OrderRequest />} />
              <Route path="/orderhistory" element={<OrderHistory />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
