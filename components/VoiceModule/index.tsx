/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

interface VoiceModuleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResult: () => void;
  onBackToSearch: () => void;
}

function VoiceModule({
  isOpen,
  onClose,
  onOpenResult,
  onBackToSearch,
}: VoiceModuleProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    flag: "/uk.svg",
    label: "EN",
    value: "en",
  });

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedLang({
        flag: "/uk.svg",
        label: "EN",
        value: "en",
      });
      setDropdownOpen(false);
      setIsRecording(false);
    }
  }, [isOpen]);

  const content = {
    en: {
      title: "Hi, tell me what you need!",
      subtitle: "Speak your real estate need — Richy will listen and help!",
      description: "Tap to start/stop speaking.",
      backToText: "Back to Text",
    },
    th: {
      title: "สวัสดี บอกฉันว่าคุณต้องการอะไร!",
      subtitle:
        "พูดความต้องการด้านอสังหาริมทรัพย์ของคุณ — Richy จะฟังและช่วยเหลือ!",
      description: "กดค้างไมโครโฟนเพื่อเริ่มพูด หรือแตะเพื่อเริ่ม/หยุดการบันทึก",
      backToText: "กลับไปพิมพ์ข้อความ",
    },
    zh: {
      title: "您好，告诉我您需要什么！",
      subtitle: "说出您的房地产需求 — Richy 会倾听并帮助您！",
      description: "按住麦克风开始说话，或点击开始/停止录音。",
      backToText: "返回文字输入",
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

  const handleMicClick = () => {
    if (isRecording) {
      setIsRecording(false);
      // Call onOpenResult when stopping recording
      setTimeout(() => {
        onOpenResult();
      }, 200);
    } else {
      setIsRecording(true);
    }
  };

  const handleLanguageChange = (option: (typeof langOptions)[0]) => {
    setSelectedLang(option);
    setDropdownOpen(false);
  };

  const handleBackToSearch = () => {
    if (isRecording) {
      setIsRecording(false);
    }
    onBackToSearch();
  };

  if (!isOpen) return null;

  const currentContent = content[selectedLang.value as keyof typeof content];

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4">
        <div className="relative bg-[#FCF9E6] rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-7xl h-[90vh] sm:h-[80vh] md:h-[600px] p-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
          <button
            className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
            onClick={handleBackToSearch}
            type="button"
            title={currentContent.backToText}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#4D8D67]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex justify-center items-center w-full mt-4 sm:mt-6 md:mt-8 mb-2">
            <img src="/richy.svg" alt="Richy Logo" className="h-16 sm:h-18 md:h-20" />
          </div>
          <div className="absolute top-4 sm:top-6 right-4 sm:right-8 md:right-16">
            <button
              className="flex items-center gap-1 sm:gap-2 bg-white rounded px-2 sm:px-3 py-1 sm:py-2 shadow text-sm sm:text-base"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
            >
              <img
                src={selectedLang.flag}
                alt={selectedLang.label}
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
              <div className="absolute right-0 mt-2 w-28 sm:w-32 bg-white rounded-lg border-1 border-[#4D8D67] shadow z-[100] py-1">
                {langOptions.map((option) => (
                  <button
                    key={option.value}
                    className="flex items-center w-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-green-100 gap-1 sm:gap-2 cursor-pointer"
                    onClick={() => handleLanguageChange(option)}
                    type="button"
                  >
                    <img
                      src={option.flag}
                      alt={option.label}
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
            <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 mt-2 sm:mt-4 text-center bg-gradient-to-r from-[#00804A] to-[#0D3D21] bg-clip-text text-transparent leading-tight pb-1">
              {currentContent.title}
            </h1>
            <h2 className="font-sans text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-6 text-center text-[#4D8D67] px-2">
              {currentContent.subtitle}
            </h2>

            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="relative mb-3 sm:mb-4">
                <button
                  className={`flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full transition-all duration-300 relative z-10 ${
                    isRecording
                      ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
                      : "bg-gradient-to-br from-[#00804A] to-[#0D3D21] hover:from-green-500 hover:to-green-600 shadow-xl"
                  }`}
                  onClick={handleMicClick}
                  type="button"
                >
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center">
                    <FaMicrophone
                      className={`absolute text-white text-2xl sm:text-3xl md:text-4xl transition-all duration-500 ease-in-out ${
                        isRecording
                          ? "opacity-0 scale-75"
                          : "opacity-100 scale-100"
                      }`}
                    />
                    <IoSend
                      className={`absolute text-white text-2xl sm:text-3xl md:text-4xl transition-all duration-500 ease-in-out ${
                        isRecording
                          ? "opacity-100 scale-110 animate-pulse"
                          : "opacity-0 scale-75"
                      }`}
                    />
                  </div>
                </button>

                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-red-400 animate-pulse pointer-events-none"></div>
                )}
              </div>

              <div className="text-center mb-3 sm:mb-4 px-2">
                <p className="text-[#2e2e2e] text-sm sm:text-base md:text-lg">
                  {currentContent.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoiceModule;
