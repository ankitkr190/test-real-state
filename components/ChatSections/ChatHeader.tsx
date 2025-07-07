import { ConnectionState } from "livekit-client";
import Image from "next/image";
import React from "react";

interface ChatHeader {
  roomState: ConnectionState;
  onClose: () => void;
}

function ChatHeader({ onClose, roomState }: ChatHeader) {
  return (
    <div 
      className="relative flex items-center justify-between bg-gradient-to-r from-white/90 via-white/80 to-white/90 backdrop-blur-md border-b border-gradient-to-r from-gray-200/30 via-gray-300/50 to-gray-200/30 shadow-lg"
      style={{
        padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 3vw, 2.5rem)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(0, 128, 74, 0.02) 50%, rgba(255, 255, 255, 0.95) 100%)',
        borderImage: 'linear-gradient(90deg, rgba(0, 128, 74, 0.1), rgba(0, 128, 74, 0.3), rgba(0, 128, 74, 0.1)) 1',
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00804A]/10 via-transparent to-[#0D3D21]/10"></div>
      </div>
      
      <div 
        className="flex items-center relative z-10"
        style={{
          gap: 'clamp(0.75rem, 2vw, 1rem)',
        }}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00804A] via-[#00A056] to-[#0D3D21] flex items-center justify-center shadow-lg ring-2 ring-white/30 ring-offset-1">
            <span className="text-white font-bold text-base drop-shadow-sm">R</span>
          </div>
          {/* Online indicator with glow effect */}
          {(roomState === ConnectionState.Connected || roomState === ConnectionState.Connecting) && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00C853] rounded-full border-2 border-white shadow-sm animate-pulse">
              <div className="absolute inset-0 bg-[#00C853] rounded-full animate-ping opacity-30"></div>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 tracking-wide" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.125rem)' }}>
            Richy AI Assistant
          </h3>
          <div className="flex items-center" style={{ gap: 'clamp(0.375rem, 0.8vw, 0.5rem)' }}>
            <div className="flex items-center">
              <div
                className={`rounded-full inline-block ${
                  roomState === ConnectionState.Connected ||
                  roomState === ConnectionState.Connecting
                    ? "bg-[#00C853] shadow-sm shadow-green-200"
                    : "bg-red-500 shadow-sm shadow-red-200"
                }`}
                style={{
                  width: 'clamp(0.5rem, 1.2vw, 0.625rem)',
                  height: 'clamp(0.5rem, 1.2vw, 0.625rem)',
                }}
              ></div>
              <p 
                className={`font-medium ml-2 ${
                  roomState === ConnectionState.Connected 
                    ? "text-[#00804A]" 
                    : "text-gray-600"
                }`}
                style={{
                  fontSize: 'clamp(0.8rem, 1.6vw, 0.9rem)',
                }}
              >
                {roomState === ConnectionState.Connected
                  ? "Online & Ready"
                  : roomState === ConnectionState.Connecting
                  ? "Connecting..."
                  : roomState === ConnectionState.Reconnecting
                  ? "Reconnecting..."
                  : roomState === ConnectionState.Disconnected
                  ? "Disconnected"
                  : roomState === ConnectionState?.SignalReconnecting
                  ? "Signal Reconnecting..."
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <Image
          width={90}
          height={72}
          src="/richy.svg"
          alt="Richy Logo"
          className="object-fill drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
          style={{
            height: 'clamp(3rem, 4.5vw, 4rem)',
          }}
          loading="lazy"
        />
      </div>
      
      <button
        className="relative z-10 text-gray-400 hover:text-gray-600 hover:bg-white/60 rounded-full transition-all duration-300 group"
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 1.75rem)',
          padding: 'clamp(0.5rem, 1vw, 0.75rem)',
        }}
        onClick={onClose}
        aria-label="Close"
      >
        <div className="relative">
          &times;
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300/0 to-gray-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </button>
    </div>
  );
}

export default ChatHeader;
