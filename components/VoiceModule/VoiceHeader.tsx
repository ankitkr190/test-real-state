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
        className="absolute flex items-center justify-center border border-[#FFD700]/50  hover:border-[#FFD700]/60 duration-300 text-white rounded-full transition-colors cursor-pointer"
        onClick={onBackToSearch}
        type="button"
        title={currentContent.backToText}
        style={{
          top: "clamp(1rem, 3vh, 1.5rem)",
          left: "clamp(1rem, 3vw, 1.5rem)",
          width: "clamp(2rem, 5vw, 2.5rem)",
          height: "clamp(2rem, 5vw, 2.5rem)",
        }}
      >
        <svg
          className="text-[#FFD700]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{
            width: "clamp(1rem, 3vw, 1.25rem)",
            height: "clamp(1rem, 3vw, 1.25rem)",
          }}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Language Selector */}
      <div
        className="absolute flex"
        style={{
          top: "clamp(1rem, 3vh, 1.5rem)",
          right: "clamp(1rem, 4vw, 4rem)",
        }}
      >
        <button
          className="flex items-center bg-[#18181b] border border-[#FFD700]/50 rounded-lg  hover:border-[#FFD700]/60 transition-all duration-300 text-white cursor-pointer"
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
                onClick={() => onLanguageChange(option)}
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

      {/* Close Button */}
      <button
        className="absolute text-[#fff9ec] hover:text-[#ffc3ad] cursor-pointer transition-colors duration-300"
        onClick={onClose}
        style={{
          top: "clamp(1rem, 3vh, 1.75rem)",
          right: "clamp(0.5rem, 2vw, 2rem)",
          fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
        }}
      >
        &times;
      </button>
    </>
  );
}

export default VoiceHeader;
