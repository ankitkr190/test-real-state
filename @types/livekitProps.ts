import { LocalAudioTrack, LocalVideoTrack } from "livekit-client";

export interface SessionProps {
  roomName: string;
  identity: string;
  audioTrack?: LocalAudioTrack;
  videoTrack?: LocalVideoTrack;
  region?: string;
  turnServer?: RTCIceServer;
  forceRelay?: boolean;
}

export interface TokenResult {
  identity: string;
  accessToken: string;
}

export interface ProductsProps {
  room_id: string;
  project_name: string;
  project_owner: string;
  project_area: string;
  realestate_type: string;
  room_area: string;
  budget: string;
  location: string;
  project_images: string[];
  ebook_url: string;
  richyLink?: string;
}

export type ChatMessageType = {
  name: string;
  message: string;
  products: ProductsProps[];
  isSelf: boolean;
  timestamp: number;
};

export interface ChannelCartProps {
  id: string;
  quantity: number;
}
