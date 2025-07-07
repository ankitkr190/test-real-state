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
          className="bg-[#00804a] rounded-sm transition-all duration-75 ease-in"
          style={{
            height: `${height}%`,
            width: 'clamp(2px, 0.5vw, 4px)',
          }}
        />
      ))}
    </div>
  );
}

export default CustomBarVisualizer;
