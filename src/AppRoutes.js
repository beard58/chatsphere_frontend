import React from "react";
import {  Router, Routes, Route } from "react-router-dom";
import Home from "./ui/components/Home";
import Login from "./ui/components/login";
import ForgetPassword from "./ui/components/forgetpassword";
import Dashboard from "./ui/components/dashboard";

function AppRoutes() {
  return (
    
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/forgetpassword" element={<ForgetPassword/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    
  );
}

export default AppRoutes;