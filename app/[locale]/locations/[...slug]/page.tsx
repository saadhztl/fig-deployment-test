import { SharedPageLayout } from '@/app/SharedPageLayout';
import { getPage, isLanguageSupported, setCurrentLanguage } from '@/lib/contentstack';
import { ILocationDetailPage } from '@/lib/generated';
import { Metadata } from 'next';

// Revalidate the page based on REVALIDATION_TIME environment variable (defaults to 3600 seconds)
export const revalidate = 3600;

interface SlugPageProps {
  params: Promise<{
    slug: string[];
    locale: string;
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
  const { params } = props;
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0];

  // const locationData = locationsProps.locations.filter((l) => l.url.includes(slug))[0];

  const urlPath = `/locations/${slug}`;

  /*
  Changed the shared layout component to handle the different detail pages (different UID than Page but acts same as a Page). It now dynamically renders the correct components configured in Contentstack.
  */
  return <SharedPageLayout urlPath={urlPath} pageContentTypeUID="location_detail_page" />;
}

export async function generateMetadata(props: SlugPageProps): Promise<Metadata> {
  const { params } = props;
  const resolvedParams = await params;
  const slug = resolvedParams.slug[0];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fiveirongolf.com';
  // Construct the same URL path as in the component
  const isLanguageParam = isLanguageSupported(resolvedParams?.locale);
  const language = isLanguageParam ? resolvedParams?.locale : 'en-us';

  setCurrentLanguage(language);
  const urlPath = `/locations/${slug}`;

  try {
    const page = await getPage<ILocationDetailPage>(urlPath, 'location_detail_page');

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
