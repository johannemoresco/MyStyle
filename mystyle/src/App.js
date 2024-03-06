import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import Homepage from "./pages/homepage";
import './index.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} /> {}
        <Route path="/signup" element={<SignUp />} /> {}
        <Route path="/home" element={<Homepage/>} />

  
      </Routes>
    </BrowserRouter>
  );
}
export default App