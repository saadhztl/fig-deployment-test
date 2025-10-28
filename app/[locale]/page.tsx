import { Metadata } from 'next';
import { IPage } from '@/lib/generated';
import { headers } from 'next/headers';
import { setCurrentLanguage, isLanguageSupported, getPage, stack } from '@/lib/contentstack';
import { SharedPageLayout } from '@/app/SharedPageLayout';

// Revalidate the page based on REVALIDATION_TIME environment variable (defaults to 3600 seconds)
export const revalidate = 3600;

interface SlugPageProps {
  params: Promise<{
    slug: Array<string>;
    locale: string;
  }>;
  searchParams: Promise<{
    live_preview: string;
    entry_uid: string;
    content_type_uid: string;
  }>;
}

/**
 * The `SlugPage` component handles all dynamic routes using catch-all routing.
 * It constructs the URL path from the slug parameters and fetches the corresponding
 * content from Contentstack.
 *
 * @component
 * @param {SlugPageProps} props - The component props containing the slug parameters
 * @returns {JSX.Element} The rendered component.
 */
export default async function SlugPage(props: SlugPageProps) {
  //#region Live Preview Settings
  // Need to await for headers to be available for live preview
  await headers();
  const { params, searchParams } = props;

  const { live_preview, entry_uid, content_type_uid } = await searchParams;

  if (live_preview) {
    stack.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid || '',
      entryUid: entry_uid || '',
    });
  }
  //#endregion

  // Resolve params and construct URL path
  const resolvedParams = await params;
  // Check if the first slug element is a language code and skip it
  const isLanguageParam = isLanguageSupported(resolvedParams?.locale);
  const language = isLanguageParam ? resolvedParams?.locale : 'en-us';

  // Set the language in the global language service for use across the app
  setCurrentLanguage(language);

  const urlPath = '/'; // Root path for locale page

  return <SharedPageLayout urlPath={urlPath} />;
}

export async function generateMetadata(props: SlugPageProps): Promise<Metadata> {
  const { params } = props;
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fiveirongolf.com';
  // Construct the same URL path as in the component
  const isLanguageParam = isLanguageSupported(resolvedParams?.locale);
  const language = isLanguageParam ? resolvedParams?.locale : 'en-us';

  setCurrentLanguage(language);
  const urlPath = `/`;

  try {
    const page = await getPage<IPage>(urlPath, 'page');

    return {
      title: page?.seo?.meta_title || 'Five Iron Golf',
      description: page?.seo?.meta_description || undefined,
      alternates: {
        canonical: `${baseUrl}${urlPath}`,
        languages: {
          'en-us': `${baseUrl}/en-us${urlPath}`,
        },
      },
      openGraph: {
        type: page?.seo?.open_graph?.type || 'website',
        title: page?.seo?.meta_title || 'Five Iron Golf',
        description: page?.seo?.meta_description || undefined,
        url: `${baseUrl}${urlPath}`,
        images: [
          {
            url: page?.seo?.open_graph?.image?.file?.url || '',
            width: page?.seo?.open_graph?.image?.image_width || undefined,
            height: page?.seo?.open_graph?.image?.image_height || undefined,
          },
        ],
      },
      robots: {
        index: page?.seo?.robots?.enable_search_indexing || false,
        'max-image-preview': page?.seo?.robots?.max_image_preview || 'standard',
      },
      icons: {
        icon: 'https://fiveirongolf.com/wp-content/uploads/2023/08/android-icon-96x96-1.png',
        apple: 'https://fiveirongolf.com/wp-content/uploads/2023/08/apple-icon-57x57-1.png',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Five Iron Golf',
    };
  }
}
