import React from "react";

function Search({ name = "KB" }: { name?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex items-center space-x-4 max-w-xl w-full border border-gray-200">
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-amber-100">
        <svg
          className="h-6 w-6 text-amber-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </span>
      <div>
        <div className="text-2xl font-bold text-amber-900 mb-1">
          Welcome Back, {name}!
        </div>
        <div className="text-lg text-amber-800 font-medium">
          Login Successful! Redirecting to Richy Website.
        </div>
      </div>
    </div>
  );
}

export default Search;
