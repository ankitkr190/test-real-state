import React, { useState } from "react";

interface ResultSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

function ResultSection({ isOpen, onClose }: ResultSectionProps) {
  const [searchValue, setSearchValue] = useState("");

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-[#FCF9E6] rounded-2xl shadow-2xl w-full max-w-5xl h-[700px] flex flex-col animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between px-8 py-4 border-b border-[#0D3D21]">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-lime-400 inline-block mr-2"></span>
              <span className="text-[#1A7A4B] font-medium">Online</span>
            </div>
            <img src="/richy.svg" alt="Richy Logo" className="h-12" />
            <button
              className="text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </div>        
          <div className="flex-1 overflow-y-auto px-8 py-6"></div>        
          <div className="px-8 pb-8">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col px-6 py-4">            
              <div className="flex items-center">
                <input
                  className="flex-1 bg-transparent outline-none font-sans text-[#1A7A4B] text-lg placeholder-[#4D8D67]"
                  placeholder="Ask Richy"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>            
              <div className="flex items-center mt-2 justify-between">
                <div className="flex items-center">
                  <span className="text-[#0D3D21] font-sans text-sm mr-2">Powered by</span>
                  <img src="/prediqt.webp" alt="PrediQt Logo" className="h-5" />
                </div>
                <div className="flex items-center">
                  <button
                    className="text-[#1A7A4B] hover:bg-[#E6F9F0] rounded-full p-2"
                    type="button"
                  >
                    <img
                      src="/mic.svg"
                      alt="Microphone"
                      className="h-7 w-7"
                    />
                  </button>
                  <button
                    className="ml-2 text-[#1A7A4B] hover:bg-[#E6F9F0] rounded-full p-2"
                    type="submit"
                  >
                    <img
                      src="/send.svg"
                      alt="Send"
                      className="h-7 w-7"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultSection;