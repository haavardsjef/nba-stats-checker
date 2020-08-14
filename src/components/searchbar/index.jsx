import React from "react";
import "./style.css";

export default function SearchBar({ getPlayers }) {
  return (
    <div>
      <input
        placeholder="Search..."
        id="search-bar"
        onChange={(e) => getPlayers(e.target.value)}
        autoFocus
      ></input>
    </div>
  );
}
