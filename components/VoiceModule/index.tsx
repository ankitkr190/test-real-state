import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

interface VoiceModuleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResult: () => void;
  onBackToSearch: () => void;
}

function VoiceModule({ isOpen, onClose, onOpenResult, onBackToSearch }: VoiceModuleProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    flag: "/uk.svg",
    label: "EN",
    value: "en",
  });
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      setTranscript("");
      setSelectedLang({
        flag: "/uk.svg",
        label: "EN",
        value: "en",
      });
      setDropdownOpen(false);
      setIsRecording(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  const content = {
    en: {
      title: "Hi, tell me what you need!",
      subtitle: "Speak your real estate need — Richy will listen and help!",
      description: "Press and hold the microphone to start speaking, or tap to start/stop recording.",
      listeningText: "Listening...",
      processingText: "Processing your request...",
      backToText: "Back to Text",
    },
    th: {
      title: "สวัสดี บอกฉันว่าคุณต้องการอะไร!",
      subtitle: "พูดความต้องการด้านอสังหาริมทรัพย์ของคุณ — Richy จะฟังและช่วยเหลือ!",
      description: "กดค้างไมโครโฟนเพื่อเริ่มพูด หรือแตะเพื่อเริ่ม/หยุดการบันทึก",
      listeningText: "กำลังฟัง...",
      processingText: "กำลังประมวลผลคำขอของคุณ...",
      backToText: "กลับไปพิมพ์ข้อความ",
    },
    zh: {
      title: "您好，告诉我您需要什么！",
      subtitle: "说出您的房地产需求 — Richy 会倾听并帮助您！",
      description: "按住麦克风开始说话，或点击开始/停止录音。",
      listeningText: "正在倾听...",
      processingText: "正在处理您的请求...",
      backToText: "返回文字输入",
    }
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // Audio Service Integration for now DUMMY TEXT
        setTimeout(() => {
          setTranscript("I'm looking for a 2-bedroom apartment in downtown area");
          setTimeout(() => {
            onOpenResult();
          }, 1500);
        }, 2000);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      visualizeAudio();
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioLevel(0);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    }
  };

  const visualizeAudio = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateAudioLevel = () => {
      if (!analyserRef.current || !isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 255);
      
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    };
    
    updateAudioLevel();
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleLanguageChange = (option: typeof langOptions[0]) => {
    setSelectedLang(option);
    setDropdownOpen(false);
    setTranscript(""); 
  };

  const handleBackToSearch = () => {
    if (isRecording) {
      stopRecording();
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
      
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">      
        <div className="relative bg-[#FCF9E6] rounded-2xl shadow-2xl w-full max-w-7xl h-[600px] p-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">        
          <button 
            className="absolute top-6 left-6 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
            onClick={handleBackToSearch}
            type="button"
            title={currentContent.backToText}
          >
            <svg
              className="w-5 h-5 text-[#4D8D67]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="flex justify-center items-center w-full mt-8 mb-2">
            <img src="/richy.svg" alt="Richy Logo" className="h-20" />
          </div>        
          <div className="absolute top-6 right-16">
            <button
              className="flex items-center gap-2 bg-white rounded px-3 py-2 shadow"
              onClick={() => setDropdownOpen((open) => !open)}
              type="button"
            >
              <img
                src={selectedLang.flag}
                alt={selectedLang.label}
                className="w-6 h-6 rounded"
              />
              <span>{selectedLang.label}</span>
              <svg
                className="ml-1 w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl border-1 border-[#4D8D67] shadow z-[100] py-2">
                {langOptions.map((option) => (
                  <button
                    key={option.value}
                    className="flex items-center w-full px-4 py-3 hover:bg-green-100 gap-4"
                    onClick={() => handleLanguageChange(option)}
                    type="button"
                  >
                    <img
                      src={option.flag}
                      alt={option.label}
                      className="w-8 h-8 rounded"
                    />
                    <span className="text-lg text-[#0D3D21]">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>        
          <button 
            className="absolute top-7 right-8 text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>        
          <div className="flex flex-col items-center justify-center w-full px-8 py-8">
            <h1 className="font-sans text-4xl md:text-5xl font-bold mb-2 mt-4 text-center bg-gradient-to-r from-[#00804A] to-[#0D3D21] bg-clip-text text-transparent leading-tight pb-1">
              {currentContent.title}
            </h1>
            <h2 className="font-sans text-xl md:text-2xl font-medium mb-6 text-center text-[#4D8D67]">
              {currentContent.subtitle}
            </h2>
            
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <button
                  className={`flex items-center justify-center w-32 h-32 rounded-full transition-all duration-300 relative z-10 ${
                    isRecording 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg' 
                      : 'bg-gradient-to-br from-[#00804A] to-[#0D3D21] hover:from-green-500 hover:to-green-600 shadow-xl'
                  }`}
                  onClick={handleMicClick}
                  type="button"
                >
                  {isRecording ? (
                    <FaStop className="text-white text-3xl" />
                  ) : (
                    <FaMicrophone className="text-white text-3xl" />
                  )}
                </button>
                
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-pulse pointer-events-none"
                       style={{
                         transform: `scale(${1 + audioLevel * 0.3})`,
                         opacity: 0.6 + audioLevel * 0.4
                       }}>
                  </div>
                )}
              </div>
              
              <div className="text-center mb-4">
                {isRecording ? (
                  <p className="text-red-600 font-medium text-lg animate-pulse">
                    {currentContent.listeningText}
                  </p>
                ) : transcript ? (
                  <p className="text-[#0D3D21] font-medium text-lg">
                    {currentContent.processingText}
                  </p>
                ) : (
                  <p className="text-[#2e2e2e] text-lg">
                    {currentContent.description}
                  </p>
                )}
              </div>
              
              {transcript && (
                <div className="bg-white rounded-lg px-4 py-3 shadow-md max-w-2xl mb-4">
                  <p className="text-[#0D3D21] font-medium">"{transcript}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoiceModule;
