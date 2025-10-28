import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import Link from 'next/link';
import { IFooter } from '@/lib/generated';
import { FAIcons } from '@/helpers/FAIcons';
import { cn } from '@/utils/cn';
import { MainNavigation } from '@/components/ui/footer/MainNavigation';
import { StylingOptions } from '@/lib/types';
import { SubscribeForm } from '@/components/ui/forms/SubscribeForm';

export const Footer = (props: IFooter) => {
  const {
    site_logo_details,
    site_name,
    site_tagline,
    social_media,
    footer_navigation,
    contact_column_title,
    footer_email,
    footer_call,
    copyright_text,
    subscribe_form,
  } = props;

  const defaultLogo = 'https://fiveirongolf.com/wp-content/uploads/2024/05/5i-isotype-1white-1.svg';

  return (
    <footer className="flex flex-col">
      <Container componentName="NewsLetter" className="bg-light" bottomPadded={false}>
        <SubscribeForm {...subscribe_form} />
      </Container>
      <Container
        componentName="Footer"
        topPadded={false}
        bottomPadded={false}
        className="bg-light-black w-full text-white"
        tag="div"
      >
        <div className={cn('py-10', 'flex flex-col md:flex-row justify-between')}>
          {/* Logo and Social Media Section */}
          <div className={cn('flex', 'flex-col gap-2.5')}>
            <Link href="/" className="cursor-pointer">
              <Image
                src={site_logo_details?.site_logo?.image?.url || defaultLogo}
                alt={site_logo_details?.site_logo?.image_alt_text || 'Footer Logo'}
                width={50}
                height={50}
                quality={100}
              />
            </Link>
            <p className="font-extrabold text-lg">{site_name}</p>
            <p className="pb-5">{site_tagline}</p>

            <div className="flex gap-5">
              {social_media?.social_media_accounts?.map((account, index) => (
                <Link
                  key={index}
                  href={account.link?.href || ''}
                  target={account.open_in_new_window ? '_blank' : '_self'}
                  className={cn(
                    'elementHover-transition cursor-pointer text-white',
                    'hover:text-blue-sky'
                  )}
                  aria-label="Social Media Link"
                >
                  <FAIcons iconCode={account.font_awesome_icon_code} className="text-2xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links Section */}
          <MainNavigation footer_navigation={footer_navigation} />

          {/* Contact Section */}
          <div
            className={cn(
              'pt-7 md:ps-14',
              'mt-4 md:m-0',
              'border-t border-t-white',
              'md:border-l md:border-s-white md:border-t-0'
            )}
          >
            <div className={cn('flex flex-col', 'gap-5')}>
              <p className="font-bold text-lg leading-3.5 pb-2.5">{contact_column_title}</p>
              <div className={cn('flex md:flex-col flex-wrap', 'gap-5')}>
                <Button
                  className={cn(
                    'flex gap-2.5 justify-between',
                    'md:gap-5 md:flex-row-reverse items-center',
                    'px-8 py-2 md:px-6 md:py-1',
                    'font-semibold w-fit'
                  )}
                  href={footer_email?.link?.href}
                  styling_options={footer_email?.styling_options as StylingOptions}
                >
                  <FAIcons
                    iconCode={footer_email?.font_awesome_icon_code}
                    className="text-blue-sky"
                  />
                  <span>{footer_email?.link?.title}</span>
                </Button>

                <Button
                  className={cn(
                    'flex gap-2.5 md:gap-5 justify-between',
                    'md:flex-row-reverse items-center',
                    'px-8 py-2 md:px-6 md:py-1',
                    'font-semibold w-fit'
                  )}
                  href={footer_call?.link?.href}
                  styling_options={footer_call?.styling_options as StylingOptions}
                >
                  <FAIcons
                    iconCode={footer_call?.font_awesome_icon_code}
                    className="text-blue-sky"
                  />
                  <span>{footer_call?.link?.title}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="px-5 py-2.5 text-center bg-white">{copyright_text}</div>
    </footer>
  );
};

export default Footer;
