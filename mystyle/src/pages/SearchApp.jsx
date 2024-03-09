import { useState } from "react";
import "./SearchApp.css";
import { SearchBar } from "./SearchComponents/SearchBar";
import { SearchResultsList } from "./SearchComponents/SearchResultsList";
import NavBar from './navbar';

function SearchApp() {
    const [results, setResults] = useState([]);

  return (
    
    <div className = "SearchApp">
        <NavBar />
        <div className = "search-bar-container">
          <SearchBar setResults = {setResults} />
          <SearchResultsList results = {results} />
        </div>
    </div>
  );
}

export default SearchApp;
