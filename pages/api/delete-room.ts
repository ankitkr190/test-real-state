/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { RoomServiceClient } from "livekit-server-sdk";

const livekitHost = process.env.NEXT_PUBLIC_LIVEKIT_URL;
const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

if (!livekitHost || !apiKey || !apiSecret) {
  throw new Error("Missing LiveKit configuration in environment variables.");
}

const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);

type DeleteRoomRequest = {
  roomName: string;
};

type DeleteRoomResponse = { message: string } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteRoomResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method Not Allowed. Use POST instead." });
  }

  const { roomName } = req.body as DeleteRoomRequest;

  if (!roomName || typeof roomName !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid or missing `roomName` in request body." });
  }

  try {
    await roomService.deleteRoom(roomName);
    return res
      .status(200)
      .json({ message: `Room '${roomName}' deleted successfully.` });
  } catch (error: any) {
    console.error(`Error deleting room '${roomName}':`, error);
    return res.status(500).json({
      error: error?.message || "Internal Server Error",
    });
  }
}
