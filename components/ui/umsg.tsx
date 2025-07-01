import React from 'react';

interface UserMessageProps {
  message: string;
  className?: string;
}

function UserMessage({ message, className = '' }: UserMessageProps) {
  return (
    <div className={`flex justify-end mb-4 ${className}`}>
      <div className="max-w-[80%] md:max-w-[70%]">
        <div className="bg-[#DFF5E3] rounded-3xl rounded-br-sm px-4 py-3 shadow-sm">
          <p className="text-[#0D3D21] font-sans text-base leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserMessage;
