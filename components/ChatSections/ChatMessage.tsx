import { ChatMessageType } from "@/@types/livekitProps";
import dynamic from "next/dynamic";
import React from "react";

const SingleChatMessage = dynamic(() => import("./SingleChatMessage"));
const SingleProductCard = dynamic(() => import("./SingleProductCard"));

interface ChatMessageProps {
  messages: ChatMessageType[];
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChatMessage({ isMuted, messages, setIsMuted }: ChatMessageProps) {
  return (
    <div>
      {messages?.map((message, index, allMsg) => {
        const hideName = index >= 1 && allMsg[index - 1].name === message.name;

        return (
          <div key={index}>
            <SingleChatMessage
              hideName={hideName}
              name={message.name}
              message={message.message}
              isSelf={message.isSelf}
              timestamp={message.timestamp}
              isMuted={isMuted}
              setIsMuted={setIsMuted}
            />

            {message.products?.length > 0 && (
              <div className="pt-2 overflow-auto">
                <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 pb-2 px-1 sm:px-2">
                  {message.products.map((property, pid) => (
                    <div
                      className="w-full sm:w-9/12 md:w-8/12 lg:w-7/12"
                      key={pid}
                    >
                      <SingleProductCard
                        name={property?.project_name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                        brand={property.project_owner}
                        details={`${property.realestate_type} • ${property.room_area} • Located at ${property.location}`}
                        image={property.project_images}
                        price={property.budget}
                        link={property.richyLink || "/"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessage;
