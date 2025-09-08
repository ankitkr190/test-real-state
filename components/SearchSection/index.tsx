import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";

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
  roomId,
}: SearchSectionProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState({
    flag: "/uk.svg",
    label: "EN",
    value: "en",
  });
  useEffect(() => {
    if (isOpen) {
      setSearchValue("");
      setIsSearching(false);
      setSelectedLang({
        flag: "/uk.svg",
        label: "EN",
        value: "en",
      });
      setDropdownOpen(false);
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

  const handleLanguageChange = (option: (typeof langOptions)[0]) => {
    setSelectedLang(option);

    setDropdownOpen(false);
    setSearchValue("");
  };

  const handleBackendLanguageChange = async (
    option: (typeof langOptions)[0]
  ) => {
    try {
      console.log(option);
      const res = await fetch(
        `${process.env.ENDPOINT_URL}/service/livekit/room/${roomId}/update-language/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language_code: option.value,
          }),
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  const currentContent = content[selectedLang.value as keyof typeof content];

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
          <div
            className="absolute flex"
            style={{
              top: "clamp(1rem, 2vh, 1.75rem)",
              right: "clamp(1rem, 4vw, 4rem)",
            }}
          >
            <button
              className="flex items-center bg-[#18181b] border border-[#FFD700]/50 rounded-lg shadow-sm hover:shadow-md hover:border-[#FFD700]/60 transition-all duration-300 text-white"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
              style={{
                gap: "clamp(0.25rem, 1vw, 0.5rem)",
                padding:
                  "clamp(0.375rem, 1.5vh, 0.5rem) clamp(0.75rem, 2vw, 1rem)",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                borderRadius: "clamp(0.5rem, 1vw, 0.75rem)",
              }}
            >
              <Image
                src={selectedLang.flag}
                alt={selectedLang.label}
                width={24}
                height={24}
                className="rounded"
                style={{
                  width: "clamp(1rem, 3vw, 1.5rem)",
                  height: "clamp(1rem, 3vw, 1.5rem)",
                }}
              />
              <span className="hidden md:inline">{selectedLang.label}</span>
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{
                  width: "clamp(0.5rem, 2vw, 0.75rem)",
                  height: "clamp(0.5rem, 2vw, 0.75rem)",
                }}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 bg-[#18181b] rounded-lg border-1 border-[#FFD700] shadow z-10"
                style={{
                  width: "clamp(7rem, 15vw, 8rem)",
                  marginTop: "clamp(2.75rem, 5vh, 3rem)",
                  padding: "clamp(0.25rem, 1vh, 0.25rem) 0",
                  borderRadius: "clamp(0.5rem, 2vw, 0.75rem)",
                }}
              >
                {langOptions.map((option) => (
                  <button
                    key={option.value}
                    className="flex items-center w-full hover:bg-[#FFD700]/10 cursor-pointer"
                    onClick={() => {
                      handleLanguageChange(option);
                      handleBackendLanguageChange(option);
                    }}
                    type="button"
                    style={{
                      padding:
                        "clamp(0.375rem, 1.5vh, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)",
                      gap: "clamp(0.25rem, 1vw, 0.5rem)",
                    }}
                  >
                    <Image
                      src={option.flag}
                      alt={option.label}
                      width={20}
                      height={20}
                      className="rounded"
                      style={{
                        width: "clamp(1rem, 3vw, 1.25rem)",
                        height: "clamp(1rem, 3vw, 1.25rem)",
                      }}
                    />
                    <span
                      className="text-white"
                      style={{ fontSize: "clamp(0.75rem, 2vw, 0.875rem)" }}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
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
              {currentContent.title}
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
                  placeholder={currentContent.placeholder}
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
              {currentContent.description}
              <br />
              <span className="text-white/70">
                {currentContent.subDescription}
              </span>
            </p>
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: "clamp(0.5rem, 2vw, 1rem)" }}
            >
              {currentContent.suggestions.map((text) => (
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

const content = {
  en: {
    title: "Welcome to APK Real Estate",
    placeholder: "Type your property need — APK will handle the rest!",
    description:
      "Your trusted property partner in Bangkok. Discover premium properties and reserve your dream home today.",
    subDescription: "Premium Properties • Trusted Service • Bangkok's Best",
    suggestions: [
      "Suggest some 2 BHK property for rent under 2 lakh Baht",
      "What do you have for office rent with security near Nana",
      "I want to buy a 3 bedroom flat with gym and swimming pool",
    ],
  },
  th: {
    title: "ยินดีต้อนรับสู่ เอพีเคอสังหาริมทรัพย์",
    placeholder: "พิมพ์ความต้องการด้านอสังหาริมทรัพย์ของคุณ — APK จะจัดการให้!",
    description:
      "พันธมิตรอสังหาริมทรัพย์ที่คุณไว้วางใจในกรุงเทพฯ ค้นหาทรัพย์สินพรีเมียมและจองบ้านในฝันของคุณวันนี้.",
    subDescription:
      "ทรัพย์สินพรีเมียม • บริการที่เชื่อถือได้ • อสังหาฯ กรุงเทพฯ",
    suggestions: [
      "แนะนำบ้าน 2 ห้องนอนให้เช่าราคาไม่เกิน 2 แสนบาท",
      "ให้เช่าออฟฟิศพร้อมรปภ.แถวนานามีอะไรบ้าง",
      "ฉันต้องการซื้อแฟลต 3 ห้องนอนพร้อมห้องออกกำลังกายและสระว่ายน้ำ",
    ],
  },
  zh: {
    title: "欢迎来到 APK 房地产",
    placeholder: "输入您的房地产需求 — APK 将为您处理其余事务！",
    description:
      "您在曼谷值得信赖的房地产合作伙伴。发现优质房源，预订您的梦想家园。",
    subDescription: "优质房源 • 值得信赖的服务 • 曼谷精选",
    suggestions: [
      "推荐一些2室1厅的出租房产，租金在2万泰铢以下。",
      "娜娜附近有哪些带保安的办公室出租",
      "我想购买一套带健身房和游泳池的三居室公寓。",
    ],
  },
};

const langOptions = [
  {
    flag: "/uk.svg",
    label: "English",
    value: "en",
  },
  {
    flag: "/th.svg",
    label: "แบบไทย",
    value: "th",
  },
  {
    flag: "/ch.svg",
    label: "中国人",
    value: "zh",
  },
];
