import { useState } from "react";
import "./sb.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

function sb() {
    const [results, setResults] = useState([]);

  return (
    <div className = "sb">
        <div className = "search-bar-container">
          <SearchBar setResults = {setResults} />
          <SearchResultsList results = {results} />
        </div>
    </div>
  );
}

export default sb;
