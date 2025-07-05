import React from "react";
import { useAudioWave } from "../hooks/useAudioWave";

function CustomBarVisualizer({
  micTrack,
}: {
  micTrack: MediaStreamTrack | null;
}) {
  const barHeights = useAudioWave(micTrack, 20); // 20 bars

  return (
    <div className="flex items-center justify-center gap-[3px] w-full md:h-[50px] h-[38px] my-2 px-2">
      {barHeights.map((height, idx) => (
        <div
          key={idx}
          className="bg-[#00804a] w-[3px] rounded-sm transition-all duration-75 ease-in"
          style={{
            height: `${height}%`,
            // Responsive width (mobile to desktop)
            ...(barHeights.length < 8
              ? { width: "4px" }
              : barHeights.length > 12
              ? { width: "2px" }
              : {}),
          }}
        />
      ))}
    </div>
  );
}

export default CustomBarVisualizer;
