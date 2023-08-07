import React, { useEffect, useState,useRef } from 'react'
import Contacts from '../Components/Contacts'
import { useNavigate } from 'react-router-dom'


//testing
import {io} from "socket.io-client"
import { host } from "../Utils/APIRoutes";

const Home = () => {

  //testing
  const socket = useRef()

const Navigate = useNavigate()


const [currentUser,setCurrentUser]= useState(undefined)
const [isLoaded, setIsLoaded] = useState(false)

useEffect(() => {

  //Send to Login Page if not Login
  if(!localStorage.getItem("Chat_App_User")){
    Navigate("/login");
  }else{
    //Get Current User
    setCurrentUser(JSON.parse(localStorage.getItem("Chat_App_User")))
    setIsLoaded(true)
  }
}, [])

//testing
useEffect(() => {

  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user",currentUser._id)
   
  } 
}, [currentUser])


if(isLoaded){
  
  const {username, _id}=currentUser
  
  return (
<>
<div className=' w-screen h-screen overflow-hidden flex justify-center items-center text-white'>
    <div className='bg-[#131324] w-screen h-screen  flex text-white'>
        <Contacts username={username} id={_id} socket={socket}/>
    </div>
</div>
</>  )
}
}

export default Home