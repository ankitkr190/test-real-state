import React from "react";
import dynamic from "next/dynamic";

const SearchSection = dynamic(() => import("@/components/SearchSection"));
// const SearchSection = dynamic(() => import("@/components/ResultSection"));

function TestPage() {
  return (
    <SearchSection/>

  );
}

export default TestPage;