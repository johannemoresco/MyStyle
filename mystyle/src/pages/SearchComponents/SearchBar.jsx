import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { db } from "../../firebase";
import "./SearchBar.css";

import { getDocs, query, collection, where } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate(); // Use history for navigation
  const [userInfo, setUserInfo] = useState({});

  const handleChange = (value) => setInput(value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/otherprofile/${userInfo.uid}`); // Navigate to the Otherprofile component with the input as a URL param
    }
  };

  const fetchUserID = async () => {
    const nombre = input;
    try {
      const usersCollectionRef = collection(db, "users");
      const usersQuery = query(usersCollectionRef, where("username", "==", nombre));
      const querySnapshot = await getDocs(usersQuery);
      const userDataDocument = querySnapshot.docs.find(doc => doc.data().username === nombre);
      if (userDataDocument) {
        setUserInfo(userDataDocument.data());
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  useEffect(() => {
      fetchUserID();
  }, [input] );


  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search username..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};