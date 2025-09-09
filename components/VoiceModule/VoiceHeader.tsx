import React from "react";

interface VoiceHeaderProps {
  onClose: () => void;
  onBackToSearch: () => void;
  currentContent: {
    voiceBackToText: string;
  };
}

function VoiceHeader({
  onClose,
  onBackToSearch,
  currentContent,
}: VoiceHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <button
        className="absolute flex items-center justify-center border border-[#FFD700]/50  hover:border-[#FFD700]/60 duration-300 text-white rounded-full transition-colors cursor-pointer"
        onClick={onBackToSearch}
        type="button"
        title={currentContent.voiceBackToText}
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
