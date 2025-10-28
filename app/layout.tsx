import React from 'react';
import './globals.css'; // Importing global CSS styles
import Script from 'next/script';
import { Rawson, SoftcoreBlack, MattySans, DeadStock } from './fonts';
import { Providers } from '@/providers';
import { fetchGlobalLabels } from '@/utils/fetch-global-labels';
import { Cookies } from '@/components/ui/Cookies';

// Enable static generation where possible
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// RootLayout component that wraps the entire application
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type definition for children prop
}>) {
  // Fetch the global labels (cached via React cache)
  const globalLabels = await fetchGlobalLabels();

  return (
    <html lang="en">
      {/* Setting the language attribute for the HTML document */}
      <head>
        {/* Preconnect to critical CDNs for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://brandedweb.mindbodyonline.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://widgets.mindbodyonline.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://static.zdassets.com" />
        {/* Preconnect to Contentstack CDN for faster image/asset loading */}
        <link rel="preconnect" href="https://images.contentstack.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://eu-images.contentstack.com" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=Rd9jc2__mEPrDDQMb2gqxQ&gtm_preview=env-280&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T3GJMLVZ');
            `,
          }}
          defer
        />

        <Script
          src="https://brandedweb.mindbodyonline.com/embed/widget.js"
          type="text/javascript"
          strategy="lazyOnload"
          defer
        />

        <Script
          src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
          type="text/javascript"
          strategy="lazyOnload"
          defer
        />

        {/* Optimized Font Awesome - preload for faster loading */}
        <link rel="preload" href="/font-awesome/all.css" as="style" />
        <link rel="stylesheet" href="/font-awesome/all.css" />
      </head>
      <Providers data={{ globalLabels: globalLabels ?? {} }}>
        <body
          className={`bg-light-black ${Rawson.variable} ${SoftcoreBlack.variable} ${MattySans.variable} ${DeadStock.variable} font-rawson`}
        >
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-T3GJMLVZ&gtm_auth=alddkJr_pnFrnZVRcMpFGA&gtm_preview=env-1&gtm_cookies_win=x"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* ✅ Zendesk Messaging Script */}
          <Script
            id="ze-snippet"
            src={`https://static.zdassets.com/ekr/snippet.js?key=${process.env.ZENDESK_KEY}`}
            strategy="lazyOnload" // ensures it loads after page is interactive
            defer
          />
          {children}
          <Cookies />
        </body>
      </Providers>
    </html>
  );
}
