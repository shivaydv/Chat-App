// IMPORTS
import React, { useEffect, useState } from "react";
import logo from "../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIRoutes";

const Login = () => {

  //Hooks
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  //Styling Toast Menu
  const toastOptions = {
    position: "top-right",
    autoclose: 8000,
    draggable: true,
    theme: "dark",
  };

  //Stores the value of input fields of login page
  const handlechange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Check is user is already login or not if yes redirect to homepage
  useEffect(() => {
    if (localStorage.getItem("Chat_App_User")) {
      Navigate("/");
    }
  }, []);

  //Handles login input values Validation
  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is Required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is Required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {

    //Prevent the refressing of page after submitting
    e.preventDefault();

    //Checking Validation
    if (handleValidation()) {

      const { username, password } = values;

      //Sending Data To Backend at login Route
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      //Displaying Error Send By The Backend Server
      if (data.status === false) toast.error(data.msg, toastOptions);

      //Storing User Credentials To Local Storage if there is no error
      if (data.status === true) {
        localStorage.setItem("Chat_App_User", JSON.stringify(data.user));

        //Send to Home Page After Successfull Login
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
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handlechange(e)}
        />

        <button
          className="bg-blue-600 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-white font-semibold uppercase "
          type="submit"
        >
          Login
        </button>
        <div className="flex justify-between">
          <span className="text-white">Don't have an account ?</span>
          <Link className=" text-blue-700 font-bold " to="/register">
            Register
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
