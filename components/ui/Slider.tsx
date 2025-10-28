import { ISlider } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { RichText } from '../primitives/RichText';
import { AutoImageSlider } from './slider-variants/AutoImageSlider';
import { GallerySlider } from './slider-variants/GallerySlider';
import { InfiniteSwipeSlider } from './slider-variants/InfiniteSwipeSlider';
import { Container } from '../primitives/Container';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';

export const Slider = (props: ISlider) => {
  const renderSlider = (props: ISlider) => {
    if (props.slider_type === 'Auto play Slider') {
      return <AutoImageSlider {...props} />;
    } else if (props.slider_type === 'Gallery Slider') {
      return <GallerySlider {...props} />;
    } else if (props.slider_type === 'Infinite Slider') {
      return <InfiniteSwipeSlider {...props} />;
    }
  };
  return (
    <Container componentName="Slider" tag="section" fullScreen={props.fullwidth_slider} edgeToEdge>
      <div className="flex flex-col gap-5 px-5 large-desktop:px-0">
        {props.heading?.text && (
          <StyledText
            className={cn('text-5xl font-bold text-white', '!text-center')}
            text={props.heading.text}
            styling_options={props.heading.styling_options as TextStylingOptions}
          />
        )}
        {props.top_content && (
          <RichText className={cn('text-white', '!text-center')} content={props.top_content} />
        )}
        {renderSlider(props)}
        {props.bottom_content && (
          <RichText
            className={cn('text-white', '!text-center', 'w-full')}
            content={props.bottom_content}
          />
        )}
      </div>
    </Container>
  );
};
