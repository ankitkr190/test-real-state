/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

function BotIcon() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/botico1.png", "/botico2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images?.length);
    }, 500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex items-center justify-center w-12 h-12 bg-[#FCF9E6]/40 rounded-full shadow-lg relative overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="APK Logo"
          className={`h-7 w-9 absolute transition-transform duration-300 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default BotIcon;
