import React, { useRef, useState } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const ChatFooterVoiceAlt = dynamic(() => import("./ChatFooterVoiceAlt"), {
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
    <div className="bg-transparent px-4 py-3">
      <div
        className="shadow-xl border border-white/20 flex flex-col relative overflow-hidden"
        style={{
          borderRadius: "clamp(0.75rem, 2vw, 1rem)",
          padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2.5vw, 1rem)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          backgroundImage:
            "linear-gradient(to right top, #ffffff, #f7f7f7, #f0f0f0, #e8e8e8, #e1e1e1)",
        }}
      >
        {isListening ? (
          <ChatFooterVoiceAlt
            isListening={isListening}
            setIsListening={setIsListening}
            onSend={onSend}
          />
        ) : (
          <React.Fragment>
            <div className="flex items-center border border-gray-200/30 rounded-xl p-2 transition-all duration-200">
              <textarea
                onKeyDown={handleKeyDown}
                ref={textareaRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask APK anything..."
                rows={1}
                className="w-full bg-transparent outline-none text-gray-700 font-medium placeholder:text-gray-400 border-none resize-none overflow-y-auto hide-scrollbar"
                style={{
                  height: "auto",
                  fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
                  padding: "clamp(0.2rem, 0.6vw, 0.3rem) 0",
                  minHeight: "clamp(1.25rem, 2.5vw, 1.5rem)",
                  maxHeight: "clamp(3rem, 6vw, 4rem)",
                  lineHeight: "1.4",
                }}
              />
              <button
                className={`ml-2 transition-all duration-300 ease-in-out rounded-lg cursor-pointer ${
                  userInput.trim()?.length === 0
                    ? "bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 shadow-md"
                    : "bg-gradient-to-r from-[#ffd700] to-[#b5a26d] hover:from-[#b5a26d] hover:to-[#ffd700] text-white shadow-lg shadow-emerald-500/30"
                }`}
                style={{
                  padding: "clamp(0.4rem, 1vw, 0.5rem)",
                  minWidth: "clamp(2rem, 3.5vw, 2.5rem)",
                  minHeight: "clamp(2rem, 3.5vw, 2.5rem)",
                }}
                type="button"
                onClick={
                  userInput.trim()?.length === 0
                    ? handleMicroPhone
                    : handleSubmit
                }
                disabled={isLoading}
              >
                <Image
                  src={
                    userInput.trim()?.length === 0 ? "/mic2.svg" : "/send1.svg"
                  }
                  alt={userInput.trim()?.length === 0 ? "Microphone" : "Send"}
                  width={18}
                  height={18}
                  className={`transition-all duration-300 ease-in-out transform ${
                    userInput.trim()?.length === 0
                      ? "rotate-0 scale-100"
                      : "rotate-[360deg] scale-110"
                  }`}
                  style={{
                    width: "clamp(1rem, 1.8vw, 1.25rem)",
                    height: "clamp(1rem, 1.8vw, 1.25rem)",
                    filter:
                      userInput.trim()?.length === 0
                        ? "brightness(0) saturate(0) brightness(0.3) sepia(1) hue-rotate(120deg) saturate(5) brightness(1.2)"
                        : "brightness(0) invert(1)",
                  }}
                />
              </button>
            </div>
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between mt-2"
              style={{
                gap: "clamp(0.25rem, 0.8vw, 0.5rem)",
              }}
            >
              <div className="flex items-center justify-center sm:justify-start">
                <span
                  className="text-gray-500 font-medium mr-2"
                  style={{
                    fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)",
                  }}
                >
                  Powered by
                </span>
                <Image
                  src="/prediqt.webp"
                  alt="PrediQt Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  style={{
                    width: "clamp(2.5rem, 5vw, 4rem)",
                    height: "clamp(1.5rem, 3vw, 2rem)",
                  }}
                />
              </div>
              <div className="text-xs text-gray-400 text-center sm:text-right">
                <span style={{ fontSize: "clamp(0.6rem, 1vw, 0.7rem)" }}>
                  Press Enter to send • Shift+Enter for new line
                </span>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ChatFooter;
