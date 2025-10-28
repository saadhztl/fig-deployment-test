'use client';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BlogCard } from '@/components/ui/cards/BlogCard';
import { cn } from '@/utils/cn';
import { IBlogDetailPage, IComponents, ISystemFields, ITaxonomyEntry } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { useGetEntriesByUids } from '@/lib/hooks/useEntryData';
import { Loader } from '../primitives/Loader';
import SvgIcon from '@/helpers/SvgIcon';
import { FAIcons } from '@/helpers/FAIcons';
import { Input } from '@/components/ui/forms/form-elements/Input';

export const BlogList = (props: IComponents['blog_list']) => {
  const [inputAvailable, setInputAvailable] = useState<boolean>(false);

  const { data, loading } = useGetEntriesByUids({
    references: props.blogs as Array<ISystemFields>,
  });
  const items: IBlogDetailPage[] = data?.map((d) => d.data) ?? [];

  const activeBlogs = useMemo(() => {
    return items.filter((blog) => blog.disable_blog === false);
  }, [items]);

  const sortedBlogs = useMemo(() => {
    return activeBlogs.sort((a, b) => {
      return (
        new Date(b.blog_data?.date || '').getTime() - new Date(a.blog_data?.date || '').getTime()
      );
    });
  }, [activeBlogs]);

  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [blogs, setBlogs] = useState<IBlogDetailPage[]>(sortedBlogs);
  const [value, setValue] = useState<string>('');

  const categoryValue = sortedBlogs?.map((i) =>
    (i?.taxonomies as ITaxonomyEntry[])?.map((t) => t.term_uid)
  );

  const categories = [...new Set(categoryValue?.flat())];

  const handleitemSelect = (cat: string) => {
    if (currentCategories.includes(cat)) {
      setCurrentCategories(currentCategories.filter((c) => c !== cat));
    } else {
      setCurrentCategories([...currentCategories, cat]);
    }
  };
  const handleCategory = () => {
    return currentCategories?.length
      ? sortedBlogs?.filter((i) => {
          const termUids = (i.taxonomies as ITaxonomyEntry[])?.map((t) => t?.term_uid) || [];
          return termUids.some((termUid) => currentCategories.includes(termUid));
        })
      : sortedBlogs;
  };

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const joinedText = (entry: IBlogDetailPage) =>
      entry?.blog_data?.content + (entry?.blog_data?.content_part_2 || '');
    const searchValue = (e.target as HTMLInputElement)?.value.toLowerCase();
    const filteredBlogs =
      sortedBlogs?.filter(
        (blog) =>
          joinedText(blog).toLowerCase().includes(searchValue) ||
          blog.title.toLowerCase().includes(searchValue)
      ) ?? [];
    return filteredBlogs;
  };

  const handleClearSearch = () => {
    setInputAvailable(false);
    setValue('');
    setBlogs(handleCategory());
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setInputAvailable(true);
    } else {
      setInputAvailable(false);
    }

    if ((e.target as HTMLInputElement)?.value.length >= 3) {
      setBlogs(handleValue(e));
    } else {
      setBlogs(handleCategory());
    }
  };

  useEffect(() => {
    setBlogs(handleCategory());
  }, [currentCategories, data]);

  return (
    <Container componentName="BlogList" tag="section" className="text-white">
      <div className={cn('mx-auto w-full gap-4 max-w-large-desktop md:mb-12')}>
        <div
          className={cn(
            'w-full',
            'flex',
            'flex-col',
            'gap-4',
            'lg:flex-row',
            'md:items-center',
            'mb-[38px]',
            'justify-between'
          )}
        >
          <div className={cn('w-full', 'flex', 'flex-wrap', 'items-center', 'gap-2')}>
            <button
              onClick={() => setCurrentCategories([])}
              className={cn(
                'transition-all',
                'font-medium',
                'duration-400',
                'text-white',
                'text-base',
                'cursor-pointer',
                'hover:bg-light',
                'hover:text-black',
                'bg-light',
                'text-black',
                'uppercase',
                'relative',
                'py-2',
                'px-4',
                'border',
                'border-white',
                'font-medium',
                'mr-[5px]',
                currentCategories.length > 0 && 'bg-transparent text-white'
              )}
            >
              all
            </button>
            {categories.map((category: string | undefined) => {
              return (
                <label
                  key={category}
                  htmlFor={category}
                  className={cn(
                    'transition-all',
                    'font-medium',
                    'duration-400',
                    'text-white',
                    'text-base',
                    'cursor-pointer',
                    'hover:bg-light',
                    'hover:text-black',
                    'uppercase',
                    'relative',
                    'py-2',
                    'px-4',
                    'border',
                    'border-white',
                    'has-checked:bg-light',
                    'has-checked:text-black',
                    'mr-[5px]',
                    'last:mr-0'
                  )}
                >
                  {category?.replace(/_/g, ' ')}
                  <input
                    name={category}
                    type="checkbox"
                    checked={currentCategories.includes(category || '')}
                    onChange={() => handleitemSelect(category || '')}
                    className={cn(
                      'absolute opacity-0 w-full h-full top-0 bottom-0 left-0 right-0 cursor-pointer'
                    )}
                  />
                </label>
              );
            })}
          </div>
          <div className={cn('relative', 'group')}>
            <Input
              id="search"
              type="text"
              name="search"
              pattern=".{3}"
              value={value}
              placeholder="Search by Keywords"
              className={cn(
                'bg-white uppercase leading-[20px] text-base text-black block placeholder:text-black min-w-[260px] px-8 py-2 rounded-[5px] w-full font-semibold tracking-[1.5px]'
              )}
              onChange={(e) => {
                setValue(e.target.value);
                handleInput(e);
              }}
            />
            {!inputAvailable ? (
              <FAIcons
                iconCode="fas fa-magnifying-glass"
                className="absolute right-3 top-3 text-black w-5 h-5"
              />
            ) : (
              <button
                id="clear-search"
                className={cn(
                  'absolute',
                  'cursor-pointer',
                  'text-black',
                  'right-3',
                  'top-1.5',
                  'w-5',
                  'h-5'
                )}
                onClick={() => {
                  handleClearSearch();
                }}
              >
                <SvgIcon icon="cross" viewBox="0 0 22 28" />
              </button>
            )}
          </div>
        </div>
        {loading ? (
          <div className="max-w-3xs mx-auto">
            <Loader />
          </div>
        ) : blogs?.length ? (
          <div
            className={cn('w-full', 'grid', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-5', 'pt-3')}
          >
            {blogs?.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        ) : (
          <div
            className={cn(
              'h-full',
              'w-full',
              'mx-auto',
              'flex',
              'flex-col',
              'items-center',
              'justify-center',
              'py-8',
              'md:py-13'
            )}
          >
            <p
              className={cn(
                'text-white',
                'flex-grow',
                'shrink-0',
                'uppercase',
                'text-3xl',
                'mx-auto'
              )}
            >
              No posts found
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};
