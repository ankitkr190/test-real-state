import Image from "next/image";
import React, { useCallback } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useBrowserSpeech } from "../hooks/useBrowserSpeech";

interface VoiceBodyProps {
  currentContent: {
    title: string;
    subtitle: string;
    description: string;
  };
  isRecording: boolean;
  onOpenResult: () => void;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  onSend: (message: string) => Promise<ComponentsChatMessage>;
}

function VoiceBody({
  currentContent,
  isRecording,
  onOpenResult,
  setIsRecording,
  onSend,
}: VoiceBodyProps) {
  const { transcript, isFinished, reset } = useBrowserSpeech(isRecording);

  const sendMessage = useCallback(async () => {
    if (!isRecording || transcript === "|") return;

    // Slight delay for UX
    setTimeout(async () => {
      await onSend(transcript?.trim());
      reset();
      setIsRecording(false);
      onOpenResult();
    }, 300);
  }, [isRecording, onOpenResult, onSend, reset, setIsRecording, transcript]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      {/* Logo */}
      <div className="flex justify-center items-center w-full mt-4 sm:mt-6 md:mt-8 mb-2">
        <Image
          src="/richy.svg"
          alt="Richy Logo"
          width={140}
          height={80}
          className="h-full object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 mt-2 sm:mt-4 text-center bg-gradient-to-r from-[#00804A] to-[#0D3D21] bg-clip-text text-transparent leading-tight pb-1">
        {currentContent.title}
      </h1>

      {/* Subtitle */}
      <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 text-center text-[#4D8D67] px-2">
        {currentContent.subtitle}
      </h2>

      {/* Voice Input */}
      <div className="flex flex-col items-center mb-4 sm:mb-6">
        <div className="relative mb-3 sm:mb-4">
          <button
            className={`flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full transition-all duration-300 relative z-10 ${
              isRecording
                ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
                : "bg-gradient-to-br from-[#00804A] to-[#0D3D21] hover:from-green-500 hover:to-green-600 shadow-xl"
            }`}
            onClick={sendMessage}
            type="button"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center">
              {isFinished ? (
                <IoSend
                  className={`absolute text-white text-2xl sm:text-3xl md:text-4xl`}
                />
              ) : (
                <FaMicrophone
                  className={`absolute text-white text-2xl sm:text-3xl md:text-4xl transition-all duration-500 ease-in-out opacity-100 scale-100 animate-pulse`}
                />
              )}
            </div>
          </button>

          {isRecording && (
            <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-red-400 animate-pulse pointer-events-none"></div>
          )}
        </div>

        {/* Description */}
        <div className="text-center mb-3 sm:mb-4 px-2">
          <p className="text-[#2e2e2e] text-sm sm:text-base md:text-lg">
            {transcript?.trim() === "|"
              ? currentContent?.description
              : transcript}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VoiceBody;
