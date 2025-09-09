import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  ChatMessage as ComponentsChatMessage,
  useLocalParticipant,
} from "@livekit/components-react";
import ArrowUp from "../Icons/ArrowUp";
import dynamic from "next/dynamic";
import { Track } from "livekit-client";
import { UserTranscriptionProps } from "@/@types/livekitProps";
import { useLanguage } from "@/components/hooks/useLanguage";
import { translations } from "@/lib/translations";

const ChatFooterVoice = dynamic(() => import("./ChatFooterVoice"), {
  ssr: false,
});
const MicButton = dynamic(() => import("../ui/MicButton"), {
  ssr: true,
});

interface ChatFooterAltProps {
  userTranscription: UserTranscriptionProps;
  onSend: (message: string) => Promise<ComponentsChatMessage>;
  isLoading: boolean;
}

function ChatFooter({
  userTranscription,
  onSend,
  isLoading,
}: ChatFooterAltProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedLanguage } = useLanguage();
  const { localParticipant } = useLocalParticipant();
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioTrackRef = useRef<MediaStreamTrack | null>(null);

  // Memoized cleanup function to avoid recreating it on every render
  const cleanup = useCallback(() => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (audioTrackRef.current) {
      audioTrackRef.current = null;
    }
    setIsListening(false);
  }, [setIsListening]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const handleStartListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const audioTrack = stream.getAudioTracks()[0];
      audioTrackRef.current = audioTrack;

      if (localParticipant) {
        await localParticipant.publishTrack(audioTrack, {
          source: Track.Source.Microphone,
        });
      }
      setIsListening(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      cleanup();
    }
  }, [localParticipant, setIsListening, cleanup]);

  const handleStopListening = useCallback(() => {
    if (localParticipant) {
      const audioTrackPub = localParticipant.getTrackPublication(
        Track.Source.Microphone
      );
      if (audioTrackPub?.track) {
        localParticipant.unpublishTrack(audioTrackPub.track);
      }
    }
    cleanup();
  }, [localParticipant, cleanup]);

  const handleSubmit = () => {
    if (userInput === "" || isLoading) return;

    onSend(userInput);
    setUserInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit();
    }
  };

  return (
    <div
      className="bg-white ps-3 pe-2 pt-2 pb-2.5 flex flex-col justify-between"
      style={{ boxShadow: "0 -3px 4px 1px rgba(0,0,0,0.1)" }}
    >
      {isListening ? (
        <ChatFooterVoice
          userTranscription={userTranscription}
          handleStopListening={handleStopListening}
        />
      ) : (
        <>
          <textarea
            onKeyDown={handleKeyDown}
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={translations[selectedLanguage.value as keyof typeof translations].chatPlaceholder}
            rows={1}
            className="w-full outline-none text-[#191919] text-opacity-70 text-[16px] font-normal placeholder:text-[#737373] placeholder:text-opacity-70 border-none py-2 mb-3 resize-none overflow-y-auto min-h-[40px] max-h-[120px] hide-scrollbar"
            style={{ height: "auto" }}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-end justify-start">
              <p className="text-[12px] text-[#737373]">Powered by</p>
              <Image
                src={"/prediqt.webp"}
                alt="logo"
                width={53}
                height={16}
                className="ml-[4px] mb-0.5"
              />
            </div>
            <div className="flex items-center gap-4">
              {userInput?.length === 0 ? (
                <MicButton
                  isListening={isListening}
                  isLoading={isLoading}
                  handleStartListening={handleStartListening}
                  handleStopListening={handleStopListening}
                />
              ) : (
                <button
                  type="button"
                  className={`bg-[#856630] p-1.5 rounded-full outline-none border-none active:opacity-60 hover:opacity-70 cursor-pointer ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  <ArrowUp className="w-[24px] h-[24px]" />
                </button>
              )}

              {/* <button
            type="submit"
            className={
              userInput !== ""
                ? "bg-[#8a7252] rounded-lg p-2 border-none cursor-pointer"
                : "bg-[#F0F0F0] rounded-lg p-2 border-none cursor-default"
            }
            onClick={handleSubmit}
          >
            <SendIcon color={userInput !== "" ? "#ffffff" : "#000000"} />
          </button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatFooter;
