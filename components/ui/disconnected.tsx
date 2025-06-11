import React from "react";

function Search() {
  return (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex items-center space-x-4 max-w-xs w-full border border-gray-200">
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100">
        <svg
          className="h-6 w-6 text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <div>
        <div className="text-xl font-light text-red-900">Disconnected</div>
      </div>
    </div>
  );
}

export default Search;
