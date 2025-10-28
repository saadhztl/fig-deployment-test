'use client';
import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { Container } from '@/components/primitives/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/utils/cn';
import { ILocationComponents, ISystemFields } from '@/lib/generated';
import { useGetEntriesByUids } from '@/lib/hooks/useEntryData';

import 'swiper/css';
import 'swiper/css/navigation';

import { Coach } from '../ui/Coach';
import { GlitchText } from '../primitives/GlitchText';

export const Coaches = ({ head_title, coaches, cta_1, cta_2 }: ILocationComponents['coaches']) => {
  const { data, loading } = useGetEntriesByUids({
    references: coaches as Array<ISystemFields>,
  });

  let slidesPerView = 1;
  if (coaches?.length === 1) {
    slidesPerView = 1;
  } else if (coaches?.length === 2) {
    slidesPerView = 2;
  } else if (coaches?.length && coaches?.length >= 3) {
    slidesPerView = 3;
  }
  return (
    <>
      <Container componentName="Coaches" tag="section">
        <div className={cn('flex flex-col gap-7')} id="coaches">
          {head_title && (
            <GlitchText
              tag="h2"
              className={cn(
                'flex justify-center text-[40px] md:text-[56px] tracking-[10px] uppercase glowingText orange font-semibold leading-[40px] md:leading-[84px]'
              )}
            >
              {head_title}
            </GlitchText>
          )}

          {/* Slider */}
          <div className="relative">
            <Swiper
              modules={[FreeMode, Autoplay, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              navigation={{
                enabled: true,
                nextEl: '.card-next',
                prevEl: '.card-prev',
              }}
              breakpoints={{
                640: { slidesPerView: Math.min(slidesPerView, 1) },
                768: { slidesPerView: Math.min(slidesPerView, 2) },
                1024: { slidesPerView: slidesPerView },
              }}
              className={cn(
                'w-full h-full',
                'px-0! xl:!px-2.5',
                slidesPerView === 1 && 'max-w-[410px]',
                slidesPerView === 2 && 'max-w-[820px]'
              )}
            >
              {!loading &&
                data?.map((coachData, ind) => {
                  return (
                    <SwiperSlide className="h-auto!">
                      <Coach key={ind} {...coachData.data}></Coach>
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            {/* Navigation Buttons */}
            {coaches?.length && coaches.length > slidesPerView ? (
              <>
                <div
                  className={cn(
                    'card-prev',
                    'swiper-button-prev',
                    '!left-3 xl:!-left-7',
                    '!text-white'
                  )}
                />
                <div
                  className={cn(
                    'card-next',
                    'swiper-button-next',
                    '!right-3 xl:!-right-7',
                    '!text-white'
                  )}
                />
              </>
            ) : null}
          </div>

          {/* CTA Buttons */}
          {(cta_1?.href || cta_2?.href) && (
            <div className={cn('flex justify-center')}>
              <div className="flex gap-6 w-full flex-wrap justify-center">
                {cta_1?.href && (
                  <Button
                    href={cta_1?.href}
                    className="px-6 py-3 text-light-black hover:text-orange-bright bg-orange-bright hover:bg-transparent border-orange-bright text-lg font-semibold tracking-[2px]"
                  >
                    {cta_1?.title}
                  </Button>
                )}

                {cta_2?.href && (
                  <Button
                    href={cta_2?.href}
                    className="px-6 py-3 text-white hover:text-light-black bg-transparent hover:bg-white border-white text-lg font-semibold tracking-[2px]"
                  >
                    {cta_2?.title}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
