
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import Homepage from "./pages/homepage";
import Upload from "./pages/upload";
import Notification from "./pages/notifications";
import Userprofile from "./pages/userprofile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} /> {}
        <Route path="/signup" element={<SignUp />} /> {}
        <Route path="/home" element={<Homepage/>} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/notifications" element={<Notification/>} />
        <Route path="/profile" element={<Userprofile/>}/>


  
      </Routes>
    </BrowserRouter>
  )
}
export default App