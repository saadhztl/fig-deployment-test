'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { ILocationComponents } from '@/lib/generated';
import { useColorMapper } from '@/lib/hooks/useColorMapper';
import Image from 'next/image';
import { FAIcons } from '@/helpers/FAIcons';
import { Container } from '@/components/primitives/Container';
import { LocationPromoModal } from '@/components/ui/modals/LocationPromoModal';
import { SheetTable } from '@/components/ui/SheetTable';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';

export const ContactInformation = ({
  contact_background_image,
  adress_location,
  zip_code,
  google_charts_tab_name,
  url_map,
  show_parking_info,
  parking_address_free,
  day_1,
  hour_1,
  day_2,
  hour_2,
  day_3,
  hour_3,
  day_4,
  hour_4,
  day_5,
  hour_5,
  day_6,
  hour_6,
  horario_fm,
  horario_sunday_fm,
  styling_options,
}: ILocationComponents['contact_information']) => {
  const { borderColor, textColorHover } = useColorMapper();

  const { globalLabels } = useGlobalLabels();

  return (
    <Container
      componentName="ContactInformation"
      fullScreen
      className={'text-white uppercase p-0'}
      bottomPadded={!styling_options?.disable_bottom_spacing}
    >
      <div className={cn('relative w-full h-full flex flex-col', 'uppercase')}>
        {contact_background_image?.image?.url && (
          <Image
            src={contact_background_image.image.url}
            alt={contact_background_image.image_alt_text || 'Contact Information Background Image'}
            fill
            quality={100}
            className="object-cover"
          />
        )}
        <div className="w-full bg-black/70 h-full grow shrink-0 py-[62px] flex flex-col justify-center z-10 px-5">
          <div className="w-full h-full max-w-large-desktop mx-auto justify-center">
            <ul className="w-full flex flex-col md:flex-row">
              <li className="border-x-4 md:border-l-4 md:border-r-0 px-4 py-2 md:px-10 border-light flex text-lg flex-col gap-8 md:w-1/2">
                {url_map && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-[15px] md:gap-[30px]">
                      <FAIcons iconCode="fas fa-location-dot" className="w-5 h-5 text-light" />
                      <div className="grow flex flex-col gap-2">
                        <Link href={url_map?.href} className="flex flex-col gap-2">
                          <div className="font-bold text-xl leading-5 tracking-[1.4px]">
                            {adress_location}
                          </div>
                          <div className="text-xl leading-7 tracking-[1.4px]">{zip_code}</div>
                        </Link>
                        <div className="w-fit font-semibold">
                          {google_charts_tab_name && (
                            <LocationPromoModal
                              modalTriggerText="SIM RENTAL PRICING"
                              themeColor="cyan"
                              content={
                                <SheetTable
                                  variant="hours"
                                  sheetRange={google_charts_tab_name}
                                  sheetId={'1OCaKmSJ1s7QKfMt3qGmwJ5u_qWXFkprtA_aqe0buuk4'}
                                  sheetName="Hours of Operation"
                                />
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {show_parking_info && (
                  <div className="flex flex-col gap-5 text-lg">
                    <div className="flex items-start gap-[15px] md:gap-[30px]">
                      <FAIcons
                        iconCode="fas fa-square-parking"
                        className="w-5 h-5 text-light mt-1.5"
                      />
                      <div className="grow flex flex-col gap-2 tracking-widest">
                        <Link href={'#free-parking'}>
                          <div className="font-bold text-xl leading-5">
                            {globalLabels.parking_available_text}
                          </div>
                        </Link>
                        <div className="text-xl leading-7 ">{parking_address_free}</div>

                        <Link
                          href={'#free-parking'}
                          className={cn(
                            'cursor-pointer pb-1 text-base font-semibold leading-7 w-fit uppercase border-b',
                            borderColor('cyan'),
                            textColorHover('cyan')
                          )}
                        >
                          {globalLabels.see_map_text}
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="border-x-4 md:border-l-4 md:border-r-0 px-4 py-2 md:px-10 border-light flex flex-col gap-5 justify-between md:w-1/2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-[15px] md:gap-[30px]">
                    <FAIcons iconCode="fas fa-circle-info" className="w-5 h-5 text-light mt-1.5" />
                    <div className="grow w-full">
                      <h4 className="font-bold text-xl tracking-[1.4px]">
                        {globalLabels.hours_text}
                      </h4>
                    </div>
                  </div>
                  <ul className="w-full md:text-xl tracking-[1.4px] leading-4 md:leading-5">
                    <li className="flex items-start w-full justify-between  pb-2">
                      <span>{day_1}</span>
                      <span>{hour_1}</span>
                    </li>
                    <li className="flex items-start w-full justify-between  pb-2">
                      <span>{day_2}</span>
                      <span>{hour_2}</span>
                    </li>
                    <li className="flex items-start w-full justify-between  pb-2">
                      <span>{day_3}</span>
                      <span>{hour_3}</span>
                    </li>
                    <li className="flex items-start w-full justify-between  pb-2">
                      <span>{day_4}</span>
                      <span>{hour_4}</span>
                    </li>
                    <li className="flex items-start w-full justify-between  pb-2">
                      <span>{day_5}</span>
                      <span>{hour_5}</span>
                    </li>
                    <li className="flex items-start w-full justify-between  pb-2">
                      <span>{day_6}</span>
                      <span>{hour_6}</span>
                    </li>
                  </ul>
                </div>
                {(horario_fm || horario_sunday_fm) && (
                  <div className="flex flex-col">
                    {horario_fm && (
                      <div className="flex justify-between items-center flex-row gap-2 tracking-[1.4px] leading-5 md:text-xl font-bold">
                        <div className=" text-light">{globalLabels.membership_text}</div>
                        <div className="text-end">{horario_fm}</div>
                      </div>
                    )}
                    {horario_sunday_fm && (
                      <div className="flex justify-between items-center flex-row gap-2 tracking-[1.4px] leading-5 md:text-xl font-bold">
                        <div className=" text-light">{globalLabels.benefit_hours_text}</div>
                        <div className="text-end">{horario_sunday_fm}</div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};
