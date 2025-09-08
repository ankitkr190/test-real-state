import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import useCustomChannel from "../hooks/useCustomChannel";
import {
  useChat,
  useConnectionState,
  useRoomInfo,
  useVoiceAssistant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { deleteRoom } from "@/lib/deleteRoom";

const SearchSection = dynamic(() => import("../SearchSection"));
const VoiceModule = dynamic(() => import("../VoiceModule"));
const ChatContainer = dynamic(() => import("../ChatSections/ChatContainer"));
const ChatHeader = dynamic(() => import("../ChatSections/ChatHeader"));
const ChatBody = dynamic(() => import("../ChatSections/ChatBody"));
const ChatFooter = dynamic(() => import("../ChatSections/ChatFooter"));

interface PlaygroundProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  onConnect: (connect: boolean, opts?: { token: string; url: string }) => void;
}

function Playground({
  isSearchOpen,
  setIsSearchOpen,
  onConnect,
  isMuted,
  setIsMuted,
}: PlaygroundProps) {
  const router = useRouter();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { name } = useRoomInfo(); // in-build
  const roomState = useConnectionState(); // in-build
  const voiceAssistant = useVoiceAssistant(); // in-build
  const { chatMessages, send: sendChat } = useChat(); // in-build
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { products, clearProduct, userTranscription } = useCustomChannel(); // custom channel

  useEffect(() => {
    if (isSearchOpen) {
      onConnect(roomState === ConnectionState.Disconnected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchOpen]);

  const handleOpenResult = useCallback(() => {
    setIsSearchOpen(false);
    setIsVoiceOpen(false);
    setIsResultOpen(true);
  }, [setIsSearchOpen]);

  const handleClose = useCallback(async () => {
    try {
      onConnect(roomState !== ConnectionState.Connected);
      setIsSearchOpen(false);
      setIsResultOpen(false);
      setIsVoiceOpen(false);
      await deleteRoom(name);
      router.reload();
    } catch (error) {
      console.log("Handle Close", error);
    }
  }, [name, onConnect, roomState, router, setIsSearchOpen]);

  return (
    <>
      <SearchSection
        isOpen={isSearchOpen && !isVoiceOpen && !isResultOpen}
        onClose={handleClose}
        onOpenResult={handleOpenResult}
        onOpenVoice={() => {
          setIsSearchOpen(false);
          setIsVoiceOpen(true);
        }}
        roomState={name}
        onSend={sendChat}
      />

      <VoiceModule
        isOpen={isVoiceOpen && !isResultOpen}
        onClose={handleClose}
        onOpenResult={handleOpenResult}
        onSend={sendChat}
        onBackToSearch={() => {
          setIsVoiceOpen(false);
          setIsSearchOpen(true);
        }}
      />

      {isResultOpen && (
        <ChatContainer>
          <ChatHeader onClose={handleClose} roomState={roomState} />
          <ChatBody
            products={products}
            chatMessages={chatMessages}
            clearMessage={clearProduct}
            agentAudioTrack={voiceAssistant?.audioTrack}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <ChatFooter
            userTranscription={userTranscription}
            isLoading={isLoading}
            onSend={sendChat}
          />
        </ChatContainer>
      )}
    </>
  );
}

export default Playground;
