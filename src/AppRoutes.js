import React from "react";
import {  Router, Routes, Route } from "react-router-dom";
import Home from "./ui/components/Home";

function AppRoutes() {
  return (
    
      <Routes>
         <Route path="/" element={<Home/>} />
        

      </Routes>
    
  );
}

export default AppRoutes;