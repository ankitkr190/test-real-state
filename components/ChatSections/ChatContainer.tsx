import React from "react";

interface ChatContainerProps {
  children: React.ReactNode;
}

function ChatContainer({ children }: ChatContainerProps) {
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-2 sm:p-4">
        <div className="relative bg-[#FCF9E6] rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl h-[90vh] sm:h-[80vh] md:h-[700px] flex flex-col animate-in fade-in zoom-in-95 duration-300">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatContainer;
