import React, { useState } from "react";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const search = (q) => {
    return alert("seach: " + q);
  };

  return (
    <form className="search-box-container">
      <input
        type="text"
        name="q"
        id="search-box"
        placeholder="search here..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <a href="#" onClick={() => search(keyword)}>
        <label htmlFor="search-box" className="fas fa-search" />
      </a>
    </form>
  );
}
