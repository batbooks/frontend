import { useState } from "react";

export default function SearchBar() {
  const [searched,setsearched]=useState("")
    const onSearch=()=>{
        
    }
    return (
      <div className="flex items-center justify-center bg-[#D9F0FF] p-6">
        <div className="relative w-full max-w-lg">
          <input

            type="text"
            onChange={(e)=>setsearched(e.target.value)}
            placeholder="Search Your Books"
            className="w-full px-12 py-2 rounded-full border border-gray-300 bg- shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
          />
          {/* Custom Search Icon */}
          <svg
            onClick={onSearch}
            className="absolute left-3 top-2 w-6 h-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="currentColor"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
          {/* Filter Icon */}
          
        </div>
      </div>
    );
  }