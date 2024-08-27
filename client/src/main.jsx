import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Dashboard from './components/Buyer/BDashboard'
import Signup from "./components/Buyer/Signup"
import Login from "./components/Buyer/Login";
import FLogin from "./components/Farmer/FLogin";
import FSignup from "./components/Farmer/FSignup";
import Chat from "./components/Negotiate/Chat";
import  NotFoundPage  from './components/NotFoundPage';
import AgriConnect from '../src/components/LandingPage/AgriConnect'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buyer" element={<Dashboard />} />
        <Route path="/*" element={<NotFoundPage/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/fsignup" element={<FSignup/>}/>
        <Route path="/flogin" element={<FLogin/>}/>
        <Route path="/login" element={<Login/>}/>


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
