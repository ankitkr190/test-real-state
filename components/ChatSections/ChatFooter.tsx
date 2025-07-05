import React, { useRef, useState } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ChatFooterVoice = dynamic(() => import("./ChatFooterVoice"), {
  ssr: false,
});

interface ChatFooterProps {
  onSend: (message: string) => Promise<ComponentsChatMessage>;
  isLoading: boolean;
}

function ChatFooter({ isLoading, onSend }: ChatFooterProps) {
  const [userInput, setUserInput] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (userInput === "" || isLoading) return;

    onSend(userInput);
    setUserInput("");
  };

  const handleMicroPhone = () => {
    setIsListening(!isListening);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit();
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg flex flex-col px-4 sm:px-6 py-3 sm:py-4">
        {isListening ? (
          <ChatFooterVoice
            isListening={isListening}
            setIsListening={setIsListening}
            onSend={onSend}
          />
        ) : (
          <React.Fragment>
            <div className="flex items-center">
              <textarea
                onKeyDown={handleKeyDown}
                ref={textareaRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask Richy"
                rows={1}
                className="w-full bg-transparent outline-none text-[#1A7A4B] text-opacity-70 text-[16px] font-normal placeholder:text-[#4D8D67] placeholder:text-opacity-70 border-none py-2 mb-3 resize-none overflow-y-auto min-h-[40px] max-h-[120px] hide-scrollbar"
                style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center mt-2 justify-between gap-2 sm:gap-0">
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-[#0D3D21] font-sans text-xs sm:text-sm mr-2">
                  Powered by
                </span>
                <Image
                  src="/prediqt.webp"
                  alt="PrediQt Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <button
                className="text-[#1A7A4B] hover:bg-[#E6F9F0] p-2 rounded-full"
                type="button"
                onClick={
                  userInput.trim()?.length === 0
                    ? handleMicroPhone
                    : handleSubmit
                }
              >
                <Image
                  src={
                    userInput.trim()?.length === 0 ? "/mic.svg" : "/send.svg"
                  }
                  alt={userInput.trim()?.length === 0 ? "Microphone" : "Send"}
                  width={18}
                  height={18}
                  className={`size-5 sm:size-6 transition-all duration-300 ease-in-out opacity-100 transform  ${
                    userInput.trim()?.length === 0
                      ? "rotate-0"
                      : "rotate-[360deg]"
                  }`}
                />
                <div className="relative "></div>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ChatFooter;
