/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface LanguageOption {
  flag: string;
  label: string;
  value: string;
}

interface LanguageDropdownProps {
  langOptions: LanguageOption[];
  selectedLang: LanguageOption;
  onLanguageChange: (option: LanguageOption) => void;
  className?: string;
}

function LanguageDropdown({
  langOptions,
  selectedLang,
  onLanguageChange,
  className = "",
}: LanguageDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (option: LanguageOption) => {
    onLanguageChange(option);
    setDropdownOpen(false);
  };

  return (
    <div className={`relative flex ${className}`}>
      <button
        className="flex items-center bg-[#18181b] border border-[#FFD700]/50 rounded-lg hover:border-[#FFD700]/60 transition-all duration-300 text-white cursor-pointer"
        onClick={() => setDropdownOpen((open) => !open)}
        type="button"
        style={{
          gap: "clamp(0.25rem, 1vw, 0.5rem)",
          padding: "clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)",
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          borderRadius: "clamp(0.25rem, 1vw, 0.5rem)",
        }}
      >
        <img
          src={selectedLang.flag}
          alt={selectedLang.label}
          className="rounded"
          style={{
            width: "clamp(1rem, 3vw, 1.5rem)",
            height: "clamp(1rem, 3vw, 1.5rem)",
          }}
        />
        <span className="hidden md:inline">{selectedLang.label}</span>
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{
            width: "clamp(0.5rem, 2vw, 0.75rem)",
            height: "clamp(0.5rem, 2vw, 0.75rem)",
          }}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {dropdownOpen && (
        <div
          className="absolute right-0 bg-[#18181b] rounded-lg border-1 border-[#FFD700] shadow z-10"
          style={{
            width: "clamp(7rem, 15vw, 8rem)",
            marginTop: "clamp(2.75rem, 5vh, 3rem)",
            padding: "clamp(0.25rem, 1vh, 0.25rem) 0",
            borderRadius: "clamp(0.5rem, 2vw, 0.75rem)",
          }}
        >
          {langOptions.map((option) => (
            <button
              key={option.value}
              className="flex items-center w-full hover:bg-[#FFD700]/10 cursor-pointer"
              onClick={() => handleLanguageChange(option)}
              type="button"
              style={{
                padding:
                  "clamp(0.375rem, 1.5vh, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)",
                gap: "clamp(0.25rem, 1vw, 0.5rem)",
              }}
            >
              <img
                src={option.flag}
                alt={option.label}
                className="rounded"
                style={{
                  width: "clamp(1rem, 3vw, 1.25rem)",
                  height: "clamp(1rem, 3vw, 1.25rem)",
                }}
              />
              <span
                className="text-white"
                style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
