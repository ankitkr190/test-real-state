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
          hideName ? "pt-0" : "pt-4"
        }`}
      >
        <div
          className={`flex flex-col items-start gap-2 ${
            isSelf ? "mr-0" : "ml-0"
          }`}
        >
          <div
            className={`${
              isSelf
                ? "bg-[#DFF5E3] text-[#0D3D21] rounded-[8px] p-2" //for user
                : "bg-transparent text-[#171717] rounded-none py-3" // for agent
            } 
            text-[16px] whitespace-pre-line mt-1`}
          >
            {isSelf ? (
              message
            ) : (
              <div className="markdown-content w-[90%] max-w-[700px] mx-auto overflow-hidden [&_p]:m-0 [&_ul]:m-0 [&_ol]:m-0 [&_li]:m-0 [&_li_p]:m-0 text-[15px]">
                <ReactMarkdown>{message}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isSelf && (
        <div className="mb-4 w-full flex justify-between items-center">
          <div className="w-7/12 flex justify-start items-center gap-x-2">
            <button
              className={`cursor-pointer active:opacity-60 text-gray-700`}
              onClick={() => setIsMuted(!isMuted)}
            >
              <Image
                src={isMuted ? "/mute.svg" : "/unmute.svg"}
                alt="speaker"
                width={16}
                height={16}
              />
            </button>
            <button
              className="cursor-pointer active:opacity-60 text-gray-700"
              aria-label="Like"
              title="Like"
            >
              <Image src={"/like.svg"} alt="like" width={14} height={14} />
            </button>
            <button
              className="cursor-pointer active:opacity-60 text-gray-700"
              aria-label="Dislike"
              title="Dislike"
            >
              <Image
                src={"/dislike.svg"}
                alt="dislike"
                width={14}
                height={14}
              />
            </button>
          </div>
          <div className="w-5/12">
            <p className="text-[12px] font-light text-[#4E4E4E] text-end">
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
