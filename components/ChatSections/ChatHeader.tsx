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
      className="flex items-center justify-between border-b border-[#0D3D21]"
      style={{
        padding: 'clamp(0.5rem, 1.5vw, 1rem) clamp(1rem, 3vw, 2rem)',
      }}
    >
      <div 
        className="flex items-center"
        style={{
          gap: 'clamp(0.375rem, 1vw, 0.5rem)',
        }}
      >
        <div
          className={`rounded-full inline-block ${
            roomState === ConnectionState.Connected ||
            roomState === ConnectionState.Connecting
              ? "bg-[#00C853]"
              : "bg-red-500"
          }`}
          style={{
            width: 'clamp(0.375rem, 1vw, 0.5rem)',
            height: 'clamp(0.375rem, 1vw, 0.5rem)',
          }}
        ></div>
        <p 
          className="text-gray-500 font-medium"
          style={{
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          }}
        >
          {roomState === ConnectionState.Connected
            ? "Online"
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
      <Image
        width={90}
        height={72}
        src="/richy.svg"
        alt="Richy Logo"
        className="object-fill"
        style={{
          height: 'clamp(2rem, 4vw, 3rem)',
        }}
        loading="lazy"
      />
      <button
        className="text-gray-400 hover:text-gray-600"
        style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
        }}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
}

export default ChatHeader;
