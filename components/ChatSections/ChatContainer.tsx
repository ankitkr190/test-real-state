import React from "react";

interface ChatContainerProps {
  children: React.ReactNode;
}

function ChatContainer({ children }: ChatContainerProps) {
  return (
    <React.Fragment>
      <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>
      <div 
        className="fixed inset-0 z-[90] flex items-center justify-center"
        style={{
          padding: 'clamp(0.5rem, 2vw, 1rem)',
        }}
      >
        <div 
          className="relative bg-[#FCF9E6] shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300"
          style={{
            width: 'clamp(20rem, 90vw, 70rem)',
            maxWidth: 'clamp(22rem, 95vw, 85rem)',
            height: 'clamp(70vh, 90vh, 90vh)',
            borderRadius: 'clamp(0.5rem, 1.5vw, 1rem)',
          }}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatContainer;
