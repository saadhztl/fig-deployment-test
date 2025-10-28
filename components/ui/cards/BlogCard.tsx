'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { IBlogDetailPage, ITaxonomyEntry } from '@/lib/generated';

export const BlogCard = (props: IBlogDetailPage) => {
  const { title, url, taxonomies, blog_data } = props;

  return (
    <div
      className={cn(
        'p-5',
        'flex',
        'relative',
        'hover:-translate-y-1',
        'transition-all',
        'duration-400',
        'flex-col',
        'border',
        'border-white',
        'bg-dark'
      )}
    >
      <Link
        href={url}
        className={cn(
          'absolute',
          'z-20',
          'h-full',
          'w-full',
          'before:absolute',
          'before:w-full',
          'before:h-full',
          'inset-0',
          'text-transparent'
        )}
      />
      <div className="w-full h-50 relative mb-[20px]">
        {blog_data?.featured_image?.image?.url && (
          <Image
            src={blog_data?.featured_image?.image?.url}
            alt={blog_data?.featured_image?.image?.title || ''}
            fill
            className="object-cover"
            quality={100}
          />
        )}
      </div>
      <div
        className={cn(
          'py-[4px]',
          'px-[8px]',
          'mb-[17px]',
          'border',
          'text-base',
          'leading-[24px]',
          'font-medium',
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
            <div key={t.term_uid} className="inline-block">
              {t.term_uid.replace(/_/g, ' ')}
              {index !== arr.length - 1 ? <span className="px-2">|</span> : ''}
            </div>
          );
        })}
      </div>
      <div className={cn('mb-[29px]')}>
        <h2
          className={cn(
            'text-xl',
            'font-semibold',
            'text-white',
            'uppercase',
            '[&_span]:lowercase',
            'tracking-[2px]'
          )}
        >
          {title}
        </h2>
      </div>
      <div
        className={cn(
          'text-white',
          'text-sm',
          'flex',
          'gap-3',
          'items-center',
          'px-[10px]',
          'mb-[10px]'
        )}
      >
        <span className={cn('max-w-5')}>
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
        {blog_data?.author_details?.author_name}
      </div>
    </div>
  );
};
