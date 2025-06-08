import React from "react";

function Search() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex items-center space-x-4 max-w-sm w-full border border-gray-200">
        <span className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <div>
          <div className="text-xl font-light text-green-900">
            Connection Established!
          </div>          
        </div>
      </div>
    </div>
  );
}

export default Search;