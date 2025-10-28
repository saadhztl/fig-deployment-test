import React from 'react';
import Image from 'next/image';
import { Container } from '../../primitives/Container';
import { ILocationComponents, ISystemFields } from '@/lib/generated';
import { RichText } from '../../primitives/RichText';
// import { Button } from '../primitives/Button';
import { cn } from '@/utils/cn';
import { ReferencePlaceholder } from '@/components/primitives/ReferencePlaceholder';
import { Button } from '@/components/primitives/Button';
import { StylingOptions } from '@/lib/types';
import { FAIcons } from '@/helpers/FAIcons';
import { IExtendedProps } from '@/lib/types';

export const MembershipSection = ({
  enable_membership_section,
  section_background_image,
  founding_member,
  membership_perks,
  location_membership_form,
  buttons_founding_member,
  extendedProps,
}: ILocationComponents['membership_section'] & IExtendedProps) => {
  return (
    enable_membership_section && (
      <Container
        componentName="MembershipSection"
        fullScreen
        className={cn(
          'w-full relative',
          'border-b-1 border-white',
          'before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-dark/70 before:z-10'
        )}
      >
        {section_background_image?.image?.url && (
          <Image
            src={section_background_image.image.url}
            alt={section_background_image.image_alt_text || 'Signup Background Image'}
            fill
            className="object-cover"
            quality={100}
          />
        )}
        <div className={cn('relative z-10 max-w-screen-large-desktop mx-auto')}>
          <div className="flex flex-col">
            <div className="w-full h-full  grow shrink-0 flex flex-col gap-8 justify-center py-10 md:py-20">
              <div className="w-full flex flex-col gap-5 uppercase tracking-widest">
                <h2 className="text-light text-shadow-light text-shadow-lg/30 text-[44px] md:text-7xl font-semibold">
                  {founding_member?.title_founding_member_box}
                </h2>
                <h3 className="text-white text-shadow-light text-shadow-lg/30 text-[28px] md:text-[64px] font-semibold">
                  {founding_member?.subtitle_founding_member_box}
                </h3>
              </div>
              <div className="w-full ">
                <div className="grid lg:grid-cols-2 gap-5">
                  <div className="col-span-1 flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                      {founding_member?.founding_member_description && (
                        <RichText
                          content={founding_member?.founding_member_description}
                          className="text-lg text-white"
                        />
                      )}

                      {founding_member?.no_initiation_fee && (
                        <RichText
                          content={founding_member?.no_initiation_fee}
                          className="text-lg text-white"
                        />
                      )}
                    </div>

                    {membership_perks?.length && membership_perks.length > 0 && (
                      <ul className="w-full flex flex-col gap-5 text-white">
                        {membership_perks?.map((perk, index) => {
                          return (
                            <li key={index} className="flex items-center gap-5">
                              <Image
                                src={perk.member_item_image?.image?.url || ''}
                                alt={perk.member_item_image?.image_alt_text || ''}
                                width={40}
                                height={40}
                                quality={100}
                              />
                              <span>
                                <h4 className="text-2xl leading-8 font-semibold">
                                  {perk.member_item_title}
                                </h4>
                                <p className="text-xl leading-8">{perk.member_item_text}</p>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {(buttons_founding_member?.member_cta_1?.link?.href ||
                      buttons_founding_member?.member_cta_2?.link?.href) && (
                      <div className="flex gap-5 flex-col flex-wrap lg:flex-row">
                        {buttons_founding_member.member_cta_1?.link?.href && (
                          <Button
                            href={buttons_founding_member.member_cta_1.link.href}
                            styling_options={
                              buttons_founding_member.member_cta_1.styling_options as StylingOptions
                            }
                            target={
                              buttons_founding_member.member_cta_1.open_in_new_window
                                ? '_blank'
                                : '_self'
                            }
                            className="font-semibold px-6 py-3 flex gap-2.5 justify-center items-center text-lg"
                          >
                            {buttons_founding_member.member_cta_1.link.title}

                            {buttons_founding_member.member_cta_1.font_awesome_icon_code && (
                              <FAIcons
                                iconCode={
                                  buttons_founding_member.member_cta_1.font_awesome_icon_code
                                }
                              />
                            )}
                          </Button>
                        )}
                        {buttons_founding_member.member_cta_2?.link?.href && (
                          <Button
                            href={buttons_founding_member.member_cta_2.link.href}
                            styling_options={
                              buttons_founding_member.member_cta_2.styling_options as StylingOptions
                            }
                            target={
                              buttons_founding_member.member_cta_2.open_in_new_window
                                ? '_blank'
                                : '_self'
                            }
                            className="font-semibold px-6 py-3 flex gap-2.5 justify-center items-center text-lg"
                          >
                            {buttons_founding_member.member_cta_2.link.title}

                            {buttons_founding_member.member_cta_2.font_awesome_icon_code && (
                              <FAIcons
                                iconCode={
                                  buttons_founding_member.member_cta_2.font_awesome_icon_code
                                }
                              />
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 flex flex-col gap-5">
                    <div className="flex gap-5 self-center lg:self-end items-center">
                      <p className="font-semibold text-2xl leading-9 text-crimson-red line-through">
                        {founding_member?.founding_member_monthly_value}
                      </p>
                      <p className="font-extrabold text-3xl leading-12 text-light">
                        {founding_member?.founding_member_fm_offer}
                      </p>
                    </div>
                    {/* Location membership form */}
                    <ReferencePlaceholder
                      references={location_membership_form as Array<ISystemFields>}
                      extendedProps={extendedProps}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  );
};
