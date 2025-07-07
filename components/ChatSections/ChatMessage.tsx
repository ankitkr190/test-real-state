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
    <div className="w-full max-w-full space-y-4">
      {messages?.map((message, index, allMsg) => {
        const hideName = index >= 1 && allMsg[index - 1].name === message.name;

        return (
          <div key={index} className="w-full">
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
              <div 
                className="w-full overflow-hidden mt-3"
                style={{
                  paddingTop: 'clamp(0.5rem, 1vw, 0.5rem)',
                }}
              >
                <div 
                  className="flex flex-col items-start w-full space-y-3"
                  style={{
                    paddingBottom: 'clamp(0.5rem, 1vw, 0.5rem)',
                    padding: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                  }}
                >
                  {message.products.map((property, pid) => (
                    <div
                      key={pid}
                      className="w-full max-w-full min-w-0"
                      style={{
                        maxWidth: 'min(100%, 400px)',
                      }}
                    >
                      <SingleProductCard
                        name={property?.project_name
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                        brand={property.room_name}
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
