const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.contentstack.io',
      },
      {
        protocol: 'https',
        hostname: '*-images.contentstack.com',
      },
      {
        protocol: 'https',
        hostname: 'fiveirongolf.com',
      },
    ],
    qualities: [25, 50, 75, 100],
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
    CONTENTSTACK_PREVIEW_TOKEN: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  // Performance optimizations
  experimental: {
    // Enable optimized package imports to reduce bundle size
    optimizePackageImports: [
      '@contentstack/delivery-sdk',
      'react-icons',
      '@fortawesome/react-fontawesome',
    ],
  },
  // Optimize compilation
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  // Enable compression
  compress: true,
  // Optimize power preference for better performance
  poweredByHeader: false,
  async rewrites() {
    // Sitemap configuration - centralized list of sitemap types
    const sitemapTypes = [
      'sitemap',
      'page-sitemap1',
      'post-sitemap1',
      'location-sitemap1',
      'event-sitemap1',
      'category-sitemap1',
      'location_state-sitemap1',
    ];

    // Generate sitemap rewrites dynamically
    const sitemapRewrites = sitemapTypes.map((type) => ({
      source: `/${type}.xml`,
      destination: `/api/sitemap/${type}.xml`,
    }));

    return [
      // Sitemap rewrites - map clean URLs to organized sitemaps API routes
      ...sitemapRewrites,
    ];
  },
};

export default nextConfig;
