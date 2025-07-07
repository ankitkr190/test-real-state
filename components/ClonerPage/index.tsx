/**
 * Description:
 * This is the component that will display the cloned page
 * It will display the cloned page in an iframe
 * It will display a progress bar while the iframe is loading
 * It will display an error message if the iframe fails to load
 * It will display a message if there is no content to display
 * It will display the cloned page in an iframe
 */

import { useEffect, useState } from "react";

interface PageProps {
  pageName: string;
  pageUrl: string;
}

export default function ClonePage({ pageName, pageUrl }: PageProps) {
  const [htmlReady, setHtmlReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateHtml = async () => {
      try {
        const response = await fetch("/api/generate-website", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pageUrl }),
        });

        if (response.ok) {
          setHtmlReady(true);
        } else {
          const data = await response.json();
          setError(data.message || "Failed to generate HTML");
        }
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    generateHtml();
  }, [pageUrl]);

  const handleIframeLoad = () => {
    setProgress(100);
  };

  const handleIframeError = () => {
    setError("Failed to load the iframe");
  };

  // Simulate progress bar while iframe is loading
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-50 overflow-x-hidden">
      {loading && (
        <>
          <div className="text-gray-600 text-lg animate-pulse">
            Generating {pageName} page... Please wait.
          </div>
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

      {!loading && htmlReady && !error && (
        <div className="relative w-full h-full">
          <iframe
            src="/harrods.html"
            title={pageName}
            className="w-full h-full border-none"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
          {progress < 100 && (
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-75 flex items-center justify-center">
              <div className="text-gray-800">Loading...</div>
            </div>
          )}
        </div>
      )}

      {!loading && !htmlReady && !error && (
        <div className="text-gray-500 mt-4">No content to display.</div>
      )}
    </div>
  );
}
