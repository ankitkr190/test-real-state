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
    <div className="flex flex-col gap-1.5 sm:gap-2 min-w-[200px] sm:min-w-[250px] rounded-[16px] sm:rounded-[20px] shadow-lg hover:shadow-xl transition-shadow duration-300 p-1.5 sm:p-2 bg-white border border-[#4D8D67]/20">
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[249px]">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#1A7A4B]"></div>
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
            {imageUrls.map(
              (url, index) =>
                index < 5 && (
                  <SwiperSlide key={index}>
                    <img
                      src={url || image[index]}
                      alt={name}
                      className="w-full h-full object-contain rounded-md sm:rounded-lg"
                      draggable={false}
                    />
                  </SwiperSlide>
                )
            )}
            <div className="swiper-pagination !-bottom-[5px]"></div>
          </Swiper>
        )}
      </div>

      <div className="px-3 mt-1">
        <p className="mb-1 sm:mb-1.5 text-[11px] sm:text-[12px] md:text-[14px] font-normal text-[#0D3D21] line-clamp-1 capitalize">
          {brand}
        </p>
        <h2 className="mb-1 sm:mb-1.5 text-[14px] sm:text-[16px] md:text-[18px] font-semibold line-clamp-2 sm:line-clamp-3 text-[#0D3D21]">
          {name}
        </h2>
        <p className="mb-2 text-[12px] sm:text-[12px] md:text-[14px] font-medium mt-0.5 text-[#4D8D67] line-clamp-2 sm:line-clamp-3">
          {details}
        </p>

        <div className="pt-2 pb-1 flex justify-between items-center border-t-[1px] border-emerald-200">
          <p className="w-[60%] mt-1 sm:mt-1.5 text-[14px] sm:text-[16px] md:text-[18px] font-bold text-green-700 capitalize">
            ฿ {`${price.split(" ")[0]} ${price.split(" ")[1]}`}
          </p>

          <a
            href={link || "/"}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-[40%] bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 border border-emerald-400 px-4 sm:px-6 py-1 sm:py-1.5 mt-0.5 sm:mt-1 text-emerald-600 font-semibold rounded-full cursor-pointer text-center text-xs sm:text-sm shadow-sm`}
          >
            See Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingleProductCard;
