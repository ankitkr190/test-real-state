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

      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ padding: 'clamp(0.5rem, 1vw, 1rem)' }}>
        <div className="relative bg-[#FCF9E6] shadow-2xl w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300" style={{ 
          borderRadius: 'clamp(0.75rem, 2vw, 2rem)', 
          maxWidth: 'clamp(16rem, 85vw, 80rem)', 
          height: 'clamp(32rem, 85vh, 37.5rem)' 
        }}>
          <div className="flex justify-center items-center w-full" style={{ paddingTop: 'clamp(1rem, 2vh, 2rem)', paddingBottom: '0.5rem' }}>
            <Image
              src="/richy.svg"
              width={140}
              height={80}
              alt="Richy Logo"
              style={{ height: 'clamp(4rem, 8vh, 5rem)' }}
            />
          </div>
          <div className="absolute flex" style={{ top: 'clamp(1rem, 2vh, 1.75rem)', right: 'clamp(1rem, 4vw, 4rem)' }}>
            <button
              className="flex items-center bg-white rounded shadow"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
              style={{
                gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                borderRadius: 'clamp(0.25rem, 1vw, 0.5rem)'
              }}
            >
              <Image
                src={selectedLang.flag}
                alt={selectedLang.label}
                width={24}
                height={24}
                className="rounded"
                style={{
                  width: 'clamp(1rem, 3vw, 1.5rem)',
                  height: 'clamp(1rem, 3vw, 1.5rem)',
                }}
              />
              <span className="hidden md:inline">
                {selectedLang.label}
              </span>
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={{
                  width: 'clamp(0.5rem, 2vw, 0.75rem)',
                  height: 'clamp(0.5rem, 2vw, 0.75rem)',
                }}
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 bg-white rounded-lg border-1 border-[#4D8D67] shadow z-10"
                   style={{
                     width: 'clamp(7rem, 15vw, 8rem)',
                     marginTop: 'clamp(2.75rem, 5vh, 3rem)',
                     padding: 'clamp(0.25rem, 1vh, 0.25rem) 0',
                     borderRadius: 'clamp(0.5rem, 2vw, 0.75rem)'
                   }}>
                {langOptions.map((option) => (
                  <button
                    key={option.value}
                    className="flex items-center w-full hover:bg-green-100 cursor-pointer"
                    onClick={() => handleLanguageChange(option)}
                    type="button"
                    style={{
                      padding: 'clamp(0.375rem, 1.5vh, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)',
                      gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                    }}
                  >
                    <Image
                      src={option.flag}
                      alt={option.label}
                      width={20}
                      height={20}
                      className="rounded"
                      style={{
                        width: 'clamp(1rem, 3vw, 1.25rem)',
                        height: 'clamp(1rem, 3vw, 1.25rem)',
                      }}
                    />
                    <span className="text-[#0D3D21]"
                          style={{ fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' }}>
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
              top: 'clamp(1rem, 3vh, 1.75rem)',
              right: 'clamp(0.5rem, 2vw, 2rem)',
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)'
            }}
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center w-full"
               style={{ 
                 padding: 'clamp(0.5rem, 3vh, 2rem) clamp(0.5rem, 4vw, 2rem)'
               }}>
            <h1 className="font-sans font-bold text-center bg-gradient-to-r from-[#00804A] to-[#0D3D21] bg-clip-text text-transparent leading-tight pb-1"
                style={{
                  fontSize: 'clamp(1.25rem, 5vw, 3rem)',
                  marginBottom: 'clamp(1rem, 3vh, 1.5rem)',
                  marginTop: 'clamp(0.5rem, 2vh, 1rem)'
                }}>
              {currentContent.title}
            </h1>
            <div className="flex items-center w-full bg-[#181B2B] rounded-full overflow-hidden drop-shadow-xl"
                 style={{
                   maxWidth: 'clamp(16rem, 80vw, 48rem)',
                   marginBottom: 'clamp(1rem, 3vh, 1rem)'
                 }}>
              <div className="flex items-center flex-1"
                   style={{ 
                     padding: 'clamp(0.5rem, 2vh, 0.75rem) clamp(0.75rem, 3vw, 1.5rem)'
                   }}>
                <FaSearch className="text-white mr-2"
                          style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }} />
                <input
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                  placeholder={currentContent.placeholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}
                />
              </div>
              <button
                className="flex items-center justify-center bg-gradient-to-br from-[#00804A] to-[#0D3D21] h-full rounded-bl-[30px] hover:from-green-400 transition-all duration-200"
                type="button"
                onClick={handleButtonClick}
                style={{ padding: '0 clamp(0.75rem, 3vw, 1.25rem)' }}
              >
                <div className="relative"
                     style={{
                       height: 'clamp(1.25rem, 4vw, 1.75rem)',
                       width: 'clamp(1.25rem, 4vw, 1.75rem)'
                     }}>
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
            <p className="text-center text-[#2e2e2e] px-2"
               style={{
                 fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
                 marginBottom: 'clamp(1rem, 3vh, 1.5rem)'
               }}>
              {currentContent.description}
              <br />
              <span className="text-[#0D3D21]">
                {currentContent.subDescription}
              </span>
            </p>
            <div className="flex flex-wrap justify-center"
                 style={{ gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
              {currentContent.suggestions.map((text) => (
                <button
                  key={text}
                  className="bg-white rounded-full shadow text-[#1A7A4B] font-medium hover:bg-[#F3F3F3]"
                  onClick={() => handleSuggestionClick(text)}
                  type="button"
                  style={{
                    padding: 'clamp(0.375rem, 1.5vh, 0.5rem) clamp(0.75rem, 3vw, 1.25rem)',
                    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                    borderRadius: 'clamp(1rem, 3vw, 1.5rem)'
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
