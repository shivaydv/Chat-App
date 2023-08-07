import React, { useEffect, useState ,useRef} from 'react'
import ChatHeader from './ChatHeader'
import ChatInputs from './ChatInputs'
import axios from 'axios'
import { recieveMessageRoute, sendMessageRoute } from '../Utils/APIRoutes'

import {v4 as uuidv4 } from "uuid"




const ChatWindow = ({user,myid,socket,setSelected}) => {
    

  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);

  //testing
  const [arrivalMessage,setArrivalMessage] = useState(null)


 

  useEffect(()=>{
    if(user)
    {
      getallmsg() 
    }
  },[user])

const getallmsg=async()=>{
  const {data} =await axios.post(recieveMessageRoute, {
        from: myid,
        to: user.id,})
      // console.log(data)
    setMessages(data);

    }

  const handleSendMsg =async(msg)=>{
   const {data} = await axios.post(sendMessageRoute, {
      from: myid,
      to: user.id,
      message: msg,
    });


    //testing
    socket.current.emit("send-msg",{
      from:myid,
      to:user.id,
      message:msg
    })
    //testing
    const msgs =[...messages];
    msgs.push({fromSelf:true,message:msg})
    setMessages(msgs)
    
  }
  //testing
  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        
        
        setArrivalMessage({fromSelf:false,message:msg})
      })
    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage])

  useEffect(() => {
    //  scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behaviour:"smooth"});
  }, [messages]);



  return (
    <div className={`w-full h-full flex pb-2 flex-col justify-between`} >
        <ChatHeader username={user.username} setSelected={setSelected} />
        
        <div className='flex-grow flex flex-col gap-3 px-4 py-4 overflow-scroll'>
        {messages.map((message) => {
          return (
            <div className='  grid ' ref={bottomRef} key={uuidv4()}>
              <div
                className={`py-2 px-3 max-w-[20rem] rounded-xl  ${
                  message.fromSelf ? " bg-white/90 text-black text-right justify-self-end  " : "bg-white/20 text-white justify-self-start "
                }`}
              >
                
                  <p>{message.message}</p>
              
              </div>
            </div>
          );
        })}
        </div>
        <ChatInputs handleSendMsg={handleSendMsg} />
    </div>
  )
}

export default ChatWindow