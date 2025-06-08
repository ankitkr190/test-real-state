import React, { useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";

function SearchSection() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    flag: "/uk.svg",
    label: "EN",
    value: "en",
  });
  const [searchValue, setSearchValue] = useState("");
  
  const suggestions = [
    "Find Your Ideal 2BHK Deal",
    "Reconnect with Open House Leads",
    "Estimate Renovation Costs for a 3-Bedroom Townhouse",
    "Compose a Waterfront Condo Inquiry",
    "Draft a Follow-Up Email After Tenant Move-In",
  ];
  
  const langOptions = [
    {
      flag: "/uk.svg",
      label: "English",
      value: "en",
    },
    {
      flag: "/th.svg",
      label: "แบบไทย",
      value: "th",
    },
    {
      flag: "/ch.svg",
      label: "中国人",
      value: "zh",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">      
      <div className="relative bg-[#FCF9E6] rounded-2xl shadow-2xl w-full max-w-7xl mx-4 h-[600px] p-0 flex flex-col items-center justify-center">        
        <div className="flex justify-center items-center w-full mt-8 mb-2">
          <img src="/richy.svg" alt="Richy Logo" className="h-20" />
        </div>        
        <div className="absolute top-6 right-16">
          <button
            className="flex items-center gap-2 bg-white rounded px-3 py-2 shadow"
            onClick={() => setDropdownOpen((open) => !open)}
            type="button"
          >
            <img
              src={selectedLang.flag}
              alt={selectedLang.label}
              className="w-6 h-6 rounded"
            />
            <span>{selectedLang.label}</span>
            <svg
              className="ml-1 w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl border-1 border-[#4D8D67] shadow z-10 py-2">
              {langOptions.map((option) => (
                <button
                  key={option.value}
                  className="flex items-center w-full px-4 py-3 hover:bg-green-100 gap-4"
                  onClick={() => {
                    setSelectedLang(option);
                    setDropdownOpen(false);
                  }}
                  type="button"
                >
                  <img
                    src={option.flag}
                    alt={option.label}
                    className="w-8 h-8 rounded"
                  />
                  <span className="text-lg text-[#0D3D21]">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>        
        <button className="absolute top-7 right-8 text-2xl text-gray-400 hover:text-gray-600">
          &times;
        </button>        
        <div className="flex flex-col items-center justify-center w-full px-8 py-8">
          <h1 className="font-sans text-4xl md:text-5xl font-bold mb-6 mt-4 text-center bg-gradient-to-r from-[#00804A] to-[#0D3D21] bg-clip-text text-transparent leading-tight pb-1">
            Hi, how can I help you today?
          </h1>
          <div className="flex items-center w-full max-w-3xl bg-[#181B2B] rounded-full overflow-hidden mb-4 drop-shadow-xl">
            <div className="flex items-center flex-1 px-6 py-3">
              <FaSearch className="text-white text-xl mr-3" />
              <input
                className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-400"
                placeholder="Type your real estate need — Richy will handle the rest!"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center bg-gradient-to-br from-[#00804A] to-[#0D3D21] h-full px-5 rounded-bl-[30px] hover:from-green-400"
              type="button"
            >
              <img
                    src="/mic2.svg"
                    alt="Microphone"
                    className="h-7 w-7"
                  />
            </button>
          </div>
          <p className="text-center text-[#2e2e2e] text-lg mb-6">
            Tell Richy what you need — listings, leads, or follow-ups — and it
            handles the rest.
            <br />
            <span className="text-[#0D3D21]">
              Not sure where to start? Just ask!
            </span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {suggestions.map((text) => (
              <button
                key={text}
                className="bg-white rounded-full px-5 py-2 shadow text-[#1A7A4B] font-medium hover:bg-[#F3F3F3]"
                onClick={() => setSearchValue(text)}
                type="button"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
