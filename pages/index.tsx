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

  return (
    <React.Fragment>
      <Head>
        <title>Richy | Home</title>
      </Head>

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
