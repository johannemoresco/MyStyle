import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const Navigate = useNavigate(); // Use history for navigation

  const handleChange = (value) => setInput(value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      Navigate(`/user/${input}`); // Navigate to the Otherprofile component with the input as a URL param
    }
  };

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
