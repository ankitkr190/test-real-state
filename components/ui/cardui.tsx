/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface CardUIProps {
  projectName: string;
  projectOwner: string;
  size: string;
  location: string;
  amenities: string;
  price: string;
  images: string[];
  onViewDetails?: () => void;
}

const CardUI: React.FC<CardUIProps> = ({
  projectName,
  projectOwner,
  size,
  location,
  amenities,
  price,
  images,
  onViewDetails,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-80">
      {/* Image Carousel Section */}
      <div className="relative h-[180px] bg-gradient-to-b from-sky-300 to-sky-500">
        {images.length > 0 && (
          <img
            src={images[currentImageIndex]}
            alt={`${projectName} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-all duration-200"
            >
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentImageIndex
                    ? "bg-green-500"
                    : index === 1
                    ? "bg-gray-300"
                    : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Project Title */}
        <div className="mb-3">
          <h2 className="text-sm font-bold text-gray-900 mb-1">
            {projectName}
          </h2>
          <p className="text-gray-600 text-xs">{projectOwner}</p>
        </div>

        {/* Project Details */}
        <div className="space-y-2.5 mb-5">
          {/* Size */}
          <div className="flex items-center text-gray-700">
            <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-3">
              <img
                src="/chat/chatico-size.svg"
                alt="Size"
                className="w-4 h-4"
              />
            </div>
            <span className="text-xs">{size}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-700">
            <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-3">
              <img
                src="/chat/chatico-location.svg"
                alt="Location"
                className="w-4 h-4"
              />
            </div>
            <span className="text-xs">{location}</span>
          </div>

          {/* Amenities */}
          <div className="flex items-center text-gray-700">
            <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-3">
              <img
                src="/chat/chatico-amenities.svg"
                alt="Amenities"
                className="w-4 h-4"
              />
            </div>
            <span className="text-xs">{amenities}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-6"></div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">{price}</div>
          <button
            onClick={onViewDetails}
            className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-green-100 transition-colors duration-200 border border-green-200"
          >
            VIEW DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardUI;
