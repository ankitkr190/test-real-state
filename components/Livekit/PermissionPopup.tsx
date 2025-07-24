import React from "react";

interface PermissionPopupProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

function PermissionPopup({ isVisible, setIsVisible }: PermissionPopupProps) {
  // Ensure the popup is hidden by default unless explicitly set to visible
  if (!isVisible) return null;

  const handleAccept = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone permission granted");

      // Request background audio permission
      if ("wakeLock" in navigator) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (navigator as any).wakeLock.request("screen");
          console.log("Background audio permission granted");
        } catch (err) {
          console.error("Error getting background audio permission:", err);
        }
      }

      // Set cookie consent for third-party cookies
      document.cookie = "cookieConsent=true; max-age=31536000; path=/";
      document.cookie = "thirdPartyCookies=true; max-age=31536000; path=/";

      setIsVisible(false);
      localStorage.setItem("hasPermission", "true");
    } catch (err) {
      console.error("Error getting permissions:", err);
    }
  };

  const handleReject = () => {
    setIsVisible(false);
    localStorage.setItem("hasPermission", "false");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-[90%] p-6 shadow-lg relative border border-amber-200">
        <h2 className="text-2xl font-semibold text-amber-600 mb-4">
          Permissions Required
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-amber-100">
            <svg
              className="w-6 h-6 text-amber-600 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <div>
              <h3 className="font-medium text-amber-600">Microphone Access</h3>
              <p className="text-sm text-amber-700">
                Allow microphone access for voice interactions and audio input
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg bg-amber-100">
            <svg
              className="w-6 h-6 text-amber-600 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
              />
            </svg>
            <div>
              <h3 className="font-medium text-amber-600">Background Audio</h3>
              <p className="text-sm text-amber-700">
                Allow audio playback to continue when the app is in the
                background
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg bg-amber-100">
            <svg
              className="w-6 h-6 text-amber-600 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <div>
              <h3 className="font-medium text-amber-600">
                Third-party Cookies
              </h3>
              <p className="text-sm text-amber-700">
                Allow cookies from trusted partners for enhanced functionality,
                analytics, and personalization
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleReject}
            className="flex-1 border border-amber-200 text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-100 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export default PermissionPopup;
