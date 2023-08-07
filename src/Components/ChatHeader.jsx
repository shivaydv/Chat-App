import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const ChatHeader = ({ username,setSelected }) => {

const Navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem("Chat_App_User");
    Navigate("/login")
  }
  return (
    <div className="w-full h-[10%] flex justify-between items-center px-6 py-4  ">
      <div className="flex justify-center items-center  gap-6">
        <AiOutlineArrowLeft size={28} onClick={()=>setSelected(undefined)} />
        <img
          
          className="w-12 h-12 object-cover  rounded-full"
          src={
            "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1956494063.1684252344&semt=ais"
          }
        />
        <h1 className="text-xl font-semibold capitalize ">{username}</h1>
      </div>
      <button onClick={logout} className="p-2 bg-red-600/80 text-sm hover:bg-white/30 ease-in-out duration-100 rounded-lg">Logout</button>
    </div>
  );
};

export default ChatHeader;
