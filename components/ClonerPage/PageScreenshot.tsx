import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageScreenshot() {
  const [imageReady, setImageReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Trigger screenshot generation on mount
  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await fetch("/api/generate-screenshot", {
          method: "POST",
        });

        if (response.ok) {
          setImageReady(true);
        } else {
          const data = await response.json();
          setError(data.message || "Failed to generate image");
        }
      } catch (err) {
        setError("Network error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, []);

  // Simulate loading progress
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const handleImageLoad = () => {
    setProgress(100);
  };

  const handleImageError = () => {
    setError("Failed to load the Harrods image");
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-50 overflow-x-hidden">
      {loading && (
        <>
          <div className="text-gray-600 text-lg animate-pulse mb-4">
            Generating Harrods preview... Please wait.
          </div>
          <div className="absolute top-0 w-full bg-gray-200 h-1">
            <div
              className="bg-[#8a7252] h-1 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}

      {error && (
        <div className="text-red-500 font-semibold mt-4">Error: {error}</div>
      )}

      {!loading && imageReady && !error && (
        <div className="relative w-full h-full flex items-center justify-center bg-white">
          <div className="w-screen h-screen overflow-auto">
            <Image
              src="/harrods.webp"
              alt="Harrods Screenshot"
              width={1080}
              height={1080}
              className="w-full"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          {progress < 100 && (
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-75 flex items-center justify-center">
              <div className="text-gray-800">Loading image...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
