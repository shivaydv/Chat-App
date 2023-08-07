import React from 'react'
import {BrowserRouter , Routes,Route} from "react-router-dom"
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'
import ErrorPage from './Pages/ErrorPage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Home/>} />
            <Route path='*' element={<ErrorPage/>} />
        </Routes>
        
    </BrowserRouter>
  )
}

export default App