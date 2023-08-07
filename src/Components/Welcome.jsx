import React from "react";
import robo from "../Assets/robot.gif";

const Welcome = ({ username="Guest" }) => {
  return (
    <div className=" w-full h-full flex flex-col justify-center items-center ">
      <img className="w-72 h-72 object-cover scale-125" src={robo} alt="" />

      <h1 className="text-3xl font-bold  ">
        Welcome{" "}
        <span className="text-3xl font-bold text-[#701eff]/80">{username}</span>
      </h1>
      <p>Please Select a Chat to Start Messaging</p>
    </div>
  );
};

export default Welcome;
