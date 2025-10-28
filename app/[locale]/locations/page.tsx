import { setCurrentLanguage, isLanguageSupported, getPage } from '@/lib/contentstack';
import { SharedPageLayout } from '@/app/SharedPageLayout';
import { Metadata } from 'next';
import { ILocationsLandingPage } from '@/lib/generated';

// Revalidate the page based on REVALIDATION_TIME environment variable (defaults to 3600 seconds)
export const revalidate = 3600;

interface LocationsPageProps {
  params: Promise<{
    slug: Array<string>;
    locale: string;
  }>;
}

export default async function SlugPage(props: LocationsPageProps) {
  const { params } = props;

  // Resolve params and construct URL path
  const resolvedParams = await params;
  // Check if the first slug element is a language code and skip it
  const isLanguageParam = isLanguageSupported(resolvedParams?.locale);
  const language = isLanguageParam ? resolvedParams?.locale : 'en-us';

  // Set the language in the global language service for use across the app
  setCurrentLanguage(language);

  const urlPath = '/locations'; // Root path for locale page

  return (
    <SharedPageLayout
      urlPath={urlPath}
      pageContentTypeUID="locations_landing_page"
    ></SharedPageLayout>
  );
}

export async function generateMetadata(props: LocationsPageProps): Promise<Metadata> {
  const { params } = props;
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fiveirongolf.com';
  // Construct the same URL path as in the component
  const isLanguageParam = isLanguageSupported(resolvedParams?.locale);
  const language = isLanguageParam ? resolvedParams?.locale : 'en-us';

  setCurrentLanguage(language);
  const urlPath = `/locations`;

  try {
    const page = await getPage<ILocationsLandingPage>(urlPath, 'locations_landing_page');

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
