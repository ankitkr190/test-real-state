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
  product_id: string;
  name: string;
  brand: string;
  productDescription: string;
  price: string;
  imageUrls: string[];
  webLink?: string;
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
