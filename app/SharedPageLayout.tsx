import React from 'react';
import { notFound } from 'next/navigation';
import { ComponentRenderer } from '@/components/primitives/ComponentRenderer';
import { ContentstackLivePreview } from '@/components/primitives/ContentstackLivePreview';
import {
  ILocationDetailPage,
  IPage,
  IBlogDetailPage,
  IPromosLandingPage,
  IEventsDetailPage,
  IEventsLandingPage,
  ILocationsLandingPage,
} from '@/lib/generated';
import { Footer } from '@/components/authorable/Footer';
import { Header } from '@/components/authorable/Header';
import { BlogDetail } from '@/components/authorable/BlogDetail';
import { fetchPageData } from '@/lib/page-data';
import { PageViewTracker } from '@/components/primitives/PageViewTracker';

interface SharedPageLayoutProps {
  urlPath: string;
  children?: React.ReactNode;
  pageContentTypeUID?: string;
}

/**
 * Shared page layout component that handles common page rendering logic.
 * Fetches page data and header, then renders the page with header and tracking script.
 *
 * @component
 * @param {SharedPageLayoutProps} props - The component props containing the URL path
 * @returns {JSX.Element} The rendered component.
 */
export async function SharedPageLayout({
  urlPath,
  children,
  pageContentTypeUID = 'page',
}: SharedPageLayoutProps) {
  // Fetch page data using shared function
  let page:
    | IPage
    | ILocationDetailPage
    | IBlogDetailPage
    | IPromosLandingPage
    | IEventsLandingPage
    | IEventsDetailPage
    | ILocationsLandingPage
    | undefined;
  let header, footer;

  try {
    const pageData = await fetchPageData(urlPath, pageContentTypeUID);
    page = pageData.page;
    header = pageData.header;
    footer = pageData.footer;
  } catch (error) {
    console.error('Error fetching page:', error);
    notFound();
  }

  // If no page found, fetch 404 page from CMS
  if (!page) {
    const pageData = await fetchPageData('/404', 'page');
    page = pageData.page;
  }

  const pageTypeMapping = {
    page: () => {
      const { components, ...rest } = page as IPage;
      return <ComponentRenderer components={components} extendedProps={rest} />;
    },

    location_detail_page: () => {
      const { location_components, ...rest } = page as ILocationDetailPage;
      return <ComponentRenderer components={location_components} extendedProps={rest} />;
    },

    blog_detail_page: () => <BlogDetail {...(page as IBlogDetailPage)} />,

    promos_landing_page: () => {
      const { promos_components, ...rest } = page as IPromosLandingPage;
      return <ComponentRenderer components={promos_components} extendedProps={rest} />;
    },

    events_landing_page: () => {
      const { events_landing_components, ...rest } = page as IEventsLandingPage;
      return <ComponentRenderer components={events_landing_components} extendedProps={rest} />;
    },

    events_detail_page: () => {
      const { events_detail_components, ...rest } = page as IEventsDetailPage;
      return <ComponentRenderer components={events_detail_components} extendedProps={rest} />;
    },

    locations_landing_page: () => (
      <ComponentRenderer
        components={(page as ILocationsLandingPage).locations_landing_components}
      />
    ),
  };
  return (
    <>
      <PageViewTracker />
      {header && <Header {...header} />}
      <main className="mx-auto main-content-node transition-transform duration-500 ease-out">
        {children ??
          (() => {
            return pageTypeMapping[pageContentTypeUID as keyof typeof pageTypeMapping]();
          })()}
        <ContentstackLivePreview />
      </main>
      {footer && <Footer {...footer}></Footer>}
    </>
  );
}
