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
          paddingTop: hideName ? '0' : 'clamp(0.5rem, 1.5vw, 1rem)',
        }}
      >
        <div
          className={`flex flex-col items-start ${
            isSelf ? "mr-0" : "ml-0"
          }`}
          style={{
            gap: 'clamp(0.25rem, 0.5vw, 0.5rem)',
          }}
        >
          <div
            className={`${
              isSelf
                ? "bg-[#DFF5E3] text-[#0D3D21] rounded-[8px]" //for user
                : "bg-transparent text-[#171717] rounded-none" // for agent
            } whitespace-pre-line`}
            style={{
              padding: isSelf ? 'clamp(0.5rem, 1vw, 0.75rem)' : 'clamp(0.5rem, 1.5vw, 0.75rem) 0',
              fontSize: 'clamp(0.8rem, 1.8vw, 0.875rem)',
              marginTop: 'clamp(0.25rem, 0.5vw, 0.25rem)',
            }}
          >
            {isSelf ? (
              message
            ) : (
              <div 
                className="markdown-content overflow-hidden [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0 [&_li_p]:m-0"
                style={{
                  width: 'clamp(95%, 90vw, 700px)',
                  maxWidth: 'clamp(400px, 85vw, 700px)',
                  fontSize: 'clamp(0.8rem, 1.8vw, 0.875rem)',
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
            marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)',
            gap: 'clamp(0.5rem, 1vw, 0.5rem)',
          }}
        >
          <div 
            className="flex justify-start items-center"
            style={{
              gap: 'clamp(0.5rem, 1vw, 0.75rem)',
            }}
          >
            <button
              className={`cursor-pointer active:opacity-60 text-gray-700`}
              onClick={() => setIsMuted(!isMuted)}
            >
              <Image
                src={isMuted ? "/mute.svg" : "/unmute.svg"}
                alt="speaker"
                width={14}
                height={14}
                style={{
                  width: 'clamp(0.875rem, 1.5vw, 1rem)',
                  height: 'clamp(0.875rem, 1.5vw, 1rem)',
                }}
              />
            </button>
            <button
              className="cursor-pointer active:opacity-60 text-gray-700"
              aria-label="Like"
              title="Like"
            >
              <Image 
                src={"/like.svg"} 
                alt="like" 
                width={12} 
                height={12}
                style={{
                  width: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                  height: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                }}
              />
            </button>
            <button
              className="cursor-pointer active:opacity-60 text-gray-700"
              aria-label="Dislike"
              title="Dislike"
            >
              <Image
                src={"/dislike.svg"}
                alt="dislike"
                width={12}
                height={12}
                style={{
                  width: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                  height: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                }}
              />
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <p 
              className="font-light text-[#4E4E4E] text-start sm:text-end"
              style={{
                fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)',
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
