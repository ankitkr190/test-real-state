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
    <div 
      className="flex flex-col bg-white border border-[#4D8D67]/20 shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{
        minWidth: 'clamp(8rem, 18vw, 15rem)',
        maxWidth: 'clamp(10rem, 22vw, 18rem)',
        gap: 'clamp(0.2rem, 0.4vw, 0.6rem)',
        borderRadius: 'clamp(0.6rem, 0.8vw, 0.8rem)',
        padding: 'clamp(0.2rem, 0.4vw, 0.6rem)',
      }}
    >
      <div 
        className="relative w-full"
        style={{
          height: 'clamp(7rem, 13vw, 10rem)',
        }}
      >
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className="animate-spin rounded-full border-b-2 border-[#1A7A4B]"
              style={{
                width: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                height: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              }}
            ></div>
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
                      className="w-full h-full object-cover"
                      style={{
                        borderRadius: 'clamp(0.4rem, 0.8vw, 0.6rem)',
                      }}
                      draggable={false}
                    />
                  </SwiperSlide>
                )
            )}
            <div className="swiper-pagination !-bottom-[-10px]"></div>
          </Swiper>
        )}
      </div>

      <div 
        style={{
          padding: 'clamp(0.2rem, 0.4vw, 0.6rem)',
          marginTop: 'clamp(0.1rem, 0.2vw, 0.3rem)',
        }}
      >
        <p 
          className="font-normal text-[#0D3D21] line-clamp-1 capitalize"
          style={{
            fontSize: 'clamp(0.55rem, 1.3vw, 0.7rem)',
            marginBottom: 'clamp(0.1rem, 0.2vw, 0.3rem)',
          }}
        >
          {brand}
        </p>
        <h2 
          className="font-semibold line-clamp-2 text-[#0D3D21]"
          style={{
            fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
            marginBottom: 'clamp(0.1rem, 0.2vw, 0.3rem)',
          }}
        >
          {name}
        </h2>
        <p 
          className="font-medium text-[#4D8D67] line-clamp-2"
          style={{
            fontSize: 'clamp(0.55rem, 1.3vw, 0.7rem)',
            marginBottom: 'clamp(0.6rem, 0.8vw, 0.9rem)',
            marginTop: 'clamp(0.1rem, 0.2vw, 0.3rem)',
          }}
        >
          {details}
        </p>

        <div 
          className="flex justify-between items-center border-t-[1px] border-emerald-200"
          style={{
            paddingTop: 'clamp(0.3rem, 0.6vw, 0.4rem)',
            paddingBottom: 'clamp(0.1rem, 0.2vw, 0.3rem)',
          }}
        >
          <p 
            className="w-[60%] font-bold text-green-700 capitalize"
            style={{
              fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
              marginTop: 'clamp(0.1rem, 0.2vw, 0.3rem)',
            }}
          >
            ฿ {`${price.split(" ")[0]} ${price.split(" ")[1]}`}
          </p>

          <a
            href={link || "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[40%] bg-emerald-50 hover:bg-emerald-100 transition-colors duration-200 border border-emerald-400 text-emerald-600 font-semibold rounded-full cursor-pointer text-center shadow-sm"
            style={{
              fontSize: 'clamp(0.55rem, 1.3vw, 0.7rem)',
              padding: 'clamp(0.2rem, 0.4vw, 0.4rem) clamp(0.4rem, 0.8vw, 0.6rem)',
              marginTop: 'clamp(0.1rem, 0.2vw, 0.3rem)',
            }}
          >
            See Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingleProductCard;
