import React from 'react'
import img from "../Assets/404.jpg"

const ErrorPage = () => {
  return (
    <div className='bg-white  w-screen h-screen '>
        <img className='w-full h-full object-contain' src={img} alt="" />
        </div>
  )
}

export default ErrorPage