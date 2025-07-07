import React from "react";
import { useAudioWave } from "../hooks/useAudioWave";

function CustomBarVisualizer({
  micTrack,
}: {
  micTrack: MediaStreamTrack | null;
}) {
  const barHeights = useAudioWave(micTrack, 20); // 20 bars

  return (
    <div 
      className="flex items-center justify-center w-full"
      style={{
        gap: 'clamp(2px, 0.5vw, 3px)',
        height: 'clamp(2.375rem, 6vw, 3.125rem)',
        margin: 'clamp(0.5rem, 1vw, 0.5rem) 0',
        padding: '0 clamp(0.5rem, 1vw, 0.5rem)',
      }}
    >
      {barHeights.map((height, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400 rounded-full shadow-sm transition-all duration-100 ease-out animate-pulse"
          style={{
            height: `${Math.max(height, 10)}%`,
            width: 'clamp(3px, 0.7vw, 5px)',
            minHeight: '6px',
            opacity: height > 20 ? 1 : 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default CustomBarVisualizer;
