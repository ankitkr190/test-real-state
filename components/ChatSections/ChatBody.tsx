import { ChatMessageType, ProductsProps } from "@/@types/livekitProps";
import {
  ReceivedChatMessage,
  TrackReferenceOrPlaceholder,
  useLocalParticipant,
  useTrackTranscription,
} from "@livekit/components-react";
import {
  LocalParticipant,
  Participant,
  Track,
  TranscriptionSegment,
} from "livekit-client";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";

const ChatMessage = dynamic(() => import("./ChatMessage"));

interface ChatBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agentAudioTrack: TrackReferenceOrPlaceholder | any;
  chatMessages: ReceivedChatMessage[];
  products: ProductsProps[];
  clearMessage: () => void;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatBody({
  agentAudioTrack,
  chatMessages,
  clearMessage,
  isLoading,
  isMuted,
  products,
  setIsLoading,
  setIsMuted,
}: ChatBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const transcripts = useRef<Map<string, ChatMessageType>>(new Map());

  const { localParticipant, microphoneTrack } = useLocalParticipant() || {};
  const localSegments = useTrackTranscription({
    publication: microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant,
  });

  const agentSegments = useTrackTranscription(agentAudioTrack);

  const scrollToBottom = () => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  };

  const processSegments = (
    segments: TranscriptionSegment[] = [],
    participant?: Participant,
    segmentProducts: ProductsProps[] = []
  ): void => {
    if (!participant) return;

    const isSelf = participant instanceof LocalParticipant;

    for (const segment of segments) {
      const key = `${participant.identity}-${segment.id}`;
      const isFinal = segment.final;
      const newText = isFinal ? segment.text : `${segment.text} ...`;

      const existing = transcripts.current.get(key);
      const hasChanged =
        !existing ||
        existing.message !== newText ||
        existing.message.endsWith("...") !== !isFinal;

      if (!hasChanged) continue;

      const matchedProducts =
        isFinal && segment.text.toLowerCase().trim() ? segmentProducts : [];

      if (matchedProducts.length > 0) clearMessage();

      transcripts.current.set(key, {
        name: isSelf ? "You" : "Agent",
        message: newText,
        products: matchedProducts,
        isSelf,
        timestamp: existing?.timestamp ?? Date.now(),
      });
    }
  };

  const formattedChatMessages = useMemo(() => {
    if (!chatMessages || !localParticipant) return [];

    return chatMessages.map((msg) => {
      const isSelf = msg.from?.identity === localParticipant.identity;
      return {
        name: isSelf ? "You" : "Agent",
        message: msg.message,
        products: isSelf ? [] : products,
        timestamp: msg.timestamp,
        isSelf,
      };
    });
  }, [chatMessages, localParticipant, products]);

  const [chatList, setChatList] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    processSegments(
      agentSegments?.segments,
      agentAudioTrack?.participant,
      products
    );
    processSegments(localSegments?.segments, localParticipant);

    const mergedMessages = [
      ...Array.from(transcripts.current.values()),
      ...formattedChatMessages,
    ].sort((a, b) => a.timestamp - b.timestamp);

    setChatList(mergedMessages);

    // Check last "You" message timestamp
    const lastUserMessage = [...mergedMessages]
      .reverse()
      .find((msg) => msg.isSelf);

    const agentReplyAfter = [...mergedMessages].some(
      (msg) => !msg.isSelf && msg.timestamp > (lastUserMessage?.timestamp ?? 0)
    );

    if (lastUserMessage && !agentReplyAfter) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    agentSegments?.segments,
    localSegments?.segments,
    formattedChatMessages,
    products,
    agentAudioTrack?.participant,
    localParticipant,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 bg-transparent m-0 flex flex-col"
    >
      <ChatMessage
        messages={chatList}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {isLoading && <div className="mt-1.5 loader"></div>}
    </div>
  );
}

export default ChatBody;
