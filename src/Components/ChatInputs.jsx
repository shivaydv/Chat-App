import React, { useState } from 'react'
import {AiOutlineSend} from "react-icons/ai"

const ChatInputs = ({handleSendMsg}) => {

    const [input, setInput] = useState("")


  const handleSubmit =(e)=>{
    e.preventDefault()
    if(input.length>0){
      handleSendMsg(input)
      setInput("")
    }
   
  }

  return (
    <div className='  w-full px-2  '>
        <form onSubmit={handleSubmit} className='flex w-full border gap-2 rounded-lg px-2 py-2 items-center justify-between '>
            <input value={input} onChange={(e)=>setInput(e.target.value)}  className='bg-transparent w-full px-2 py-1 capitalize outline-none' placeholder='Enter a Message' type="text" />
            <button type='submit' className=''><AiOutlineSend size={25}/></button>
        </form>
    </div>
  )
}

export default ChatInputs