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
        className={`flex ${isSelf ? "justify-end" : "justify-start"} w-full ${
          hideName ? "pt-0" : "pt-2 sm:pt-3 md:pt-4"
        }`}
      >
        <div
          className={`flex flex-col items-start gap-1 sm:gap-2 ${
            isSelf ? "mr-0" : "ml-0"
          }`}
        >
          <div
            className={`${
              isSelf
                ? "bg-[#DFF5E3] text-[#0D3D21] rounded-[8px] p-2 sm:p-3" //for user
                : "bg-transparent text-[#171717] rounded-none py-2 sm:py-3" // for agent
            } 
            text-[14px] sm:text-[14px] whitespace-pre-line mt-1`}
          >
            {isSelf ? (
              message
            ) : (
              <div className="markdown-content w-full sm:w-[95%] md:w-[90%] max-w-[700px] mx-auto overflow-hidden [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0 [&_li_p]:m-0 text-[13px] sm:text-[14px] md:text-[14px]">
                <ReactMarkdown>{message}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isSelf && (
        <div className="mb-2 sm:mb-3 md:mb-4 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <div className="flex justify-start items-center gap-x-2 sm:gap-x-3">
            <button
              className={`cursor-pointer active:opacity-60 text-gray-700`}
              onClick={() => setIsMuted(!isMuted)}
            >
              <Image
                src={isMuted ? "/mute.svg" : "/unmute.svg"}
                alt="speaker"
                width={14}
                height={14}
                className="sm:w-4 sm:h-4"
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
                className="sm:w-[14px] sm:h-[14px]"
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
                className="sm:w-[14px] sm:h-[14px]"
              />
            </button>
          </div>
          <div className="w-full sm:w-auto">
            <p className="text-[10px] sm:text-[12px] font-light text-[#4E4E4E] text-start sm:text-end">
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
