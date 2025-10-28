'use client';
import { cn } from '@/utils/cn';
import React from 'react';
import { LocationHeroModal } from '../../ui/modals/LocationHeroModal';
import { ILocationComponents } from '@/lib/generated';
import Image from 'next/image';
import { IExtendedProps } from '@/lib/types';
import { RichText } from '../../primitives/RichText';
import Link from 'next/link';
import { Container } from '../../primitives/Container';
import { Button } from '../../primitives/Button';
import { FAIcons } from '@/helpers/FAIcons';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';

export const LocationHeroBanner = ({
  banner_title,
  banner_sub_title,
  hero_image,
  rich_text_editor,
  address_location,
  address_zipcode,
  phone,
  email,
  sms,
  floor_plan,
  parking_info,
  styling_options,
  extendedProps,
}: ILocationComponents['location_hero_banner'] & IExtendedProps) => {
  const { globalLabels } = useGlobalLabels();

  return (
    <Container
      componentName="LocationHeroBanner"
      className={cn(
        'relative w-full hero-overlay before:!border-light before:bg-dark/50 mb-[60px]'
      )}
      bottomPadded={!extendedProps?.enable_coming_soon && !styling_options?.disable_bottom_spacing}
    >
      {hero_image?.image?.url && (
        <Image
          src={hero_image?.image?.url}
          alt={hero_image?.image_alt_text || 'Location Banner'}
          fill
          className="object-cover"
          quality={100}
          priority
          fetchPriority="high"
        />
      )}
      <div className={cn('h-full', 'w-full', 'z-10', 'relative')}>
        <div
          className={cn(
            'md:top-12',
            'left-0',
            'text-white',
            'w-full',
            'grid',
            'gap-5',
            `${styling_options?.spacing?.inline_padding} ${styling_options?.spacing?.block_padding}`
          )}
        >
          <div
            className={cn(
              'w-full',
              'grid',
              'lg:grid-cols-2',
              'gap-4',
              'lg:gap-5',
              'justify-between',
              'mb-8',
              'md:mb-12'
            )}
          >
            <div className="md:p-2.5 flex flex-col">
              {banner_title && (
                <h1
                  className={cn(
                    'text-white',
                    'text-4xl md:text-6xl lg:text-[80px]',
                    'leading-[normal]',
                    'uppercase',
                    '!font-semibold',
                    'tracking-[2px]',
                    'max-w-max',
                    '[&_span]:lowercase'
                  )}
                >
                  {banner_title}
                </h1>
              )}
              {banner_sub_title && (
                <h2
                  className={cn(
                    'text-white',
                    'text-3xl md:text-4xl lg:text-5xl',
                    'leading-[normal]',
                    '!font-semibold',
                    'uppercase',
                    'max-w-max',
                    'tracking-[2px]',
                    '[&_span]:lowercase'
                  )}
                >
                  {banner_sub_title}
                </h2>
              )}
            </div>
            <RichText
              content={rich_text_editor}
              className="lg:p-8 md:block hidden text-[17px] leading-[25.5px]"
            />
          </div>

          <div className="w-full">
            <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(address_location?.href || address_zipcode?.href) && (
                <li className="border-l-4 pl-2.5 md:pl-10 border-light flex flex-col gap-2.5 tracking-widest uppercase">
                  <div className="flex items-start gap-2">
                    <FAIcons iconCode="fas fa-location-dot" className="w-5 h-5 text-light mt-1.5" />
                    <div className="grow text-lg font-normal tracking-[1.4px] flex flex-col">
                      {address_location?.href && (
                        <Link href={address_location?.href} target="_blank">
                          {address_location?.title}
                        </Link>
                      )}
                      {address_zipcode?.href && (
                        <Link href={address_zipcode?.href} target="_blank">
                          {address_zipcode?.title}
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              )}
              {(phone || email || sms) && (
                <li className="border-l-4 pl-2.5 md:pl-10 border-light flex flex-col gap-2.5 tracking-widest uppercase">
                  {/* Phone Number */}
                  {phone && (
                    <div className="flex items-start gap-2">
                      <FAIcons iconCode="fas fa-phone" className="w-5 h-5 text-light mt-1.5" />
                      <div className="grow text-lg font-light">
                        <Link href={`tel:${phone}`}>{phone}</Link>
                      </div>
                    </div>
                  )}

                  {sms && (
                    <div className="flex items-start gap-2">
                      <FAIcons iconCode="fas fa-phone" className="w-5 h-5 text-light mt-1.5" />
                      <div className="grow text-lg font-light">{sms}</div>
                    </div>
                  )}

                  {/* Email */}
                  {email && (
                    <div className="flex items-start gap-2">
                      <FAIcons iconCode="fas fa-envelope" className="w-5 h-5 text-light mt-1.5" />

                      <div className="grow text-lg font-light break-all">
                        <Link href={`mailto:${email?.toLowerCase()}`}>{email}</Link>
                      </div>
                    </div>
                  )}
                </li>
              )}
              {(floor_plan?.enable_floorplan || parking_info?.enable_parking_info) && (
                <li className="border-l-4 pl-2.5 md:pl-10 border-light flex flex-col tracking-widest uppercase">
                  {parking_info?.enable_parking_info && (
                    <Button
                      href={`#free-parking`}
                      className="w-fit md:w-fit bg-light text-black hover:bg-white border-none px-[18px] py-[5px] text-lg font-semibold tracking-[2px]"
                    >
                      {parking_info?.parking_info_text}
                    </Button>
                  )}

                  {floor_plan?.enable_floorplan && (
                    <div className="flex items-center gap-2 py-2.5 border-light border-b-2 w-fit">
                      <FAIcons iconCode="fas fa-map" className="w-5 h-5 text-light mt-1.5" />

                      <div className="grow text-lg font-normal whitespace-pre">
                        <LocationHeroModal
                          floorPlanImage={floor_plan?.floor_plan_image}
                          modalTriggerText={globalLabels.floor_plan_label}
                        />
                      </div>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};
