import { NextResponse } from 'next/server';
import { getEntries, setCurrentLanguage } from '@/lib/contentstack';
import { IBlogDetailPage, ITaxonomyEntry } from '@/lib/generated';
import { toLocaleString } from '@/utils/date-utils';

// Cache the sitemap for 1 hour
export const revalidate = 3600;

export async function GET() {
  try {
    // Set default language
    setCurrentLanguage('en-us');

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fiveirongolf.com';
    const categories = new Set<{ term_uid: string; updated_at: string | undefined }>();

    // Fetch blog posts to extract categories from taxonomies
    try {
      const blogPosts = await getEntries<IBlogDetailPage>({
        contentTypeUid: 'blog_detail_page',
      });

      if (blogPosts?.entries) {
        blogPosts.entries.forEach((post) => {
          if (post.taxonomies && Array.isArray(post.taxonomies)) {
            post.taxonomies.forEach((taxonomy: ITaxonomyEntry) => {
              if (taxonomy.term_uid) {
                categories.add({ term_uid: taxonomy.term_uid, updated_at: post.updated_at });
              }
            });
          }
        });
      }
    } catch (error) {
      console.error('Error fetching blog posts for category sitemap:', error);
    }

    // Convert categories to URL elements
    const urlElements = Array.from(categories)
      .map((category) => {
        return `<url>
      <loc>${escapeXml(`${baseUrl}/category/${category.term_uid}`)}</loc>
      <lastmod>${toLocaleString(category?.updated_at || new Date().toISOString())}</lastmod>
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
    console.error('Error generating category sitemap:', error);
    return new NextResponse('Error generating category sitemap', { status: 500 });
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
