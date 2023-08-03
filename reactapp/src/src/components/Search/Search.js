import React, { useState, useEffect, useRef } from "react";
import fetchData from "./utillity";
import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("Programming");
  const [suggestions, setSuggestions] = useState([]);
  const timer = useRef(null);
  const clearTimer = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fetchData(searchTerm).then((data) => {
          setSuggestions(data);
        });
      }, 500);
    } else {
      clearTimeout(clearTimer.current);
      clearTimer.current = setTimeout(() => setSuggestions([]), 200);
    }

    return () => {
      clearTimeout(timer.current);
      clearTimeout(clearTimer.current);
    };
  }, [searchTerm]);

  return (
    <div>
      <h2 className='header'>Wiki Search</h2>
      <input
        data-testid='searchterm'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className='suggestion-list'>
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              className={`suggestion-item ${i % 2 === 0 ? "even" : "odd"}`}
            >
              <a data-testid='suggestion' href={suggestion.link}>
                {suggestion.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
