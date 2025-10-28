import { NextResponse } from 'next/server';

// Cache the sitemap index for 1 hour
export const revalidate = 3600;

// Main sitemap index that references all grouped sitemaps
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveirongolf.com';

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/post-sitemap1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/location-sitemap1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/event-sitemap1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/category-sitemap1.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/location_state-sitemap1.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
