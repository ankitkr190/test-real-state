import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";

const HarrodsPage = dynamic(() => import("@/components/Scrapper/HarrodsPage"), {
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
        <title>
          ริชี่: บ้าน ทาวน์โฮม คอนโด โครงการพร้อมอยู่ | ริชี่ เพลซ 2002
          จำกัด(มหาชน)
        </title>
      </Head>

      <section className="relative flex min-h-screen flex-col items-center overflow-x-hidden">
        <HarrodsPage />
      </section>
    </React.Fragment>
  );
}

export default HomePage;
