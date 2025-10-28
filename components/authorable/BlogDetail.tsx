import React from 'react';
import { Container } from '@/components/primitives/Container';
import { IBlogDetailPage } from '@/lib/generated';
import { ComponentRenderer } from '../primitives/ComponentRenderer';
import { BlogDetailBanner } from '../ui/custom-banners/BlogDetailBanner';
import { BlogDetailBody } from '../ui/blog/BlogDetailBody';

export const BlogDetail = async ({
  title,
  blog_data,
  blog_detail_components,
  taxonomies,
}: IBlogDetailPage) => {
  return (
    <>
      <Container componentName="BlogDetail" fullScreen>
        <BlogDetailBanner title={title} blog_data={blog_data} />
        <BlogDetailBody blog_data={blog_data} taxonomies={taxonomies} />
      </Container>
      {/* Dynamic Render Modular Block Components */}
      <ComponentRenderer components={blog_detail_components} />
    </>
  );
};
