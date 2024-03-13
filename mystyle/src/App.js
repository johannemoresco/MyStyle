
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import Homepage from "./pages/homepage";
import Upload from "./pages/upload";
import Userprofile from "./pages/userprofile";
import SearchApp from "./pages/SearchApp";
import Otherprofile from "./pages/otherprofile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} /> {}
        <Route path="/signup" element={<SignUp />} /> {}
        <Route path="/home" element={<Homepage/>} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/profile" element={<Userprofile/>}/>
        <Route path="/search" element={<SearchApp />} />
        <Route path="/otherprofile/:id" element={<Otherprofile />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App