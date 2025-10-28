import localFont from 'next/font/local';

export const Rawson = localFont({
  src: [
    {
      path: '../public/fonts/Rawson Complete Family/Rawson Complete Family/Desktop Fonts/OTF/Rawson/Rawson-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rawson Complete Family/Rawson Complete Family/Desktop Fonts/OTF/Rawson/Rawson-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rawson Complete Family/Rawson Complete Family/Desktop Fonts/OTF/Rawson/Rawson-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rawson Complete Family/Rawson Complete Family/Desktop Fonts/OTF/Rawson/Rawson-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rawson Complete Family/Rawson Complete Family/Desktop Fonts/OTF/Rawson/Rawson-ExtraBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Rawson Complete Family/Rawson Complete Family/Desktop Fonts/OTF/Rawson/Rawson-Black.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-rawson',
  fallback: ['sans-serif'],
  display: 'swap',
});

export const SoftcoreBlack = localFont({
  src: '../public/fonts/Soft Core/Softcore-Black.woff2',
  variable: '--font-softcore-black',
  fallback: ['sans-serif'],
  display: 'swap',
});

export const MattySans = localFont({
  src: '../public/fonts/Matty Sans/MattySans-Regular.otf',
  variable: '--font-matty-sans',
  fallback: ['sans-serif'],
  display: 'swap',
});

export const DeadStock = localFont({
  src: '../public/fonts/Dead Stock/Font/Dead Stock.ttf',
  display: 'swap',
  variable: '--font-dead-stock',
  fallback: ['sans-serif'],
});
