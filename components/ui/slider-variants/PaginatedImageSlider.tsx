'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination, FreeMode } from 'swiper/modules';
import { cn } from '@/utils/cn';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface PaginatedImageSliderProps {
  images: {
    alt: string;
    url: string;
  }[];
  defaultSlidesPerView?: number;
  desktopSlidesPerView?: number;
  tabletSlidesPerView?: number;
  mobileSlidesPerView?: number;
  speed?: number;
  autoPlayDelay?: number;
  spaceBetween?: number;
  isPaginationEnabled?: boolean;
  className?: string;
}

export const PaginatedImageSlider = ({
  images,
  autoPlayDelay = 5000,
  isPaginationEnabled = true,
  className,
}: PaginatedImageSliderProps) => {
  return (
    <div className={cn('w-full my-5', 'flex flex-col gap-5', className)}>
      <div
        className={cn(
          'w-full h-[550px] relative',
          'flex flex-col items-center justify-center',
          '[&_.swiper-pagination-bullet]:!bg-white',
          '[&_.swiper-pagination-bullet-active]:!bg-blue-500',
          '[&_.swiper-pagination-bullet-active]:!opacity-100'
        )}
      >
        <Swiper
          modules={[Pagination, Autoplay, Navigation, FreeMode]}
          pagination={{
            enabled: isPaginationEnabled,
            clickable: true,
            dynamicBullets: true,
            el: '.custom-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          autoplay={{
            delay: autoPlayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            stopOnLastSlide: false,
          }}
          loop={true}
          navigation={{
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <div className={cn('w-full h-full', 'relative')}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        {isPaginationEnabled && (
          <div className={cn('custom-pagination my-2.5', '!transform-none')} />
        )}

        {/* Navigation Buttons */}
        <div id="prevButton" className={cn('swiper-button-prev', '!text-white !w-6 !h-6')} />
        <div id="nextButton" className={cn('swiper-button-next', '!text-white !w-6 !h-6')} />
      </div>
    </div>
  );
};
