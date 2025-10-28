'use client';

import React, { useState, useCallback, useRef } from 'react';
import { IHeader } from '@/lib/generated';
import SvgIcon from '@/helpers/SvgIcon';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { FAIcons } from '@/helpers/FAIcons';
import { cn } from '@/utils/cn';
import { useCurrentScreenType, getBreakpoint } from '@/lib/hooks/useScreenType';
import { ShowcaseNavigation } from '@/components/ui/header/ShowcaseNavigation';
import { UtilityNavigation } from '@/components/ui/header/UtilityNavigation';
import { MainMenuNavigation } from '@/components/ui/header/MainMenuNavigation';
import { RichText } from '../primitives/RichText';
import Script from 'next/script';

export const Header = (props: IHeader) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const { screenType } = useCurrentScreenType();
  const isDesktopLg = getBreakpoint(screenType || 'desktop-lg') >= getBreakpoint('desktop-lg');
  const advertisementStripRef = useRef<HTMLDivElement>(null);
  const handleToggle = useCallback(() => {
    if (modalOpen) {
      setModalOpen(false);
      setTimeout(() => setShowPanel(false), 1000);
    } else {
      setShowPanel(true);
      setModalOpen(true);
    }
  }, [modalOpen]);

  const {
    site_logo_details,
    activate_advertisement_strip,
    advertisement_strip,
    book_now_link,
    menu_close_button_text,
    menu_close_button_icon_code,
    main_navigation,
    main_navigation_image,
    follow_us_text,
    social_media,
    utility_navigation,
    showcase_navigation,
  } = props;
  return (
    <header
      style={{
        paddingBlock:
          advertisementStripRef.current?.offsetHeight && activate_advertisement_strip
            ? `${(advertisementStripRef.current?.offsetHeight + 80) / 2}px`
            : '40px',
      }}
    >
      <div className={cn('fixed top-0 z-50 w-full', 'flex flex-col')}>
        {activate_advertisement_strip && (
          <div
            className="flex justify-between items-center w-full bg-light uppercase"
            ref={advertisementStripRef}
          >
            <RichText
              content={advertisement_strip?.advertisement_content}
              tag="h3"
              parentClassName="advertisement-strip-richtext"
              className="font-bold text-lg text-light-black leading-6 w-full text-center py-2.5 tracking-[2px]"
            />
          </div>
        )}
        <div className={cn('bg-light-black  w-full', 'px-2.5 md:px-5')}>
          <div className={cn('flex justify-between items-center')}>
            {/* Logo & Showcase Links*/}
            <div className={cn('flex items-center gap-12')}>
              {site_logo_details?.site_logo?.image?.url && (
                <Link href="/" className="cursor-pointer" title="5iron">
                  <Image
                    src={site_logo_details.site_logo.image.url}
                    alt={site_logo_details.site_logo.image_alt_text || 'Logo Alt Text'}
                    width={50}
                    height={50}
                    quality={100}
                  />
                </Link>
              )}
              {isDesktopLg && (
                <ShowcaseNavigation showcase_navigation={showcase_navigation} isDesktop />
              )}
            </div>

            {/* Right Side - Book Now & Menu */}
            <div className={cn('text-white flex text-2xl')}>
              {book_now_link?.link?.href && (
                <div
                  className={cn(
                    'px-5 py-4 hidden md:flex',
                    'hover:text-light cursor-pointer',
                    'items-center align-bottom font-semibold text-[22px] leading-8 tracking-[2px] uppercase'
                  )}
                >
                  <Link href={book_now_link.link.href}>{book_now_link.link.title}</Link>
                </div>
              )}

              <div
                className={cn(
                  'p-5 pe-0 border-l-2 border-l-light',
                  'hover:text-light cursor-pointer'
                )}
                onClick={handleToggle}
              >
                <SvgIcon
                  className={cn('w-10 h-10 fill-current', 'hover:text-light text-white')}
                  icon="hamburger"
                  viewBox="0 0 448 512"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          {showPanel && (
            <div
              className={cn('fixed inset-0 bg-[#000000cc] z-50', 'flex items-start justify-center')}
            >
              <div
                className={clsx(
                  'bg-light-black rounded shadow-lg pb-7 absolute w-full h-full text-white overflow-auto transition-all duration-1000 ease-in',
                  modalOpen ? 'slideIn' : '-translate-y-full'
                )}
              >
                <div className={cn('flex m-2.5 flex-col items-center', 'gap-2.5 md:gap-5')}>
                  {/* Header Section */}
                  <div
                    className={cn(
                      'flex p-2.5 py-3 justify-between items-center w-full',
                      'max-w-max-content'
                    )}
                  >
                    <Link
                      href="/"
                      className={cn('flex items-center gap-2.5 p-2.5', 'cursor-pointer')}
                    >
                      {site_logo_details?.menu_logo?.image?.url && (
                        <Image
                          src={site_logo_details.menu_logo.image.url}
                          alt={site_logo_details.menu_logo.image_alt_text || 'Logo Alt Text'}
                          width={300}
                          height={40}
                          className="hidden md:block"
                          quality={100}
                        />
                      )}
                      {site_logo_details?.site_logo?.image?.url && (
                        <Image
                          src={site_logo_details.site_logo.image.url}
                          alt={site_logo_details.site_logo.image_alt_text || 'Logo Alt Text'}
                          width={50}
                          height={50}
                          className="block md:hidden"
                          quality={100}
                        />
                      )}
                    </Link>

                    <div
                      className={cn(
                        'group hover:text-light text-xl leading-[22px] font-semibold cursor-pointer tracking-[2px]',
                        'p-2.5 flex gap-5 items-center uppercase'
                      )}
                      onClick={handleToggle}
                    >
                      <span>{menu_close_button_text}</span>
                      <span>
                        <FAIcons iconCode={menu_close_button_icon_code} />
                      </span>
                    </div>
                  </div>

                  {/* Menu Columns */}
                  <div
                    className={cn(
                      'border-t-2 border-light md:border-white w-full pt-10',
                      'flex justify-center'
                    )}
                  >
                    <div
                      className={cn(
                        'w-full max-w-max-content p-2.5',
                        'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 uppercase'
                      )}
                    >
                      {/* Showcase Navigation */}
                      {!isDesktopLg && (
                        <ShowcaseNavigation
                          showcase_navigation={showcase_navigation}
                          isDesktop={false}
                        />
                      )}

                      {/* Main Menu Navigation */}
                      <MainMenuNavigation main_navigation={main_navigation} />

                      {/* Image Column */}
                      {main_navigation_image?.image?.url && (
                        <div className={cn('flex flex-col gap-5 h-full', 'mt-5')}>
                          <Image
                            src={main_navigation_image.image.url}
                            alt={main_navigation_image.image_alt_text || 'Menu Image Alt Text'}
                            width={303}
                            height={200}
                            className="border-b-light border-b-4 w-full h-auto max-w-[340px]"
                            quality={100}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div
                    className={cn(
                      'flex flex-col gap-3 md:flex-row md:gap-0 w-full',
                      'max-w-max-content'
                    )}
                  >
                    {/* Follow Us */}
                    <div className="flex-1 px-2.5">
                      <div
                        className={cn(
                          'flex py-2.5 gap-5',
                          'text-xl leading-[30px] tracking-widest'
                        )}
                      >
                        <span>{follow_us_text}</span>
                        <div className={cn('flex gap-x-5 gap-y-2.5', 'items-center')}>
                          {social_media?.social_media_accounts?.map(
                            (account, index) =>
                              account.link?.href && (
                                <Link
                                  key={`social-${index}`}
                                  href={account.link.href}
                                  className={cn(
                                    'elementHover-transition text-light',
                                    'hover:text-white'
                                  )}
                                  target={account.open_in_new_window ? '_blank' : '_self'}
                                >
                                  <FAIcons iconCode={account.font_awesome_icon_code} />
                                </Link>
                              )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Utility Navigation */}
                    <UtilityNavigation utility_navigation={utility_navigation} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Script id="lytics-tracking" strategy="afterInteractive">
        {`
 !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
   // Define config and initialize Lytics tracking tag.
   // - The setup below will disable the automatic sending of Page Analysis Information (to prevent duplicative sends, as this same information will be included in the jstag.pageView() call below, by default)
   jstag.init({
     src: 'https://c.lytics.io/api/tag/28cee181d572bebf51414a29fb3a82b7/latest.min.js'
   });

     // You may need to send a page view, depending on your use-case
     jstag.pageView();
`}
      </Script>
    </header>
  );
};

export default Header;
