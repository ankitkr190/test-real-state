/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import { useBrowserSpeech } from "../hooks/useBrowserSpeech";
import { useMicrophoneTrack } from "../hooks/useMicrophoneTrack";
import CloseIcon from "../ui/CloseIcon";
import dynamic from "next/dynamic";

const CustomBarVisualizer = dynamic(() => import("./CustomBarVisualizer"));

interface ChatFooterVoiceProps {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  onSend: (message: string) => Promise<ComponentsChatMessage>;
}

function ChatFooterVoice({
  isListening,
  onSend,
  setIsListening,
}: ChatFooterVoiceProps) {
  const { micTrack } = useMicrophoneTrack();
  const { transcript, isFinished, reset } = useBrowserSpeech(isListening);
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = async () => {
    if (!transcript || transcript === "|") return;

    await onSend(transcript);
    reset();
    setIsListening(false);
  };

  const handleReset = () => {
    reset();
    setIsListening(false);
  };

  // Unified effect for all timer logic
  useEffect(() => {
    // Always clear any previous timer
    if (sendTimeoutRef.current) {
      clearTimeout(sendTimeoutRef.current);
      sendTimeoutRef.current = null;
    }

    // If listening and transcript is empty or "|", start 1s timer
    if (isListening && (!transcript || transcript === "|")) {
      sendTimeoutRef.current = setTimeout(() => {
        handleSend();
      }, 1500);
      return;
    }

    // If listening, transcript is present, and finished, start 1s timer
    if (isListening && transcript && transcript !== "|" && isFinished) {
      sendTimeoutRef.current = setTimeout(() => {
        handleSend();
      }, 1500);
      return;
    }

    // Cleanup on unmount
    return () => {
      if (sendTimeoutRef.current) clearTimeout(sendTimeoutRef.current);
    };
  }, [isListening, transcript, isFinished]);

  return (
    <div 
      className="flex flex-col items-center justify-between bg-gradient-to-b from-gray-50/50 to-gray-100/30 backdrop-blur-sm rounded-xl border border-gray-200/30 shadow-lg"
      style={{
        minHeight: 'clamp(5rem, 8vw, 6rem)',
        padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
      }}
    >
      <div className="w-full flex justify-end">
        <button 
          className="cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all duration-200 rounded-lg p-2"
          style={{
            marginTop: 'clamp(0.25rem, 0.8vw, 0.5rem)',
          }}
          onClick={handleReset}
        >
          <CloseIcon />
        </button>
      </div>
      <p
        className={`font-medium text-center w-full transition-all duration-300 ${
          transcript?.length ? "text-emerald-800" : "text-emerald-600"
        }`}
        style={{
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          marginTop: 'clamp(0.25rem, 0.8vw, 0.4rem)',
          padding: '0 clamp(0.25rem, 0.8vw, 0.4rem)',
        }}
      >
        {transcript !== "|"
          ? isFinished
            ? `"${transcript}"`
            : `${transcript}...`
          : "🎤 Listening..."}
      </p>

      <div className="w-full flex justify-center mt-2">
        {micTrack && <CustomBarVisualizer micTrack={micTrack} />}
      </div>
    </div>
  );
}

export default ChatFooterVoice;
