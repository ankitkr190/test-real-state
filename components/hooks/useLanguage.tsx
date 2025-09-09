import React, { createContext, useContext, useState, ReactNode } from "react";

export interface LanguageOption {
  flag: string;
  label: string;
  value: string;
}

interface LanguageContextType {
  selectedLanguage: LanguageOption;
  setSelectedLanguage: (language: LanguageOption) => void;
  langOptions: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const langOptions: LanguageOption[] = [
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

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(langOptions[0]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        langOptions,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
