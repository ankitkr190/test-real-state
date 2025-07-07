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
              <div 
                className="overflow-auto"
                style={{
                  paddingTop: 'clamp(0.5rem, 1vw, 0.5rem)',
                }}
              >
                <div 
                  className="flex flex-col items-start"
                  style={{
                    gap: 'clamp(0.5rem, 1.5vw, 1rem)',
                    paddingBottom: 'clamp(0.5rem, 1vw, 0.5rem)',
                    padding: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                  }}
                >
                  {message.products.map((property, pid) => (
                    <div
                      key={pid}
                      style={{
                        width: 'clamp(100%, 85vw, 60%)',
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
