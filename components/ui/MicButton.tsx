import React from "react";
import { Mic } from "lucide-react";
import Waveform from "../Icons/Waveform";

interface MicButtonAltProps {
  isListening: boolean;
  isLoading: boolean;
  handleStartListening: () => Promise<void>;
  handleStopListening: () => void;
}

const MicButtonAlt = ({
  isListening,
  isLoading,
  handleStopListening,
  handleStartListening,
}: MicButtonAltProps) => {
  return (
    <button
      onClick={isListening ? handleStopListening : handleStartListening}
      className={`rounded-full transition-all bg-[#856630] flex items-center justify-center text-white size-[36px] outline-none border-none active:opacity-90 cursor-pointer hover:opacity-70  ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      {!isListening ? (
        <Waveform className="w-[24px] h-[24px]" />
      ) : (
        <Mic size={24} />
      )}
    </button>
  );
};

export default MicButtonAlt;
