'use client';
import { ISlider } from '@/lib/generated';
import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { cn } from '@/utils/cn';

//Swiper CSS
import 'swiper/css';

export const InfiniteSwipeSlider = ({ slider_images, slider_styling_options }: ISlider) => {
  // Memoize breakpoints to prevent recreation
  const breakpoints = useMemo(
    () => ({
      0: { slidesPerView: slider_styling_options?.mobile_slides_per_view || 1 },
      768: { slidesPerView: slider_styling_options?.tablet_slides_per_view || 2 },
      1024: { slidesPerView: slider_styling_options?.desktop_slides_per_view || 3 },
    }),
    [slider_styling_options]
  );

  return (
    <div
      className={cn('w-full')}
      style={{ height: `${slider_styling_options?.slider_height || 300}px` }}
    >
      <Swiper
        modules={[FreeMode, Autoplay]}
        spaceBetween={10}
        slidesPerView={slider_styling_options?.default_slides_per_view || 1}
        loop={true}
        freeMode={{
          enabled: true,
          momentum: true,
          sticky: true,
        }}
        speed={500}
        autoplay={{
          delay: slider_styling_options?.autoplay_delay || 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
        }}
        allowTouchMove={true}
        breakpoints={breakpoints}
        className="h-full w-full"
      >
        {slider_images?.image?.map((image, index) => (
          <SwiperSlide key={`main-${index}`} className="relative text-white">
            <Image
              src={image.image?.url || ''}
              alt={image.image_alt_text || 'Slider Image'}
              className="object-cover w-full h-full"
              height={250}
              width={250}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
