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
}

function SearchSection({
  isOpen,
  onClose,
  onOpenResult,
  onOpenVoice,
  onSend,
}: SearchSectionProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState({
    flag: "/uk.svg",
    label: "EN",
    value: "en",
  });

  useEffect(() => {
    if (isOpen) {
      setSearchValue("");
      setSelectedLang({
        flag: "/uk.svg",
        label: "EN",
        value: "en",
      });
      setDropdownOpen(false);
    }
  }, [isOpen]);

  const handleSearch = useCallback(() => {
    if (searchValue === "") return;

    setTimeout(async () => {
      onOpenResult();
      await onSend(searchValue);
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

  if (!isOpen) return null;

  const currentContent = content[selectedLang.value as keyof typeof content];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="relative bg-[#FCF9E6] rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-7xl h-[90vh] sm:h-[80vh] md:h-[600px] p-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-center items-center w-full pt-4 sm:pt-6 md:pt-8 pb-2">
            <Image
              src="/richy.svg"
              width={140}
              height={80}
              alt="Richy Logo"
              className="h-16 sm:h-20 md:h-full"
            />
          </div>
          <div className="absolute top-4 sm:top-6 right-4 sm:right-8 md:right-16">
            <button
              className="flex items-center gap-1 sm:gap-2 bg-white rounded px-2 sm:px-3 py-1 sm:py-2 shadow text-sm sm:text-base"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
            >
              <Image
                src={selectedLang.flag}
                alt={selectedLang.label}
                width={24}
                height={24}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded"
              />
              <span className="hidden sm:inline">{selectedLang.label}</span>
              <svg
                className="w-2 h-2 sm:w-3 sm:h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg border-1 border-[#4D8D67] shadow z-10 py-1">
                {langOptions.map((option) => (
                  <button
                    key={option.value}
                    className="flex items-center w-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-green-100 gap-1 sm:gap-2 cursor-pointer"
                    onClick={() => handleLanguageChange(option)}
                    type="button"
                  >
                    <Image
                      src={option.flag}
                      alt={option.label}
                      width={20}
                      height={20}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded"
                    />
                    <span className="text-xs sm:text-sm text-[#0D3D21]">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="absolute top-4 sm:top-6 md:top-7 right-2 sm:right-4 md:right-8 text-xl sm:text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 mt-2 sm:mt-4 text-center bg-gradient-to-r from-[#00804A] to-[#0D3D21] bg-clip-text text-transparent leading-tight pb-1">
              {currentContent.title}
            </h1>
            <div className="flex items-center w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl bg-[#181B2B] rounded-full overflow-hidden mb-4 drop-shadow-xl">
              <div className="flex items-center flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3">
                <FaSearch className="text-white text-base sm:text-lg md:text-xl mr-2 sm:mr-3" />
                <input
                  className="flex-1 bg-transparent outline-none text-white text-sm sm:text-base md:text-lg placeholder-gray-400"
                  placeholder={currentContent.placeholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <button
                className="flex items-center justify-center bg-gradient-to-br from-[#00804A] to-[#0D3D21] h-full px-3 sm:px-4 md:px-5 rounded-bl-[30px] hover:from-green-400 transition-all duration-200"
                type="button"
                onClick={handleButtonClick}
              >
                <div className="relative h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7">
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
              </button>
            </div>
            <p className="text-center text-[#2e2e2e] text-sm sm:text-base md:text-lg mb-4 sm:mb-6 px-2">
              {currentContent.description}
              <br />
              <span className="text-[#0D3D21]">
                {currentContent.subDescription}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
              {currentContent.suggestions.map((text) => (
                <button
                  key={text}
                  className="bg-white rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 shadow text-[#1A7A4B] font-medium hover:bg-[#F3F3F3] text-xs sm:text-sm md:text-base"
                  onClick={() => handleSuggestionClick(text)}
                  type="button"
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
    title: "Hi, how can I help you today?",
    placeholder: "Type your real estate need — Richy will handle the rest!",
    description:
      "Tell Richy what you need — listings, leads, or follow-ups — and it handles the rest.",
    subDescription: "Not sure where to start? Just ask!",
    suggestions: [
      "Show me a flat near Saima MRT with a gym and a swimming pool",
      "I want a ready-to-move-in flat near Srinakarin Road",
      "Help me to find a flat near Ekkamai Road",
      "Suggest an apartment near Sukhumvit with a pool and garden",
      "Can you suggest a 1‑bedroom flat near Phahonyothin 59 Station for under 4 million baht",
    ],
  },
  th: {
    title: "สวัสดี วันนี้ฉันช่วยอะไรคุณได้บ้าง?",
    placeholder:
      "พิมพ์ความต้องการด้านอสังหาริมทรัพย์ของคุณ — Richy จะจัดการให้!",
    description:
      "บอก Richy ว่าคุณต้องการอะไร — รายการ, ลูกค้าเป้าหมาย, หรือการติดตาม — และมันจะจัดการให้",
    subDescription: "ไม่แน่ใจว่าจะเริ่มจากไหน? แค่ถาม!",
    suggestions: [
      "คอนโดโชว์ใกล้ MRT ไทรม้า มีฟิตเนสและสระว่ายน้ำ",
      "อยากได้คอนโดพร้อมอยู่ บนถนนศรีนครินทร์",
      "ช่วยหาคอนโดแถวถนนเอกมัยให้หน่อยคะ",
      "แนะนำอพาร์ตเมนท์แถวสุขุมวิท มีสระว่ายน้ำและสวน",
      "ช่วยแนะนำคอนโด 1 ห้องนอน ใกล้สถานีพหลโยธิน 59 ราคาไม่เกิน 4 ล้านบาท หน่อยคะ",
    ],
  },
  zh: {
    title: "您好，今天我能为您做些什么？",
    placeholder: "输入您的房地产需求 — Richy 将为您处理其余事务！",
    description:
      "告诉 Richy 您需要什么 — 房源列表、潜在客户或后续跟进 — 它会为您处理一切。",
    subDescription: "不知道从哪里开始？尽管问吧！",
    suggestions: [
      "给我看看 Saima 地铁站附近有健身房和游泳池的公寓",
      "我想要诗纳卡琳路附近的现房公寓",
      "帮我找一套Ekkamai路附近的公寓",
      "推荐素坤逸附近有游泳池和花园的公寓",
      "你能推荐一套靠近 Phahonyothin 59 站、价格低于 400 万泰铢的一居室公寓吗",
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
