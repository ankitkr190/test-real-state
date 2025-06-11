/**
 * Description:
 * This is the home page of the website
 * It will display the ClonePage component
 * It will display the ClonePage component
 */

import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const ClonePage = dynamic(() => import("@/components/ClonerPage"), {
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
    </React.Fragment>
  );
}

export default HomePage;
