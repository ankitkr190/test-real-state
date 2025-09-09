import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import { useLanguage } from "@/components/hooks/useLanguage";
import { translations } from "@/lib/translations";

interface SearchSectionProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResult: () => void;
  onOpenVoice: () => void;
  onSend: (message: string) => Promise<ComponentsChatMessage>;
  roomId?: string;
}

function SearchSection({
  isOpen,
  onClose,
  onOpenResult,
  onOpenVoice,
  onSend,
}: SearchSectionProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { selectedLanguage } = useLanguage();
  
  useEffect(() => {
    if (isOpen) {
      setSearchValue("");
      setIsSearching(false);
    }
  }, [isOpen]);

  const handleSearch = useCallback(async () => {
    if (searchValue === "") return;

    setIsSearching(true);
    setTimeout(async () => {
      onOpenResult();
      await onSend(searchValue);
      setIsSearching(false);
    }, 200);
  }, [onOpenResult, onSend, searchValue]);

  const handleButtonClick = () => {
    if (searchValue.trim()) {
      handleSearch();
    } else {
      onOpenVoice();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = useCallback(
    (text: string) => {
      if (text === "") return;

      setTimeout(async () => {
        onOpenResult();
        await onSend(text);
      }, 400);
    },
    [onOpenResult, onSend]
  );



  if (!isOpen) return null;

  const currentContent = translations[selectedLanguage.value as keyof typeof translations];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ padding: "clamp(0.5rem, 1vw, 1rem)" }}
      >
        <div
          className="relative bg-[#18181b]/70 shadow-2xl w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300"
          style={{
            borderRadius: "clamp(0.75rem, 2vw, 2rem)",
            maxWidth: "clamp(16rem, 85vw, 80rem)",
            height: "clamp(32rem, 85vh, 37.5rem)",
          }}
        >
          <div
            className="flex justify-center items-center w-full"
            style={{
              paddingTop: "clamp(1rem, 2vh, 2rem)",
              paddingBottom: "0.5rem",
            }}
          >
            <Image
              src="/apk.webp"
              width={140}
              height={140}
              alt="APK Logo"
              style={{
                height: "clamp(4rem, 10vh, 8rem)",
                width: "clamp(4rem, 10vh, 8rem)",
              }}
            />
          </div>
        
          <button
            className="absolute text-gray-400 hover:text-gray-600"
            onClick={onClose}
            style={{
              top: "clamp(1rem, 3vh, 1.75rem)",
              right: "clamp(0.5rem, 2vw, 2rem)",
              fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
            }}
          >
            &times;
          </button>
          <div
            className="flex flex-col items-center justify-center w-full"
            style={{
              padding: "clamp(0.5rem, 3vh, 2rem) clamp(0.5rem, 4vw, 2rem)",
            }}
          >
            <h1
              className="font-sans font-bold text-center bg-gradient-to-r from-[#FFD700] to-[#bfa76a] bg-clip-text text-transparent leading-tight pb-1"
              style={{
                fontSize: "clamp(1.25rem, 5vw, 3rem)",
                marginBottom: "clamp(1rem, 3vh, 1.5rem)",
                marginTop: "clamp(0.5rem, 2vh, 1rem)",
              }}
            >
              {currentContent.searchTitle}
            </h1>
            <div
              className="flex items-center w-full bg-[#232323] border-2 border-[#FFD700]/20 rounded-full overflow-hidden drop-shadow-lg hover:border-[#FFD700]/40 transition-all duration-300"
              style={{
                maxWidth: "clamp(16rem, 80vw, 48rem)",
                marginBottom: "clamp(1rem, 3vh, 1rem)",
              }}
            >
              <div
                className="flex items-center flex-1"
                style={{
                  padding:
                    "clamp(0.5rem, 2vh, 0.75rem) clamp(0.75rem, 3vw, 1.5rem)",
                }}
              >
                <FaSearch
                  className="text-white mr-2"
                  style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}
                />
                <input
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                  placeholder={currentContent.searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}
                />
              </div>
              <button
                className="flex items-center justify-center bg-gradient-to-br from-[#FFD700] to-[#4d3c10] h-full rounded-r-full hover:from-[#FFD700]/90 hover:to-[#bfa76a]/90 transition-all duration-300 disabled:opacity-50"
                type="button"
                onClick={handleButtonClick}
                disabled={isSearching}
                style={{ padding: "0 clamp(0.75rem, 3vw, 1.25rem)" }}
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#FFD700]"></div>
                ) : (
                  <div
                    className="relative"
                    style={{
                      height: "clamp(1.25rem, 4vw, 1.75rem)",
                      width: "clamp(1.25rem, 4vw, 1.75rem)",
                    }}
                  >
                    <Image
                      src="/mic2.svg"
                      alt="Microphone"
                      width={28}
                      height={28}
                      className={`absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${
                        searchValue.trim()
                          ? "opacity-0 transform scale-75 rotate-12"
                          : "opacity-100 transform scale-100 rotate-0"
                      }`}
                    />
                    <Image
                      src="/send1.svg"
                      alt="Send"
                      width={28}
                      height={28}
                      className={`absolute inset-0 h-full w-full transition-all duration-300 ease-in-out ${
                        searchValue.trim()
                          ? "opacity-100 transform scale-100 rotate-0"
                          : "opacity-0 transform scale-75 rotate-12"
                      }`}
                    />
                  </div>
                )}
              </button>
            </div>
            <p
              className="text-center text-white px-2"
              style={{
                fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
                marginBottom: "clamp(1rem, 3vh, 1.5rem)",
              }}
            >
              {currentContent.searchDescription}
              <br />
              <span className="text-white/70">
                {currentContent.searchSubDescription}
              </span>
            </p>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: "clamp(0.5rem, 2vw, 1rem)" }}
            >
              {currentContent.searchSuggestions.map((text) => (
                <button
                  key={text}
                  className="bg-gradient-to-r from-[#FFD700]/10 to-[#bfa76a]/10 border border-[#FFD700]/20 rounded-full shadow-sm text-white font-medium hover:from-[#FFD700]/20 hover:to-[#bfa76a]/20 hover:border-[#FFD700]/40 hover:shadow-md transition-all duration-300 hover:scale-105"
                  onClick={() => handleSuggestionClick(text)}
                  type="button"
                  style={{
                    padding:
                      "clamp(0.5rem, 2vh, 0.75rem) clamp(1rem, 3vw, 1.5rem)",
                    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                    borderRadius: "clamp(1rem, 3vw, 1.5rem)",
                  }}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchSection;


