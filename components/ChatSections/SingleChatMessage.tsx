import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

type ChatMessageProps = {
  message: string;
  name: string;
  isSelf: boolean;
  timestamp: number;
  hideName?: boolean;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
};

function SingleChatMessage({
  isMuted,
  isSelf,
  message,
  setIsMuted,
  timestamp,
  hideName,
}: ChatMessageProps) {
  const date = new Date(timestamp);

  return (
    <>
      <div
        className={`flex ${isSelf ? "justify-end" : "justify-start"} w-full`}
        style={{
          paddingTop: hideName ? "0" : "clamp(0.5rem, 1.5vw, 1rem)",
        }}
      >
        <div
          className={`flex flex-col items-start ${
            isSelf ? "mr-0 items-end" : "ml-0"
          }`}
          style={{
            gap: "clamp(0.25rem, 0.5vw, 0.5rem)",
            maxWidth: isSelf ? "80%" : "90%",
          }}
        >
          <div
            className={`${
              isSelf
                ? "bg-gradient-to-br from-[#DDDDDD4B] to-[#2D2D2D4B] text-gray-700" // Modern gradient for user
                : "bg-transparent text-[#2D2D2D]" // Modern clean styling for agent
            } whitespace-pre-line transition-all duration-200 ${
              isSelf ? "" : ""
            }`}
            style={{
              padding: isSelf
                ? "clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.25rem)"
                : "clamp(0.25rem, 0.5vw, 0.5rem) 0",
              fontSize: "clamp(0.85rem, 1.9vw, 0.95rem)",
              marginTop: "clamp(0.25rem, 0.5vw, 0.25rem)",
              borderRadius: isSelf ? "20px 20px 4px 20px" : undefined,
              maxWidth: "100%",
              wordBreak: "break-word",
              lineHeight: "1.6",
            }}
          >
            {isSelf ? (
              message
            ) : (
              <div
                className="markdown-content overflow-hidden [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0 [&_li_p]:m-0 [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-2 [&_h3]:font-medium [&_h3]:mt-1 [&_strong]:font-semibold [&_strong]:text-[#00804A] [&_em]:italic [&_ul]:pl-4 [&_ol]:pl-4 [&_li]:mb-1"
                style={{
                  width: "clamp(95%, 90vw, 700px)",
                  maxWidth: "clamp(400px, 85vw, 700px)",
                  fontSize: "clamp(0.85rem, 1.9vw, 0.95rem)",
                  lineHeight: "1.6",
                  color: "#2D2D2D",
                }}
              >
                <ReactMarkdown>{message}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isSelf && (
        <div
          className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center"
          style={{
            marginTop: "0.125rem",
            marginBottom: "clamp(1rem, 2vw, 1.5rem)",
            gap: "clamp(0.75rem, 1.5vw, 1rem)",
          }}
        >
          <div
            className="flex justify-start items-center"
            style={{
              gap: "clamp(0.25rem, 0.5vw, 0.5rem)",
            }}
          >
            <button
              className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 rounded-lg p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute" : "Mute"}
            >
              <Image
                src={isMuted ? "/actions/tts.svg" : "/actions/tts.svg"}
                alt="speaker"
                width={16}
                height={16}
                style={{
                  width: "clamp(1rem, 1.8vw, 1.2rem)",
                  height: "clamp(1rem, 1.8vw, 1.2rem)",
                }}
              />
            </button>
            <button
              className="cursor-pointer hover:bg-green-50 active:bg-green-100 transition-all duration-200 rounded-lg p-2 text-gray-600 hover:text-green-600"
              aria-label="Like"
              title="Like"
            >
              <Image
                src={"/actions/like.svg"}
                alt="like"
                width={16}
                height={16}
                style={{
                  width: "clamp(1rem, 1.6vw, 1.1rem)",
                  height: "clamp(1rem, 1.6vw, 1.1rem)",
                }}
              />
            </button>
            <button
              className="cursor-pointer hover:bg-red-50 active:bg-red-100 transition-all duration-200 rounded-lg p-2 text-gray-600 hover:text-red-600"
              aria-label="Dislike"
              title="Dislike"
            >
              <Image
                src={"/actions/dislike.svg"}
                alt="dislike"
                width={16}
                height={16}
                style={{
                  width: "clamp(1rem, 1.6vw, 1.1rem)",
                  height: "clamp(1rem, 1.6vw, 1.1rem)",
                }}
              />
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <p
              className="font-medium text-gray-400 text-start sm:text-end"
              style={{
                fontSize: "clamp(0.7rem, 1.3vw, 0.8rem)",
              }}
            >
              {date
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h12",
                })
                ?.split("/")
                .join(".")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleChatMessage;
