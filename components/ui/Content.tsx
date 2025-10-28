import { IContent } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { StyledText } from '../primitives/StyledText';
import { StylingOptions, TextStylingOptions } from '@/lib/types';
import { RichText } from '../primitives/RichText';
import { Button } from '../primitives/Button';
import { Container } from '../primitives/Container';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';

export const Content = ({ heading, sub_heading, rich_text_editor, content_cta, $ }: IContent) => {
  return (
    <Container componentName="Content" className="mb-10">
      <FadeInSSRWrapper>
        <div className={cn('flex flex-col justify-center items-start w-full h-fit')}>
          {heading?.text && (
            <StyledText
              text={heading.text}
              styling_options={heading.styling_options as TextStylingOptions}
              className="text-start mb-8"
              $={$?.heading}
            />
          )}
          {sub_heading?.text && (
            <StyledText
              text={sub_heading.text}
              styling_options={sub_heading.styling_options as TextStylingOptions}
              className="text-start mb-4"
              $={$?.sub_heading}
            />
          )}
          {rich_text_editor && (
            <RichText
              content={rich_text_editor}
              className="text-white text-start text-[18px] w-full"
              $={$?.rich_text_editor}
            />
          )}

          {content_cta?.cta?.length && content_cta?.cta?.length > 0 ? (
            <div className="flex gap-5 flex-col md:flex-row flex-wrap justify-start items-center mt-[30px] w-full">
              {content_cta.cta.map((cta, index) => (
                <Button
                  key={index}
                  href={cta.link?.href}
                  styling_options={cta.styling_options as StylingOptions}
                  className="py-3 px-6 text-lg tracking-widest font-semibold w-full"
                  $={$?.content_cta}
                >
                  {cta.link?.title}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
