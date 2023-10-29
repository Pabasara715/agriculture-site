import React from "react";
import * as FaIcons from "react-icons/fa";
import "../App.css";
import logoimage from "../data/logo.png";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    role: "Buyer",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const onSubmit = (formData) => {
    console.log(formData);
    axios
      .post("http://localhost:3001/auth", formData)
      .then((response) => {
        enqueueSnackbar(
          "Registered successfully, You will directed to the Login page",
          {
            variant: "info",
            style: {
              fontSize: "20px",
            },
          }
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        enqueueSnackbar(`${error.response.data.error}`, { variant: "error" });
      });
  };

  const onBack = () => {
    navigate("/");
  };

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      maxSnack={3}
    >
      <div className="login-page">
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-8 sm:w-1/2 md:w-2/3 h-full">
            <div className="flex items-center">
              <img
                src={logoimage}
                style={{ width: "600px", height: "auto" }}
                alt="Logo"
              />
            </div>
          </div>

          <div className="fixed right-0 p-8 sm:w-1/2 md:w-1/3 h-full glass-morph rounded-r-lg shadow-md">
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
            <h2 className="text-2xl font-semibold text-green-700 text-center mt-10 mb-10">
              REGISTRATION
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="mb-6 text-center">
                  <label className="block text-sm font-extrabold text-gray-700">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="glass-morph-box lg:w-96 sm:w-full border-2 border-gray-300 p-2 focus:outline-none focus:border-green-500"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-6 text-center">
                  <label className="block text-sm font-extrabold text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="lg:w-96 sm:w-full glass-morph-box border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-20 text-center">
                  <label className="block text-sm font-extrabold text-gray-700">
                    Re-enter Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="lg:w-96 sm:w-full glass-morph-box border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Re-enter your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="lg:w-96 sm:w-full bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-500"
                  >
                    Register
                  </button>
                </div>
                <div className="text-center mt-10">
                  <button
                    onClick={onBack}
                    className="lg:w-96 sm:w-full bg-green-400 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-500"
                  >
                    Back
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default Registration;
