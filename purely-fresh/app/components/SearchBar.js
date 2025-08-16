"use client"
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Add search functionality here
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 pl-4 pr-20 rounded-l flex-grow"
        placeholder="Search products..."
      />
      <button type="submit" className="bg-white text-[#074F3B] p-2 rounded-r pr-6">
        Search
      </button>
    </form>
  );
}
