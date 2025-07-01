import React from 'react';
import UserMessage from '../components/ui/umsg';

export default function TestChat() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Chat Bubble Test</h1>
        
        {/* Container for chat messages */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          
          {/* Test different message lengths */}
          <UserMessage 
            message="Hi!" 
          />
          
          <UserMessage 
            message="I'm looking for a 2-bedroom condo in Bangkok." 
          />
          
          <UserMessage 
            message="Thong Lo would be ideal. I'd like something within walking distance of a BTS station, preferably with modern amenities like a gym and swimming pool. My budget is around ฿8,000,000." 
          />
          
          <UserMessage 
            message="Do you have any recommendations?" 
          />
          
          <UserMessage 
            message="Also, is parking included?" 
          />
          
        </div>
      </div>
    </div>
  );
}
