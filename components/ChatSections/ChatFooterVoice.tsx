import React, { useEffect, useRef } from "react";
import CloseIcon from "../Icons/CloseIcon";
import dynamic from "next/dynamic";
import { UserTranscriptionProps } from "@/@types/livekitProps";
import { useMicrophoneTrack } from "../hooks/useMicrophoneTrack";

const CustomBarVisualizer = dynamic(() => import("./CustomBarVisualizer"), {
  ssr: false,
});

interface ChatFooterVoiceProps {
  handleStopListening: () => void;
  userTranscription: UserTranscriptionProps;
}

function ChatFooterVoice({
  userTranscription,
  handleStopListening,
}: ChatFooterVoiceProps) {
  const { micTrack } = useMicrophoneTrack();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { is_final, transcript } = userTranscription;

  useEffect(() => {
    if (is_final) {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          handleStopListening();
          timeoutRef.current = null;
          //send transcript to backend
        }, 1000);
      }
    } else {
      // Reset if speaking starts again
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [is_final, handleStopListening]);

  return (
    <div className="min-h-[20vh] flex flex-col items-center justify-between">
      <button
        className="mt-3 w-full cursor-pointer"
        onClick={handleStopListening}
      >
        <CloseIcon />
      </button>

      <p
        className={`md:text-[18px] px-2 text-[16px] font-medium text-start w-full ${
          transcript ? "text-[#171717]" : "text-[#737373]"
        }`}
      >
        {transcript?.length === 0 ? "Listening..." : transcript}
      </p>

      {micTrack && <CustomBarVisualizer micTrack={micTrack} />}
    </div>
  );
}

export default ChatFooterVoice;
