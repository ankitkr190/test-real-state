import React, { useRef, useState } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import Image from "next/image";

interface ChatFooterProps {
  onSend: (message: string) => Promise<ComponentsChatMessage>;
  isLoading: boolean;
}

function ChatFooter({ isLoading, onSend }: ChatFooterProps) {
  const [userInput, setUserInput] = useState<string>("");
  // const [isListening, setIsListening] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div className="px-8 pb-8">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col px-6 py-4">
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
        <div className="flex items-center mt-2 justify-between">
          <div className="flex items-center">
            <span className="text-[#0D3D21] font-sans text-sm mr-2">
              Powered by
            </span>
            <Image
              src="/prediqt.webp"
              alt="PrediQt Logo"
              width={70}
              height={70}
              className="h-full object-contain"
            />
          </div>
          <div className="flex items-center">
            <button
              className="text-[#1A7A4B] hover:bg-[#E6F9F0] rounded-full p-2 transition-all duration-200"
              type="button"
              onClick={handleSubmit}
            >
              <div className="relative md:size-6 size-5 rounded-full">
                <Image
                  src="/mic.svg"
                  alt="Microphone"
                  width={20}
                  height={20}
                  className={`absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${
                    userInput.trim()
                      ? "opacity-0 transform scale-75 rotate-12"
                      : "opacity-100 transform scale-100 rotate-0"
                  }`}
                />
                <Image
                  src="/send.svg"
                  alt="Send"
                  width={28}
                  height={28}
                  className={`absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${
                    userInput.trim()
                      ? "opacity-100 transform scale-100 rotate-0"
                      : "opacity-0 transform scale-75 rotate-12"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatFooter;
