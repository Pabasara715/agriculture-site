import React from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { links, links_2 } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";
import logoimage from "../data/logoblack.png";

const Sidebar = () => {
  const { currentColor, activeMenu } = useStateContext();
  const navigate = useNavigate();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white   text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-green-700 dark:text-green-200  hover:bg-green-200 m-2";
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("id");
    navigate("/");
  };
  const location = useLocation();
  const isorder = location.pathname === "/order";
  const isproductupdate = location.pathname === "/productupdate";
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <div
              to="/"
              className="items-center text-center  mx-auto mt-4 flex text-xl font-extrabold tracking-tight text-green-900"
            >
              <img
                src={logoimage}
                style={{ width: "200px", height: "auto" }}
                alt="Logo"
              />
            </div>
          </div>
          <div className="mt-10 ">
            {(isorder || isproductupdate ? links_2 : links).map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={link.path}
                    key={link.name}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute  mb-10 text-center bottom-0 items-center  w-60">
            <button
              onClick={logout}
              className="flex items-center w-full gap-5 pl-4 pr-4 pt-3 pb-5 rounded-lg text-red-600  border-2 border-red-600 bg-white text-md hover:text-white hover:bg-red-600 m-2"
            >
              <FaIcons.FaSignOutAlt />
              <span className="capitalize">Log Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
