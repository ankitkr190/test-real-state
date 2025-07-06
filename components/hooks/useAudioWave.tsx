import { useEffect, useRef, useState } from "react";

export function useAudioWave(
  audioTrack: MediaStreamTrack | null,
  barCount = 10
) {
  const [barHeights, setBarHeights] = useState<number[]>(
    new Array(barCount).fill(0)
  );
  const animationRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioTrack) return;

    const audioCtx = new AudioContext();
    const stream = new MediaStream([audioTrack]);
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;

    source.connect(analyser);
    analyserRef.current = analyser;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);

      // Use center slice of frequency data
      const step = Math.floor(dataArray.length / (barCount / 2));
      const left = [];
      for (let i = 0; i < barCount / 2; i++) {
        const val = dataArray[i * step];
        left.push(Math.max(4, (val / 255) * 100));
      }

      const mirrored = [...left.slice().reverse(), ...left];
      setBarHeights(mirrored);

      animationRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      source.disconnect();
      analyser.disconnect();
      audioCtx.close();
    };
  }, [audioTrack, barCount]);

  return barHeights;
}
