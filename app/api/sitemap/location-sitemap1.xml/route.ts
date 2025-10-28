import { NextResponse } from 'next/server';
import { getEntries, setCurrentLanguage } from '@/lib/contentstack';
import { ILocationDetailPage } from '@/lib/generated';
import { toLocaleString } from '@/utils/date-utils';

// Cache the sitemap for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    // Set default language
    setCurrentLanguage('en-us');

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveirongolf.com';
    const urls: string[] = [];

    // Fetch dynamic location pages
    try {
      const locations = await getEntries<ILocationDetailPage>({
        contentTypeUid: 'location_detail_page',
      });

      if (locations?.entries) {
        locations.entries.forEach((location) => {
          if (location.url) {
            const urlElement = `<url>
      <loc>${escapeXml(`${baseUrl}${location.url}`)}</loc>
      <lastmod>${toLocaleString(location.updated_at || new Date().toISOString())}</lastmod>
    </url>`;
            urls.push(urlElement);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching locations for sitemap:', error);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating location sitemap:', error);
    return new NextResponse('Error generating location sitemap', { status: 500 });
  }
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
