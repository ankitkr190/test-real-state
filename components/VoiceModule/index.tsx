import React, { useState } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import dynamic from "next/dynamic";

const VoiceHeader = dynamic(() => import("./VoiceHeader"));
const VoiceBody = dynamic(() => import("./VoiceBody"));

interface VoiceModuleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResult: () => void;
  onBackToSearch: () => void;
  onSend: (message: string) => Promise<ComponentsChatMessage>;
}

function VoiceModule({
  isOpen,
  onClose,
  onOpenResult,
  onBackToSearch,
  onSend,
}: VoiceModuleProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(langOptions[0]);

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

      <div className="fixed inset-0 z-[70] flex items-center justify-center"
           style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
        <div className="relative bg-white shadow-2xl w-full p-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300"
             style={{
               borderRadius: 'clamp(0.75rem, 3vw, 1.5rem)',
               maxWidth: 'clamp(20rem, 85vw, 80rem)',
               height: 'clamp(32rem, 85vh, 37.5rem)'
             }}>
          <VoiceHeader
            selectedLang={selectedLang}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            onLanguageChange={handleLanguageChange}
            onClose={onClose}
            onBackToSearch={handleBackToSearch}
            currentContent={currentContent}
            langOptions={langOptions}
          />

          <VoiceBody
            currentContent={currentContent}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            onOpenResult={onOpenResult}
            onSend={onSend}
          />
        </div>
      </div>
    </>
  );
}

export default VoiceModule;

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
