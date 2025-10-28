'use client';
import { RichText } from '@/components/primitives/RichText';
import { cn } from '@/utils/cn';
import React, { useEffect, useState } from 'react';
import { BlogDetailContentBanner } from '../custom-banners/BlogDetailContentBanner';
import Image from 'next/image';
import { FAIcons } from '@/helpers/FAIcons';
import Link from 'next/link';
import { IBlogDetailPage, ITaxonomyEntry } from '@/lib/generated';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';

export const BlogDetailBody = ({ blog_data, taxonomies }: Partial<IBlogDetailPage>) => {
  const [blogUrl, setBlogUrl] = useState<string>('');
  const [blogPageTitle, setBlogPageTitle] = useState<string>('');
  const [shareText, setShareText] = useState<string>('');
  const [blogSummary, setBlogSummary] = useState<string>('');
  const { globalLabels } = useGlobalLabels();

  useEffect(() => {
    setBlogUrl(window.location.href);
    setBlogPageTitle(document.title);
    setShareText('');
    setBlogSummary('');
  }, []);

  return (
    <div className={cn('max-w-large-desktop mx-auto', 'pt-10', 'lg:pt-20')}>
      {/* <Container tag="div" topPadded={false} bottomPadded={true}> */}
      <div className={cn('w-full', 'grid', 'gap-5', 'lg:grid-cols-3', 'items-start')}>
        <div className={cn('lg:col-span-2', 'p-2.5', 'flex', 'flex-col', 'gap-5')}>
          <RichText className={cn('text-white')} content={blog_data?.content} />

          {/* Content Banner */}
          {blog_data?.content_banner?.enable_content_banner && (
            <BlogDetailContentBanner blog_data={blog_data} />
          )}

          <RichText className={cn('text-white')} content={blog_data?.content_part_2} />
        </div>
        <div
          className={cn(
            'lg:col-span-1',
            'flex',
            'flex-col',
            'gap-4',
            'sticky',
            'top-20',
            'self-start'
          )}
        >
          <div className={cn('relative', 'w-full', 'h-64')}>
            <Image
              src={blog_data?.featured_image?.image?.url || ''}
              alt={blog_data?.featured_image?.image_alt_text || ''}
              fill
              className="object-cover"
              quality={100}
            />
          </div>
          <div
            className={cn(
              'py-1',
              'px-2',
              'border',
              'text-base',
              'font-light',
              'border-light',
              'text-light',
              'uppercase',
              'w-full',
              'flex',
              'justify-center',
              'items-center'
            )}
          >
            {(taxonomies as ITaxonomyEntry[])?.map((t: ITaxonomyEntry, index, arr) => {
              return (
                <div key={t.term_uid} className="inline-block  py-2">
                  {t.term_uid.replace(/_/g, ' ')}
                  {index !== arr.length - 1 ? <span className="px-2">|</span> : ''}
                </div>
              );
            })}
          </div>

          {/* Author Details */}
          <div
            className={cn(
              'flex',
              'flex-col',
              'gap-3',
              'items-center',
              'p-6',
              'border-2',
              'border-light'
            )}
          >
            <span className={cn('max-w-24')}>
              {blog_data?.author_details?.author_image?.image?.url && (
                <Image
                  alt={blog_data?.author_details?.author_image?.image_alt_text || 'author_name'}
                  width={176}
                  height={170}
                  src={blog_data?.author_details?.author_image?.image?.url}
                  quality={100}
                />
              )}
            </span>
            <span className={cn('text-light', 'text-lg')}>
              {blog_data?.author_details?.author_name}
            </span>
          </div>

          <div
            className={cn('flex', 'flex-col', 'gap-3', 'items-center', 'px-6', 'py-8', 'bg-light')}
          >
            <h3 className={cn('text-xl', 'font-semibold', 'uppercase')}>
              {globalLabels?.share_this_post_text}
            </h3>
            <ul className={cn('flex', 'w-full', 'text-black', 'gap-5', 'justify-center')}>
              <Link href={`https://www.facebook.com/sharer.php?u=${blogUrl}`} target="_blank">
                <li className="cursor-pointer">
                  <FAIcons iconCode={'fab fa-facebook'} className="text-3xl" />
                </li>
              </Link>
              <Link
                href={`https://x.com/intent/tweet?text=${shareText} ${blogUrl}`}
                target="_blank"
              >
                <li className="cursor-pointer">
                  <FAIcons iconCode={'fab fa-x-twitter'} className="text-3xl" />
                </li>
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${blogUrl}&title=${
                  blogPageTitle || ''
                }&summary=${blogSummary || ''}&source=${blogUrl}`}
                target="_blank"
              >
                <li className="cursor-pointer">
                  <FAIcons iconCode={'fab fa-linkedin'} className="text-3xl" />
                </li>
              </Link>
              <Link
                href={`https://www.pinterest.com/pin/create/button/?url=${blogUrl}&media=${
                  blog_data?.featured_image?.image?.url || ''
                }`}
                target="_blank"
              >
                <li className="cursor-pointer">
                  <FAIcons iconCode={'fab fa-pinterest'} className="text-3xl" />
                </li>
              </Link>
            </ul>
          </div>

          <div className={cn('flex', 'flex-col', 'gap-3', 'items-center', 'p-2.5')}>
            <div className={cn('border-b', 'border-white', 'px-2.5')}>
              <Link
                href="/blog/"
                className={cn('text-white', 'hover:text-light', 'text-lg', 'uppercase', 'px-2.5')}
              >
                {globalLabels?.back_to_blog_text}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </div>
  );
};

// Refer this URL formats for social media share links

// ShareLink.networkTemplates = {
//   twitter: "https://twitter.com/intent/tweet?text={text} {url}",
//   "x-twitter": "https://x.com/intent/tweet?text={text} {url}",
//   pinterest: "https://www.pinterest.com/pin/create/button/?url={url}&media={image}",
//   facebook: "https://www.facebook.com/sharer.php?u={url}",
//   threads: "https://threads.net/intent/post?text={text} {url}",
//   vk: "https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}",
//   linkedin: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
//   odnoklassniki: "https://connect.ok.ru/offer?url={url}&title={title}&imageUrl={image}",
//   tumblr: "https://tumblr.com/share/link?url={url}",
//   google: "https://plus.google.com/share?url={url}",
//   digg: "https://digg.com/submit?url={url}",
//   reddit: "https://reddit.com/submit?url={url}&title={title}",
//   stumbleupon: "https://www.stumbleupon.com/submit?url={url}",
//   pocket: "https://getpocket.com/edit?url={url}",
//   whatsapp: "https://api.whatsapp.com/send?text=*{title}*%0A{text}%0A{url}",
//   xing: "https://www.xing.com/spi/shares/new?url={url}",
//   print: "javascript:print()",
//   email: "mailto:?subject={title}&body={text}%0A{url}",
//   telegram: "https://telegram.me/share/url?url={url}&text={text}",
//   skype: "https://web.skype.com/share?url={url}"
// },
