import { ConnectionState } from "livekit-client";
import Image from "next/image";
import React from "react";

interface ChatHeader {
  roomState: ConnectionState;
  onClose: () => void;
}

function ChatHeader({ onClose, roomState }: ChatHeader) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-[#0D3D21]">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className={`h-[6px] w-[6px] sm:h-[8px] sm:w-[8px] rounded-full inline-block ${
            roomState === ConnectionState.Connected ||
            roomState === ConnectionState.Connecting
              ? "bg-[#00C853]"
              : "bg-red-500"
          }`}
        ></div>
        <p className={`text-gray-500 font-medium text-sm sm:text-base`}>
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
        className="object-fill h-8 sm:h-10 md:h-12"
        loading="lazy"
      />
      <button
        className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
}

export default ChatHeader;
