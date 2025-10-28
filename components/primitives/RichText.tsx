import { CSLPFieldMapping } from '@/lib/generated';
import { getCSLPAttributes } from '@/lib/type-guards';
import { StylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';
import { jsonToHtml } from '@contentstack/json-rte-serializer';
import DOMPurify from 'isomorphic-dompurify';

export const RichText = ({
  content,
  parentClassName = 'richtext',
  className,
  parseType = 'html',
  tag = 'div',
  styling_options,
  $,
}: {
  content?: string;
  className?: string;
  parentClassName?: string;
  parseType?: 'html' | 'json';
  tag?: 'section' | 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  styling_options?: StylingOptions;
} & { $?: CSLPFieldMapping }) => {
  if (!content) return null;

  const Tag = tag;
  const sanitized = DOMPurify.sanitize(content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'scrolling',
      'src',
      'height',
      'width',
      'target',
    ],
  });
  const combinedClassName = cn(
    className,
    styling_options &&
      'bg-[var(--background-color)] text-[var(--text-color)] border-[var(--border-color)]'
  );
  const ContentStyle = {
    '--text-color': styling_options?.text_color?.dropdown,
    '--background-color': styling_options?.background_color?.dropdown,
    '--border-color': styling_options?.border_color?.dropdown,
  } as React.CSSProperties;

  return (
    <Tag
      style={styling_options && ContentStyle}
      className={cn(parentClassName, combinedClassName)}
      dangerouslySetInnerHTML={{
        __html: parseType === 'html' ? sanitized : jsonToHtml(content),
      }}
      {...getCSLPAttributes($)}
    />
  );
};
