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
  title: string;
  land_area: string;
  project_type: string;
  home_area: string;
  price: number;
  location: string;
  gallery_images: string[];
  url?: string;
  description: string;
  completion_year: string;
  project_status: string;
  status: string;
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

export interface UserTranscriptionProps {
  transcript: string;
  is_final: boolean;
}
