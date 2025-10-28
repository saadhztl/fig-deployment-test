import { NextResponse } from 'next/server';
import { getEntries, setCurrentLanguage } from '@/lib/contentstack';
import { IEventsDetailPage } from '@/lib/generated';
import { toLocaleString } from '@/utils/date-utils';

// Cache the sitemap for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    // Set default language
    setCurrentLanguage('en-us');

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveirongolf.com';
    const urls: string[] = [];

    // Fetch dynamic event pages
    try {
      const events = await getEntries<IEventsDetailPage>({
        contentTypeUid: 'events_detail_page',
      });

      if (events?.entries) {
        events.entries.forEach((event) => {
          if (event.url) {
            const urlElement = `<url>
      <loc>${escapeXml(`${baseUrl}${event.url}`)}</loc>
      <lastmod>${toLocaleString(event.updated_at || new Date().toISOString())}</lastmod>
    </url>`;
            urls.push(urlElement);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching events for sitemap:', error);
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
    console.error('Error generating event sitemap:', error);
    return new NextResponse('Error generating event sitemap', { status: 500 });
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
