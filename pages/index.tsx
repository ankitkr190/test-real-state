/**
 * Description:
 * This is the home page of the website
 * It will display the ClonePage component
 * It will display the ClonePage component
 */

import Head from "next/head";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import UserMessage from '../components/ui/umsg';

const ClonePage = dynamic(() => import("@/components/ClonerPage"), {
  ssr: false,
});

const BotIcon = dynamic(() => import("@/components/BotIcon"), {
  ssr: false,
});

const SearchSection = dynamic(() => import("@/components/SearchSection"), {
  ssr: false,
});

const VoiceModule = dynamic(() => import("@/components/VoiceModule"), {
  ssr: false,
});

const ResultSection = dynamic(() => import("@/components/ResultSection"), {
  ssr: false,
});

declare global {
  interface Navigator {
    connection: {
      downlink: number;
      effectiveType: string;
      addEventListener: (type: string, listener: () => void) => void;
      removeEventListener: (type: string, listener: () => void) => void;
    };
  }
}

function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const handleBotIconClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsSearchOpen(false);
  };

  const handleOpenVoice = () => {
    setIsSearchOpen(false);
    setIsVoiceOpen(true);
  };

  const handleCloseVoice = () => {
    setIsVoiceOpen(false);
  };

  const handleBackToSearch = () => {
    setIsVoiceOpen(false);
    setIsSearchOpen(true);
  };

  const handleOpenResult = () => {
    setIsSearchOpen(false);
    setIsVoiceOpen(false);
    setIsResultOpen(true);
  };

  const handleCloseResult = () => {
    setIsResultOpen(false);
  };

  // Ensure only one modal is open at a time
  const handleCloseAll = () => {
    setIsSearchOpen(false);
    setIsVoiceOpen(false);
    setIsResultOpen(false);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Richy | Home</title>
      </Head>

      <section className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
        <ClonePage
          pageName="Richy Group"
          pageUrl="https://www.richy.co.th/en/home_page"
        />        
      </section>      
      
      <div className="fixed bottom-10 right-10 z-50" onClick={handleBotIconClick}>
        <BotIcon />
      </div>
      
      <SearchSection 
        isOpen={isSearchOpen && !isVoiceOpen && !isResultOpen}
        onClose={handleCloseOverlay}
        onOpenResult={handleOpenResult}
        onOpenVoice={handleOpenVoice}
      />
      
      <VoiceModule 
        isOpen={isVoiceOpen && !isResultOpen}
        onClose={handleCloseVoice}
        onOpenResult={handleOpenResult}
        onBackToSearch={handleBackToSearch}
      />
      
      <ResultSection 
        isOpen={isResultOpen}
        onClose={handleCloseResult}
      />
    </React.Fragment>
  );
}

export default HomePage;