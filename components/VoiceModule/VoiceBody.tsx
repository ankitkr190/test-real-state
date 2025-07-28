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
    <div
      className="flex flex-col items-center justify-center w-full"
      style={{
        padding: "clamp(1rem, 3vh, 2rem) clamp(1rem, 4vw, 2rem)",
      }}
    >
      {/* Logo */}
      <div
        className="flex justify-center items-center w-full mb-2"
        style={{
          marginTop: "clamp(1rem, 3vh, 2rem)",
        }}
      >
        <Image
          src="/apk.webp"
          alt="APK group Logo"
          width={140}
          height={80}
          className="h-full object-contain"
          style={{ height: "clamp(4rem, 8vh, 5rem)" }}
        />
      </div>

      {/* Title */}
      <h1
        className="font-sans font-bold text-center bg-gradient-to-r from-[#ffca4f] to-[#ffc280] bg-clip-text text-transparent leading-tight pb-1"
        style={{
          fontSize: "clamp(1.5rem, 5vw, 3rem)",
          marginBottom: "clamp(0.25rem, 1vh, 0.5rem)",
          marginTop: "clamp(0.5rem, 2vh, 1rem)",
        }}
      >
        {currentContent.title}
      </h1>

      {/* Subtitle */}
      <h2
        className="font-sans font-medium text-center text-[#ffca4f] px-2"
        style={{
          fontSize: "clamp(1.125rem, 3.5vw, 1.5rem)",
          marginBottom: "clamp(1rem, 3vh, 1.5rem)",
        }}
      >
        {currentContent.subtitle}
      </h2>

      {/* Voice Input */}
      <div
        className="flex flex-col items-center"
        style={{ marginBottom: "clamp(1rem, 3vh, 1.5rem)" }}
      >
        <div
          className="relative"
          style={{ marginBottom: "clamp(0.75rem, 2vh, 1rem)" }}
        >
          <button
            className={`flex items-center justify-center rounded-full transition-all duration-300 relative z-10 ${
              isRecording
                ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
                : "bg-gradient-to-br from-[#FFD700] to-[#ffca4f] hover:from-green-500 hover:to-green-600 shadow-xl"
            }`}
            onClick={sendMessage}
            type="button"
            style={{
              width: "clamp(4rem, 12vw, 5rem)",
              height: "clamp(4rem, 12vw, 5rem)",
            }}
          >
            <div
              className="relative flex items-center justify-center"
              style={{
                width: "clamp(2rem, 6vw, 2.5rem)",
                height: "clamp(2rem, 6vw, 2.5rem)",
              }}
            >
              {isFinished ? (
                <IoSend
                  className="absolute text-white"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                />
              ) : (
                <FaMicrophone
                  className="absolute text-white transition-all duration-500 ease-in-out opacity-100 scale-100 animate-pulse"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
                />
              )}
            </div>
          </button>

          {isRecording && (
            <div
              className="absolute inset-0 rounded-full border-red-400 animate-pulse pointer-events-none"
              style={{ borderWidth: "clamp(2px, 1vw, 4px)" }}
            ></div>
          )}
        </div>

        {/* Description */}
        <div
          className="text-center px-2"
          style={{ marginBottom: "clamp(0.75rem, 2vh, 1rem)" }}
        >
          <p
            className="text-[#fefefe] leading-tight"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}
          >
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
