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
<<<<<<< HEAD
        className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
        onClick={onBackToSearch}
        type="button"
        title={currentContent.backToText}
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#4D8D67]"
=======
        className="absolute flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
        onClick={onBackToSearch}
        type="button"
        title={currentContent.backToText}
        style={{
          top: 'clamp(1rem, 3vh, 1.5rem)',
          left: 'clamp(1rem, 3vw, 1.5rem)',
          width: 'clamp(2rem, 5vw, 2.5rem)',
          height: 'clamp(2rem, 5vw, 2.5rem)'
        }}
      >
        <svg
          className="text-[#4D8D67]"
>>>>>>> richy/main
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
<<<<<<< HEAD
=======
          style={{
            width: 'clamp(1rem, 3vw, 1.25rem)',
            height: 'clamp(1rem, 3vw, 1.25rem)'
          }}
>>>>>>> richy/main
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Language Selector */}
<<<<<<< HEAD
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 md:right-16">
        <button
          className="flex items-center gap-1 sm:gap-2 bg-white rounded px-2 sm:px-3 py-1 sm:py-2 shadow text-sm sm:text-base"
          onClick={() => setDropdownOpen((open) => !open)}
          type="button"
=======
      <div className="absolute flex"
           style={{
             top: 'clamp(1rem, 3vh, 1.5rem)',
             right: 'clamp(1rem, 4vw, 4rem)'
           }}>
        <button
          className="flex items-center bg-white rounded shadow"
          onClick={() => setDropdownOpen((open) => !open)}
          type="button"
          style={{
            gap: 'clamp(0.25rem, 1vw, 0.5rem)',
            padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            borderRadius: 'clamp(0.25rem, 1vw, 0.5rem)'
          }}
>>>>>>> richy/main
        >
          <img
            src={selectedLang.flag}
            alt={selectedLang.label}
<<<<<<< HEAD
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded"
          />
          <span className="hidden sm:inline">{selectedLang.label}</span>
          <svg
            className="w-2 h-2 sm:w-3 sm:h-3"
=======
            className="rounded"
            style={{
              width: 'clamp(1rem, 3vw, 1.5rem)',
              height: 'clamp(1rem, 3vw, 1.5rem)'
            }}
          />
          <span className="hidden md:inline">{selectedLang.label}</span>
          <svg
>>>>>>> richy/main
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
<<<<<<< HEAD
=======
            style={{
              width: 'clamp(0.5rem, 2vw, 0.75rem)',
              height: 'clamp(0.5rem, 2vw, 0.75rem)'
            }}
>>>>>>> richy/main
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
<<<<<<< HEAD
          <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg border-1 border-[#4D8D67] shadow z-[100] py-1">
            {langOptions.map((option) => (
              <button
                key={option.value}
                className="flex items-center w-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-green-100 gap-1 sm:gap-2 cursor-pointer"
                onClick={() => onLanguageChange(option)}
                type="button"
=======
          <div className="absolute right-0 bg-white rounded-lg border-1 border-[#4D8D67] shadow z-[100]"
               style={{
                 width: 'clamp(7rem, 15vw, 8rem)',
                 marginTop: 'clamp(2.75rem, 5vh, 3rem)',
                 padding: 'clamp(0.25rem, 1vh, 0.25rem) 0',
                 borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)'
               }}>
            {langOptions.map((option) => (
              <button
                key={option.value}
                className="flex items-center w-full hover:bg-green-100 cursor-pointer"
                onClick={() => onLanguageChange(option)}
                type="button"
                style={{
                  padding: 'clamp(0.375rem, 1.5vh, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)',
                  gap: 'clamp(0.25rem, 1vw, 0.5rem)'
                }}
>>>>>>> richy/main
              >
                <img
                  src={option.flag}
                  alt={option.label}
<<<<<<< HEAD
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded"
                />
                <span className="text-xs sm:text-sm text-[#0D3D21]">
=======
                  className="rounded"
                  style={{
                    width: 'clamp(1rem, 3vw, 1.25rem)',
                    height: 'clamp(1rem, 3vw, 1.25rem)'
                  }}
                />
                <span className="text-[#0D3D21]"
                      style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
>>>>>>> richy/main
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
<<<<<<< HEAD
        className="absolute top-4 sm:top-6 md:top-7 right-2 sm:right-4 md:right-8 text-xl sm:text-2xl text-gray-400 hover:text-gray-600"
        onClick={onClose}
=======
        className="absolute text-gray-400 hover:text-gray-600"
        onClick={onClose}
        style={{
          top: 'clamp(1rem, 3vh, 1.75rem)',
          right: 'clamp(0.5rem, 2vw, 2rem)',
          fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
        }}
>>>>>>> richy/main
      >
        &times;
      </button>
    </>
  );
}

export default VoiceHeader;
