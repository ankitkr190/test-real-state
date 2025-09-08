import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { ConnectionMode, useConnection } from "../hooks/useConnection";
import { deleteCookie } from "cookies-next/client";
import { toast } from "sonner";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  StartAudio,
} from "@livekit/components-react";
import dynamic from "next/dynamic";

const Playground = dynamic(() => import("./Playground"));
const PermissionPopup = dynamic(() => import("./PermissionPopup"));

interface SessionSectionProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SessionSection({
  isSearchOpen,
  setIsSearchOpen,
}: SessionSectionProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(true);
  const [isPermissionPopupOpen, setIsPermissionPopupOpen] = useState(true);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const { shouldConnect, wsUrl, token, mode, roomId, connect, disconnect } =
    useConnection();

  // Handle permission check
  useEffect(() => {
    const hasPermission = localStorage.getItem("hasPermission");

    if (hasPermission === "true") {
      setIsMuted(false);
      setIsPermissionPopupOpen(false);
      setIsAudioReady(true);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          localStorage.setItem("hasPermission", "true");
          setIsMuted(false);
          setIsPermissionPopupOpen(false);
          setIsAudioReady(true);
        })
        .catch(() => {
          setIsMuted(true);
          setIsPermissionPopupOpen(true);
        });
    }
  }, []);

  // iOS Safari/Chrome audio workaround
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      /iPhone|iPad|iPod/.test(navigator.userAgent)
    ) {
      const audio = new Audio();
      audio.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEA...";
      audio.play().catch(() => {});
    }
  }, []);

  const handleConnect = useCallback(
    async (isConnect: boolean, connectionMode: ConnectionMode) => {
      try {
        if (isConnect) {
          await connect(connectionMode);
          // toast.success("Connected to AI Assistant", {
          //   description: "You can now start your conversation",
          //   duration: 3000,
          // });
        } else {
          await disconnect();
          // toast.warning("Disconnected from AI Assistant", {
          //   description: "The connection has been terminated",
          //   duration: 3000,
          // });
        }
      } catch (error) {
        console.error("Connection error:", error);
        toast.error("Connection error", {
          description: "Failed to establish connection",
          duration: 3000,
        });
        deleteCookie("authUser");
        router.reload();
      }
    },
    [connect, disconnect, router]
  );

  return (
    <LiveKitRoom
      serverUrl={wsUrl}
      token={token}
      connect={shouldConnect && isAudioReady}
      onError={(e) => console.error("LiveKit error:", e)}
    >
      <Playground
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        onConnect={(c) => {
          const connectionMode = process.env.NEXT_PUBLIC_LIVEKIT_URL
            ? "env"
            : mode;
          handleConnect(c, connectionMode);
        }}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        roomId={roomId}
      />

      {/* Audio output renderer (speaker) */}
      <RoomAudioRenderer muted={isMuted} volume={1} />

      {/* This component unlocks audio playback after user clicks */}
      <StartAudio label="Click to enable audio playback" />

      {/* Microphone permission popup */}
      <PermissionPopup
        isVisible={isPermissionPopupOpen}
        setIsVisible={setIsPermissionPopupOpen}
      />
    </LiveKitRoom>
  );
}

export default SessionSection;
