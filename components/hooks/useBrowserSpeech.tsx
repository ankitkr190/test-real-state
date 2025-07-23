/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

// Hook definition
export function useBrowserSpeech(isListening: boolean) {
  const [transcript, setTranscript] = useState("|");
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null); // Not supported natively
  const [isFinished, setIsFinished] = useState(false);
  const recognitionRef = useRef<any | null>(null);
  const isStartedRef = useRef(false);

  // Compatibility setup
  const getSpeechRecognition = (): any | null => {
    if (typeof window === "undefined") return null;

    return (
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      null
    );
  };

  const startRecognition = () => {
    const SpeechRecognitionConstructor = getSpeechRecognition();
    if (!SpeechRecognitionConstructor) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US"; // You can change this as needed

    recognition.onresult = (event: any) => {
      let fullTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        fullTranscript += result[0].transcript;
        if (result.isFinal) {
          setIsFinished(true);
        }
      }
      setTranscript(fullTranscript || "|");
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event);
    };

    recognition.onend = () => {
      console.log("Recognition ended.");
      isStartedRef.current = false;
      setIsFinished(true);
    };

    recognition.start();
    recognitionRef.current = recognition;
    isStartedRef.current = true;
  };

  const stopRecognition = () => {
    if (!isStartedRef.current || !recognitionRef.current) return;
    recognitionRef.current.stop();
    recognitionRef.current = null;
    isStartedRef.current = false;
  };

  useEffect(() => {
    if (isListening) {
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => stopRecognition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const reset = () => {
    setTranscript("|");
    setDetectedLanguage(null);
    setIsFinished(false);
  };

  return { transcript, detectedLanguage, isFinished, reset };
}
