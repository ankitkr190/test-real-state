import React, { useEffect, useCallback } from "react";
import CloseIcon from "../Icons/CloseIcon";
import dynamic from "next/dynamic";
import { useMicrophoneTrack } from "../hooks/useMicrophoneTrack";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
// import { useDeepgramSpeech } from "../hooks/useDeepgramSpeech";
// import { SendIcon } from "lucide-react";
import { useBrowserSpeech } from "../hooks/useBrowserSpeech";

const CustomBarVisualizer = dynamic(() => import("./CustomBarVisualizer"), {
  ssr: false,
});

interface ChatFooterVoiceProps {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  onSend: (message: string) => Promise<ComponentsChatMessage>;
}

function ChatFooterVoiceAlt({
  setIsListening,
  isListening,
  onSend,
}: ChatFooterVoiceProps) {
  const { micTrack } = useMicrophoneTrack();
  const { transcript, isFinished, reset } = useBrowserSpeech(isListening);
  const sendTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSend = useCallback(async () => {
    if (!transcript || transcript === "|") return;

    await onSend(transcript);
    reset();
    setIsListening(false);
  }, [transcript, onSend, reset, setIsListening]);

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
  }, [isListening, transcript, isFinished, handleSend]);

  return (
    <div className="min-h-[20vh] flex flex-col items-center justify-between">
      <button className="mt-3 w-full cursor-pointer" onClick={handleReset}>
        <CloseIcon />
      </button>

      <p
        className={`md:text-[18px] mt-2.5 px-2 text-[16px] font-medium text-start w-full ${
          transcript?.length ? "text-[#171717]" : "text-[#737373]"
        }`}
      >
        {transcript !== "|"
          ? isFinished
            ? transcript
            : `${transcript}...`
          : "Listening..."}
      </p>

      {micTrack && <CustomBarVisualizer micTrack={micTrack} />}

      {/* <button
        className={`mt-3 mb-1 rounded-full p-3 bg-[#856630] disabled:bg-[#F2F2F2]`}
        disabled={transcript === "|"}
        onClick={handleSend}
      >
        <SendIcon
          color={transcript === "|" ? "#8E8E8E" : "#ffffff"}
          width={26}
          height={26}
        />
      </button> */}
    </div>
  );
}

export default ChatFooterVoiceAlt;
