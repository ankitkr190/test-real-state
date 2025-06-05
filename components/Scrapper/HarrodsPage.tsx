import { useEffect, useState } from "react";

export default function HarrodsPage() {
  const [htmlReady, setHtmlReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateHtml = async () => {
      try {
        const response = await fetch(
          "/api/generate-website?proxy=true&path=/en/home_page"
        );
        if (response.ok) {
          setHtmlReady(true);
        } else {
          const data = await response.json();
          setError(data.message || "Failed to generate HTML");
        }
      } catch (err) {
        setError("Network error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    generateHtml();
  }, []);

  const handleIframeLoad = () => {
    setProgress(100); // Set progress to 100% when iframe finishes loading
  };

  const handleIframeError = () => {
    setError("Failed to load the iframe");
  };

  // Simulate a loading progress bar while the iframe is being loaded
  const simulateProgress = () => {
    let progressInterval: NodeJS.Timeout | null = null;
    if (loading && progress < 100) {
      progressInterval = setInterval(() => {
        if (progress < 90) {
          setProgress((prevProgress) => prevProgress + 5); // Increase progress
        } else {
          if (progressInterval) clearInterval(progressInterval);
        }
      }, 500);
    }
    return progressInterval;
  };

  useEffect(() => {
    const progressInterval = simulateProgress();
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [loading, progress]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-50 overflow-x-hidden">
      <style>
        {`
          @font-face {
            font-family: 'Prompt-Bold';
            src: url('/api/generate-harrods?font=Prompt-Bold') format('truetype');
          }
        `}
      </style>
      {loading && (
        <>
          <div className="text-gray-600 text-lg animate-pulse">
            Generating Richy Home Page... Please wait.
          </div>
          {/* Progress Bar */}
          <div className="absolute top-0 w-full bg-gray-200 h-1 mt-4">
            <div
              className="bg-[#8a7252] h-1"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}

      {error && (
        <div className="text-red-500 font-semibold mt-4">Error: {error}</div>
      )}

      {!loading && htmlReady && (
        <div className="relative w-full h-full">
          <iframe
            src="/harrods.html"
            title="Harrods Page"
            className="w-full h-full border-none"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
          {/* Loading Overlay */}
          {progress < 100 && (
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-75 flex items-center justify-center">
              <div className="text-gray-800">Loading...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
