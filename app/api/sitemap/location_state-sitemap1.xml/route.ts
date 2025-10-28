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
    const states = new Set<{ name: string; updated_at: string | undefined }>();

    // Fetch location pages to extract states
    try {
      const locations = await getEntries<ILocationDetailPage>({
        contentTypeUid: 'location_detail_page',
      });

      if (locations?.entries) {
        locations.entries.forEach((location) => {
          if (location.location_states) {
            if (Array.isArray(location.location_states)) {
              location.location_states.forEach((state) => {
                if (typeof state === 'string') {
                  states.add({ name: state, updated_at: location.updated_at });
                }
              });
            } else if (typeof location.location_states === 'string') {
              states.add({ name: location.location_states, updated_at: location.updated_at });
            }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching locations for state sitemap:', error);
    }

    // Convert states to URL elements
    const urlElements = Array.from(states)
      .map((state) => {
        // Convert state name to URL-friendly format (lowercase, replace spaces with hyphens)
        const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');
        return `<url>
      <loc>${escapeXml(`${baseUrl}/locations/state/${stateSlug}`)}</loc>
      <lastmod>${toLocaleString(state.updated_at || new Date().toISOString())}</lastmod>
    </url>`;
      })
      .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating location state sitemap:', error);
    return new NextResponse('Error generating location state sitemap', { status: 500 });
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
