import { NextResponse } from 'next/server';
import { getEntries, setCurrentLanguage } from '@/lib/contentstack';
import { IPage } from '@/lib/generated';
import { toLocaleString } from '@/utils/date-utils';

// Cache the sitemap for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    // Set default language
    setCurrentLanguage('en-us');

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveirongolf.com';
    const urls: string[] = [];

    // Fetch dynamic pages from CMS
    try {
      const pages = await getEntries<IPage>({
        contentTypeUid: 'page',
      });

      if (pages?.entries) {
        pages.entries.forEach((page) => {
          if (page.url) {
            const urlElement = `<url>
      <loc>${escapeXml(`${baseUrl}${page.url}`)}</loc>
      <lastmod>${toLocaleString(page.updated_at || new Date().toISOString())}</lastmod>
    </url>`;
            urls.push(urlElement);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching pages for sitemap:', error);
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
    console.error('Error generating page sitemap:', error);
    return new NextResponse('Error generating page sitemap', { status: 500 });
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
