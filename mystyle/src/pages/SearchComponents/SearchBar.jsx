import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { db } from "../../firebase";
import "./SearchBar.css";

import { getDocs, query, collectionGroup, where } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => setInput(value);
 // console.log(input);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const userID = await fetchUserID();
      if(userID) {
        navigate(`/otherprofile/${userID}`);
      }
    }
  };

  const fetchUserID = async () => {
    // console.log(input);
    try {
      const usernameQuery = query(collectionGroup(db, "userData"), where("username", "==", input));
      const querySnapshot = await getDocs(usernameQuery);
      
      if (querySnapshot.empty) {
        alert("No user with that username.");
      } else {
        const userData = querySnapshot.docs[0].data(); 
        const userID = userData.uid;
      //  console.log("UID:", userID);
        return userID;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search username..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};