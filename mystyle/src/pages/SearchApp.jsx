import { useState } from "react";
import "./SearchApp.css";
import { SearchBar } from "./SearchComponents/SearchBar";
import NavBar from './navbar';

function SearchApp() {
    const [results, setResults] = useState([]);

  return (
    
    <div className = "SearchApp">
        <NavBar />
        <div className = "search-bar-container">
          <SearchBar setResults = {setResults} />
        </div>
    </div>
  );
}

export default SearchApp;
