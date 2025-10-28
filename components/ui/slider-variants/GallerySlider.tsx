'use client';

import { ISlider } from '@/lib/generated';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import type { Swiper as SwiperClass } from 'swiper';
import { Container } from '@/components/primitives/Container';

//Swiper CSS
import 'swiper/css';

export const GallerySlider = ({ slider_images, slider_styling_options }: ISlider) => {
  const [thumbSwiper, setThumbSwiper] = useState<SwiperClass | null>(null);

  // const handleMainSlideChange = (swiper: SwiperClass) => {
  //   if (thumbSwiper && thumbSwiper.slides) {
  //     thumbSwiper.slideTo(swiper.realIndex);
  //     thumbSwiper.slides[swiper.realIndex].classList.add('!opacity-100');
  //   }
  // };

  return (
    <Container tag="div" bottomPadded={false}>
      {/* Main Slider */}
      <Swiper
        modules={[FreeMode, EffectFade, Thumbs]}
        watchSlidesProgress={true}
        spaceBetween={10}
        longSwipes={false}
        thumbs={{ swiper: thumbSwiper }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        grabCursor={true}
        className={cn('w-full h-48 md:h-96 lg:h-[550px] xl:h-[654px]', 'my-2')}
      >
        {slider_images?.image?.map((image, index) => (
          <SwiperSlide
            key={`main-${index}`}
            className={cn('relative text-white w-full h-full', 'p-1 border border-light-gray')}
          >
            <Image
              src={image.image?.url || ''}
              alt={image.image_alt_text || 'Slider Image'}
              className="w-full h-full object-cover"
              fill={true}
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        modules={[FreeMode, Thumbs, Autoplay]}
        autoplay={{
          delay: slider_styling_options?.autoplay_delay || 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
        }}
        onSwiper={setThumbSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress={true}
        slideToClickedSlide={true}
        loop={true}
        freeMode={{
          enabled: true,
          momentum: false,
          sticky: true,
        }}
        className={cn('w-full h-12 sm:h-16 md:h-28 lg:h-32 xl:h-44', 'my-2')}
      >
        {slider_images?.image?.map((image, index) => (
          <SwiperSlide
            key={`thumb-${index}`}
            className={cn(
              'relative text-white w-full h-full cursor-pointer',
              'border border-light-gray p-1 opacity-50'
            )}
          >
            <Image
              src={image.image?.url || ''}
              alt={image.image_alt_text || 'Slider Image'}
              className="w-full h-full"
              fill={true}
              sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
              quality={100}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
