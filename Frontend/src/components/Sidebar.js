import React from "react";
import { Link, NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";
import logoimage from "../data/logoblack.png";
const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white   text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-green-700 dark:text-green-200  hover:bg-green-200 m-2";

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

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
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
            <Link to="/">
              <button className="flex items-center w-full gap-5 pl-4 pr-4 pt-3 pb-5 rounded-lg text-red-600  border-2 border-red-600 bg-white text-md hover:text-white hover:bg-red-600 m-2">
                <FaIcons.FaSignOutAlt />
                <span className="capitalize">Log Out</span>
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
