// IMPORTS
import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utils/APIRoutes";

const Register = () => {
  //Hooks
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Styling Toast Menu
  const toastOptions = {
    position: "top-right",
    autoclose: 8000,
    draggable: true,
    theme: "dark",
  };

  //Stores the value of input fields of registration page
  const handlechange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Handles registration input values Validation
  const handleValidation = () => {
    const { email, username, password, confirmPassword } = values;
    if (email === "") {
      toast.error("Email is Required", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be atleast 3 Digits", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be atleast 8 Digits", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {

    //Prevent the refressing of page after submitting
    e.preventDefault();

    //Checking Validation
    if (handleValidation()) {

      const { email, username, password } = values;

      //Sending Data To Backend at register Route
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      //Displaying Error Send By The Backend Server
      if (data.status === false) toast.error(data.msg, toastOptions);

      //Storing User Credentials To Local Storage if there is no error 
      if (data.status === true) {
        localStorage.setItem("Chat_App_User", JSON.stringify(data.user));
        
        //Send to Home Page After Successfull Registration
        Navigate("/");
      }
    }
  };

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-[#131324] overflow-hidden ">
      <form
        className="w-80 flex flex-col gap-4  px-8 py-12  "
        onSubmit={handleSubmit}
      >
        <div className=" mx-[auto] flex items-center space-x-3 mb-6 justify-center">
          <img src={logo} alt="logo" />
          <h1 className=" text-2xl text-white">Chat App</h1>
        </div>

        <input
          className=" py-2 px-3 rounded-lg outline-none text-black "
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => handlechange(e)}
        />
        <input
          className=" py-2 px-3 rounded-lg outline-none text-black "
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handlechange(e)}
        />
        <input
          className=" py-2 px-3 rounded-lg outline-none text-black "
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handlechange(e)}
        />
        <input
          className=" py-2 px-3 rounded-lg outline-none text-black "
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => handlechange(e)}
        />
        <button
          className="bg-blue-600 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-white font-semibold uppercase "
          type="submit"
        >
          Register
        </button>
        <div className="flex justify-between">
          <span className="text-white">Already have an account ?</span>
          <Link className=" text-blue-700 font-bold " to="/login">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
