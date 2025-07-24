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
        <title>Best Property Agent in Bangkok | APK Real Estate | Thailand</title>
      </Head>

      <div
        className="absolute top-4 right-6 sm:top-2 sm:right-4 md:top-3 md:right-5 lg:top-4 lg:right-6 xl:top-12 xl:right-10 z-40"
        onClick={handleLogout}
        title="Logout"
      >
        <div className="w-4 h-4 sm:w-2 sm:h-2 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm hover:shadow-md">
          <svg
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
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
          src="/apk_ss.webp"
          alt="APK Real Estate Screenshot"
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
