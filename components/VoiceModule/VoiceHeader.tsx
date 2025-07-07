/* eslint-disable @next/next/no-img-element */
import React from "react";

interface VoiceHeaderProps {
  selectedLang: {
    flag: string;
    label: string;
    value: string;
  };
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  onLanguageChange: (option: {
    flag: string;
    label: string;
    value: string;
  }) => void;
  onClose: () => void;
  onBackToSearch: () => void;
  currentContent: {
    backToText: string;
  };
  langOptions: Array<{
    flag: string;
    label: string;
    value: string;
  }>;
}

function VoiceHeader({
  selectedLang,
  dropdownOpen,
  setDropdownOpen,
  onLanguageChange,
  onClose,
  onBackToSearch,
  currentContent,
  langOptions,
}: VoiceHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <button
        className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
        onClick={onBackToSearch}
        type="button"
        title={currentContent.backToText}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#4D8D67]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Language Selector */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 md:right-16">
        <button
          className="flex items-center gap-1 sm:gap-2 bg-white rounded px-2 sm:px-3 py-1 sm:py-2 shadow text-sm sm:text-base"
          onClick={() => setDropdownOpen((open) => !open)}
          type="button"
        >
          <img
            src={selectedLang.flag}
            alt={selectedLang.label}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded"
          />
          <span className="hidden sm:inline">{selectedLang.label}</span>
          <svg
            className="w-2 h-2 sm:w-3 sm:h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg border-1 border-[#4D8D67] shadow z-[100] py-1">
            {langOptions.map((option) => (
              <button
                key={option.value}
                className="flex items-center w-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-green-100 gap-1 sm:gap-2 cursor-pointer"
                onClick={() => onLanguageChange(option)}
                type="button"
              >
                <img
                  src={option.flag}
                  alt={option.label}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded"
                />
                <span className="text-xs sm:text-sm text-[#0D3D21]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 sm:top-6 md:top-7 right-2 sm:right-4 md:right-8 text-xl sm:text-2xl text-gray-400 hover:text-gray-600"
        onClick={onClose}
      >
        &times;
      </button>
    </>
  );
}

export default VoiceHeader;
