import Head from "next/head";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ConnectionProvider } from "@/components/hooks/useConnection";

const BotIcon = dynamic(() => import("@/components/BotIcon"));
const LivekitSession = dynamic(
  () => import("@/components/Livekit/SessionSection")
);

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

  const handleBotIconClick = () => {
    setIsSearchOpen(true);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      window.location.href = '/login';
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Richy | Home</title>
      </Head>

      <div
        className="absolute z-40 cursor-pointer"
        onClick={handleLogout}
        title="Logout"
        style={{
          top: 'clamp(0.5rem, 3vh, 1.5rem)',
          right: 'clamp(1rem, 4vw, 3rem)'
        }}
      >
        <div className="bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md"
             style={{
               width: 'clamp(1rem, 4vw, 2rem)',
               height: 'clamp(1rem, 4vw, 2rem)'
             }}>
          <svg
            className="text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            style={{
              width: 'clamp(0.5rem, 2vw, 1rem)',
              height: 'clamp(0.5rem, 2vw, 1rem)'
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </div>

      <section className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
        {/* <ClonePage
          pageName="Richy Group"
          pageUrl="https://www.richy.co.th/en/home_page"
        /> */}

        <Image
          src="/richy_ss.png"
          alt="Richy Group Screenshot"
          className="w-full"
          width={1920}
          height={1920}
          loading="lazy"
          draggable="false"
        />
      </section>

      <ConnectionProvider>
        <LivekitSession
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      </ConnectionProvider>
      <div
        className="fixed bottom-10 right-10 z-50"
        onClick={handleBotIconClick}
      >
        <BotIcon />
      </div>
    </React.Fragment>
  );
}

export default HomePage;
