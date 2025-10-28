import { cn } from '@/utils/cn';
import { HeadingTags, TextStylingOptions } from '@/lib/types';
import { GlitchText } from './GlitchText';
import { getCSLPAttributes } from '@/lib/type-guards';
import { CSLPFieldMapping } from '@/lib/generated';

interface StyledTextProps {
  className?: string;
  text: string;
  styling_options?: TextStylingOptions;
  tag?: HeadingTags;
  style?: React.CSSProperties;
  $?: CSLPFieldMapping;
}

export const StyledText = ({
  text,
  styling_options,
  className,
  tag = 'h2',
  style,
  $,
}: StyledTextProps) => {
  const Tag = tag;
  return (
    <div>
      {styling_options?.blinking_text ? (
        <GlitchText tag={tag} styling_options={styling_options} style={style} className={className}>
          {text}
        </GlitchText>
      ) : (
        <Tag
          className={cn(
            'text-center',
            className,
            styling_options?.glowing_text && `glowingText ${styling_options.glow_color}`,
            styling_options?.font_style && `${styling_options.font_style}`,
            styling_options?.font_weight && `${styling_options.font_weight}`,
            styling_options?.font_size && `${styling_options.font_size}`
          )}
          style={
            {
              textShadow: styling_options?.light_glow_css_property,
              color: styling_options?.text_color?.dropdown,
              ...style,
            } as React.CSSProperties
          }
          {...getCSLPAttributes($)}
        >
          {text}
        </Tag>
      )}
    </div>
  );
};
