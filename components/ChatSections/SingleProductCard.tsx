/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface SingleProductCardProps {
  name: string;
  brand?: string;
  image: string[];
  price: string;
  details: string;
  link: string;
}

function SingleProductCard({
  details,
  image,
  link,
  name,
  price,
  brand = "",
}: SingleProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // Preload all images when the component mounts
    const preloadImages = async () => {
      setIsLoading(true);

      const promises = image.map((imageUrl) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve(img.src);
          img.onerror = () => resolve(imageUrl); // Fallback to original URL on error
          img.src = imageUrl;
        });
      });

      const urls = await Promise.all(promises);
      setImageUrls(urls as string[]);
      setIsLoading(false);
    };

    preloadImages();
  }, [image]);

  return (
    <div className="flex flex-col gap-2 min-w-[250px] rounded-[20px] shadow-md p-2 bg-white">
      <div className="relative w-full h-[249px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#856829]"></div>
          </div>
        ) : (
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            spaceBetween={50}
            slidesPerView={1}
            className="w-full h-full"
          >
            {imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url || image[index]}
                  alt={name}
                  className="w-full h-full object-contain rounded-lg"
                  draggable={false}
                />
              </SwiperSlide>
            ))}
            <div className="swiper-pagination !-bottom-[5px]"></div>
          </Swiper>
        )}
      </div>

      <div className="">
        <p className="mb-1.5 sm:text-[14px] text-[12px] font-normal text-[#171717] line-clamp-1 capitalize">
          {brand}
        </p>
        <h2 className="mb-1.5 sm:text-[18px] text-[16px] font-semibold line-clamp-3">
          {name}
        </h2>
        <p className="sm:text-[14px] text-[12px] font-normal mt-0.5 text-[#616161] line-clamp-3">
          {details}
        </p>
        <p className="mt-1.5 sm:text-[18px] text-[16px] font-bold text-[#171717]">
          £{Number(price.toString().replace(/\s*GBP$/, "")).toFixed(2)}
        </p>
      </div>
      <a
        href={link || "/"}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-[#856829] border px-6 py-1.5 mt-1 w-full text-white font-medium rounded-lg cursor-pointer text-center text-sm`}
      >
        See Details
      </a>
    </div>
  );
}

export default SingleProductCard;
