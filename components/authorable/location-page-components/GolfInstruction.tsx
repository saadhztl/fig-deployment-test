'use client';
import { ILocationComponents } from '@/lib/generated';
import { Container } from '../../primitives/Container';
import { cn } from '@/utils/cn';
import { GlitchText } from '../../primitives/GlitchText';
import { RichText } from '../../primitives/RichText';
import { Button } from '../../primitives/Button';
import Link from 'next/link';
import { LocationPromoModal } from '../../ui/modals/LocationPromoModal';
import SvgIcon from '@/helpers/SvgIcon';
import { SheetTable } from '@/components/ui/SheetTable';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';
import { IExtendedProps } from '@/lib/types';

export const GolfInstruction = ({
  enable_golf_instruction,
  golf_instruction_link,
  description_golf_instruction,
  cta_1_golf_instruction,
  cta_2_golf_instruction,
  enable_lesson_pricing,
  lesson_pricing,
  enable_meet_the_coaches,
  color_theme,
  extendedProps,
}: ILocationComponents['golf_instruction'] & IExtendedProps) => {
  const glowColor = color_theme?.split('-')[0];
  const ctaColor = color_theme?.split('-')[1];
  const { globalLabels } = useGlobalLabels();

  return (
    enable_golf_instruction && (
      <Container componentName="GolfInstruction" className={cn('w-full mb-[52px]')}>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row pb-8 w-full self-stretch border-b border-gray-charcoal">
          <div className="flex flex-col w-full md:w-1/2 content:w-2/5!">
            <div className="w-full">
              {golf_instruction_link?.href ? (
                <Link href={golf_instruction_link?.href}>
                  <GlitchText
                    tag="h2"
                    className={cn(
                      `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                    )}
                  >
                    {golf_instruction_link?.title}
                  </GlitchText>
                </Link>
              ) : (
                <GlitchText
                  tag="h2"
                  className={cn(
                    `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                  )}
                >
                  {golf_instruction_link?.title}
                </GlitchText>
              )}
            </div>
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-[60px]">
              {enable_lesson_pricing && lesson_pricing && (
                <LocationPromoModal
                  modalTriggerText={globalLabels.lesson_pricing_label}
                  themeColor="orange-bright"
                  content={
                    <SheetTable
                      variant="prices"
                      sheetRange={lesson_pricing}
                      sheetId={'1mdm2Dt_OrmItMA5QZ_KGIpdcRRJZUpH0SNfCyb0W_PY'}
                      sheetName="Lesson Pricing Tables"
                      locationName={extendedProps?.location_city}
                    />
                  }
                />
              )}
              {enable_meet_the_coaches && (
                <Link
                  href={'#coaches'}
                  className={cn(
                    `text-white hover:text-orange-bright font-semibold uppercase`,
                    `border-0 border-b border-orange-bright`,
                    'p-0 py-1 rounded-none tracking-widest w-fit'
                  )}
                >
                  {globalLabels.meet_the_coaches_text}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 content:w-3/5!">
            <RichText
              content={description_golf_instruction}
              className="mb-7 text-white leading-[26px] font-normal text-lg"
            />
            <div className="flex gap-5 mt-auto flex-col md:flex-row flex-wrap">
              {cta_1_golf_instruction?.href ? (
                <Button
                  href={cta_1_golf_instruction?.href}
                  className={cn(
                    'text-lg px-8 flex gap-1.5 items-center justify-center font-semibold tracking-widest',
                    'text-light-black border-white hover:text-[var(--hover-color)]! hover:bg-light-black! hover:border-[var(--hover-color)]!'
                  )}
                  style={{
                    '--hover-color': ctaColor,
                    backgroundColor: ctaColor,
                  }}
                >
                  {cta_1_golf_instruction?.title}
                  <SvgIcon icon="lesson" viewBox="0 0 80 80" className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  className={cn(
                    'text-lg px-8 flex gap-1.5 items-center justify-center font-semibold tracking-widest',
                    'text-light-black border-white hover:text-[var(--hover-color)]! hover:bg-light-black! hover:border-[var(--hover-color)]!'
                  )}
                  style={{
                    '--hover-color': ctaColor,
                    backgroundColor: ctaColor,
                  }}
                >
                  {cta_1_golf_instruction?.title}
                  <SvgIcon icon="lesson" viewBox="0 0 80 80" className="w-5 h-5" />
                </Button>
              )}
              {cta_2_golf_instruction?.href ? (
                <Button
                  href={cta_2_golf_instruction?.href}
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_2_golf_instruction?.title}
                  </div>
                </Button>
              ) : (
                <Button
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_2_golf_instruction?.title}
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    )
  );
};
