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
    <div 
      style={{
        padding: 'clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
      }}
    >
      <div 
        className="bg-white shadow-lg flex flex-col"
        style={{
          borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
          padding: 'clamp(0.5rem, 1.5vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
        }}
      >
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
                className="w-full bg-transparent outline-none text-[#1A7A4B] text-opacity-70 font-normal placeholder:text-[#4D8D67] placeholder:text-opacity-70 border-none resize-none overflow-y-auto hide-scrollbar"
                style={{ 
                  height: "auto",
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  padding: 'clamp(0.25rem, 0.8vw, 0.4rem) 0',
                  marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
                  minHeight: 'clamp(1.5rem, 3vw, 2rem)',
                  maxHeight: 'clamp(4rem, 8vw, 5rem)',
                }}
              />
            </div>
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between"
              style={{
                marginTop: 'clamp(0.25rem, 0.8vw, 0.4rem)',
                gap: 'clamp(0.25rem, 0.8vw, 0.4rem)',
              }}
            >
              <div className="flex items-center justify-center sm:justify-start">
                <span 
                  className="text-[#0D3D21] font-sans mr-2"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  }}
                >
                  Powered by
                </span>
                <Image
                  src="/prediqt.webp"
                  alt="PrediQt Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                  style={{
                    width: 'clamp(2.5rem, 4vw, 3rem)',
                    height: 'clamp(2.5rem, 4vw, 3rem)',
                  }}
                />
              </div>
              <button
                className="text-[#1A7A4B] hover:bg-[#E6F9F0] rounded-full"
                style={{
                  padding: 'clamp(0.5rem, 1vw, 0.5rem)',
                }}
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
                  className={`transition-all duration-300 ease-in-out opacity-100 transform  ${
                    userInput.trim()?.length === 0
                      ? "rotate-0"
                      : "rotate-[360deg]"
                  }`}
                  style={{
                    width: 'clamp(1.125rem, 2vw, 1.5rem)',
                    height: 'clamp(1.125rem, 2vw, 1.5rem)',
                  }}
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
