import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "../App.css";
import logoimage from "../data/logo.png";

function Login() {
  return (
    <div className="login-page">
      <div className="min-h-screen flex items-center justify-center my-auto">
        <div className="  p-8 sm:w-1/2 md:w-2/3 h-full">
          <div className="flex items-center">
            <img
              src={logoimage}
              style={{ width: "600px", height: "auto" }}
              alt="Logo"
            />
          </div>
        </div>
        <div className="fixed right-0 p-8 sm:w-1/2 md:w-1/3 h-full glass-morph rounded-r-lg drop-shadow-md hover:drop-shadow-xl my-auto">
          <h2 className="text-2xl mt-10 font-semibold text-center mb-4">
            <div className="flex flex-col items-center justify-center mb-10">
              <div className="flex items-center gap-3">
                <FaIcons.FaCanadianMapleLeaf className="text-4xl text-green-900" />
                <span className="text-2xl font-extrabold tracking-tight text-green-900">
                  GREENFOODS
                </span>
              </div>
            </div>
          </h2>
          <h2 className="text-2xl font-extrabold text-green-600 text-center mt-10 mb-16">
            LOGIN
          </h2>
          <form className="text-center items-center">
            <div className="mb-6 text-center">
              <label className="block text-sm my-4 mt-5 font-extrabold text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="glass-morph-box  lg:w-96 sm:w-full mb-4 border-2 border-gray-300 p-2  focus:outline-none focus:border-green-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6 text-center">
              <label className="block text-sm my-4 mt-5 font-extrabold text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="glass-morph-box  lg:w-96 mb-10 sm:w-full border-2 border-gray-300 p-2  focus:outline-none focus:border-green-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="lg:w-96 sm:w-full mt-10 bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-500"
              >
                Log In
              </button>
            </div>
            <div className="text-center">
              <Link
                to="/registration"
                className="block mt-4 lg:w-96 sm:w-full mx-auto text-center bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-500"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
