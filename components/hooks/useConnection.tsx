import { getCookie } from "cookies-next/client";
import React, { createContext, useCallback, useState } from "react";

export type ConnectionMode = "cloud" | "manual" | "env";

type TokenGeneratorData = {
  shouldConnect: boolean;
  wsUrl: string;
  token: string;
  mode: ConnectionMode;
  roomId: string;
  disconnect: () => Promise<void>;
  connect: (mode: ConnectionMode) => Promise<void>;
};

const ConnectionContext = createContext<TokenGeneratorData | undefined>(
  undefined
);

export const ConnectionProvider = ({
  children,
  selectedLanguage = "en",
}: {
  children: React.ReactNode;
  selectedLanguage?: string;
}) => {
  const [connectionDetails, setConnectionDetails] = useState<{
    wsUrl: string;
    token: string;
    mode: ConnectionMode;
    shouldConnect: boolean;
    roomId: string;
  }>({ wsUrl: "", token: "", shouldConnect: true, mode: "manual", roomId: "" });

  const connect = useCallback(async (mode: ConnectionMode) => {
    let token: string = "";
    let url = "";
    let roomId = "";
    const identity = getCookie("authUser");

    if (mode === "env") {
      if (!process.env.NEXT_PUBLIC_LIVEKIT_URL) {
        throw "NEXT_PUBLIC_LIVEKIT_URL is not set";
      }
      url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
      // const { accessToken } = await fetch(
      //   `/api/token?identity=${identity}`
      // ).then((res) => res.json());

      console.log("Creating room with language:", selectedLanguage);
      const { token: accessToken, room_id } = await fetch(
        `${process.env.ENDPOINT_URL}/service/livekit/create-room/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(identity || "")}`,
          },
          body: JSON.stringify({
            is_voice: true,
            language_code: selectedLanguage,
          }),
        }
      ).then((res) => res.json());

      if (!accessToken) {
        throw "Failed to fetch access token";
      }
      token = accessToken;
      roomId = room_id;
      // console.log(room_id);
      // token = STATIC_TEST_TOKEN;
    }
    setConnectionDetails({
      wsUrl: url,
      token,
      shouldConnect: true,
      mode,
      roomId,
    });
  }, [selectedLanguage]);

  const disconnect = useCallback(async () => {
    setConnectionDetails((prev) => ({ ...prev, shouldConnect: false }));
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        shouldConnect: connectionDetails.shouldConnect,
        mode: connectionDetails.mode,
        roomId: connectionDetails.roomId,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) {
    throw "useConnection must be used within a ConnectionProvider";
  }
  return context;
};
