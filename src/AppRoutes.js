import React from "react";
import {  Router, Routes, Route } from "react-router-dom";
import Home from "./ui/components/Home";
import Login from "./ui/components/login";
import ForgetPassword from "./ui/components/forgetpassword";
import Dashboard from "./ui/components/dashboard";
import ChatComponent from "./ui/components/chatcomponent";
import Registration from "./ui/components/Registration";
import ChatStomp from "./ChatStomp";

function AppRoutes() {
  return (
    
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/forgetpassword" element={<ForgetPassword/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/chat" element={<ChatComponent/>} />
         <Route path="/registration" element={<Registration/>} />
          <Route path="/chatModule" element={<ChatStomp/>} />

      </Routes>
    
  );
}

export default AppRoutes;