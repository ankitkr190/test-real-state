/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export function useMicrophoneTrack() {
  const [micTrack, setMicTrack] = useState<MediaStreamTrack | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    const getMicrophone = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioTrack = stream.getAudioTracks()[0];
        setMicTrack(audioTrack);
      } catch (err: any) {
        console.error("Error accessing microphone:", err);
        setError(err.message || "Failed to access microphone");
      }
    };

    getMicrophone();

    return () => {
      // Cleanup: stop the track
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return { micTrack, error };
}
