import React from "react";
import dynamic from "next/dynamic";

const SearchSection = dynamic(() => import("@/components/SearchSection")); // Search Component
// const SearchSection = dynamic(() => import("@/components/ResultSection")); // Result Component

function TestPage() {
  return (
    <SearchSection/>

  );
}

export default TestPage;