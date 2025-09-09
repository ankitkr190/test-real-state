import React, { useState } from "react";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/hooks/useLanguage";
import { translations } from "@/lib/translations";

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
  const { selectedLanguage } = useLanguage();

  const handleBackToSearch = () => {
    if (isRecording) {
      setIsRecording(false);
    }
    onBackToSearch();
  };

  if (!isOpen) return null;

  const currentContent = translations[selectedLanguage.value as keyof typeof translations];
  const voiceContent = {
    voiceTitle: currentContent.voiceTitle,
    voiceSubtitle: currentContent.voiceSubtitle,
    voiceDescription: currentContent.voiceDescription,
  };
  const headerContent = {
    voiceBackToText: currentContent.voiceBackToText,
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className="fixed inset-0 z-[70] flex items-center justify-center"
        style={{ padding: "clamp(0.5rem, 2vw, 1rem)" }}
      >
        <div
          className="relative  bg-black/50 backdrop-blur-sm transition-opacity shadow-2xl w-full p-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300"
          style={{
            borderRadius: "clamp(0.75rem, 3vw, 1.5rem)",
            maxWidth: "clamp(20rem, 85vw, 80rem)",
            height: "clamp(32rem, 85vh, 37.5rem)",
          }}
        >
          <VoiceHeader
            onClose={onClose}
            onBackToSearch={handleBackToSearch}
            currentContent={headerContent}
          />

          <VoiceBody
            currentContent={voiceContent}
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

