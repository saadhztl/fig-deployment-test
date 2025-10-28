'use client';
import { ILocationComponents } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { GlitchText } from '@/components/primitives/GlitchText';
import { RichText } from '@/components/primitives/RichText';
import { Button } from '@/components/primitives/Button';
import Link from 'next/link';
import SvgIcon from '@/helpers/SvgIcon';
import { Container } from '@/components/primitives/Container';
import { SheetTable } from '@/components/ui/SheetTable';
import { LocationPromoModal } from '../../ui/modals/LocationPromoModal';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';

export const PlayAndPractice = ({
  enable_play_and_practice,
  play_and_practice_link,
  description_play_and_practice,
  cta_1_play_and_practice,
  cta_2_play_and_practice,
  activate_cta_3,
  cta_3_play_and_practice,
  google_charts_tab_name,
  color_theme,
}: ILocationComponents['play_and_practice']) => {
  const glowColor = color_theme?.split('-')[0];
  const ctaColor = color_theme?.split('-')[1];
  const { globalLabels } = useGlobalLabels();

  return (
    enable_play_and_practice && (
      <Container componentName="PlayAndPractice" className={cn('w-full mb-[40px] md:mb-[52px]')}>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row pb-8 w-full self-stretch border-b border-gray-charcoal">
          <div className="flex flex-col w-full md:w-1/2 content:w-2/5!">
            <div className="w-full">
              {play_and_practice_link?.href ? (
                <Link href={play_and_practice_link?.href}>
                  <GlitchText
                    tag="h2"
                    className={cn(
                      `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                    )}
                  >
                    {play_and_practice_link?.title}
                  </GlitchText>
                </Link>
              ) : (
                <GlitchText
                  tag="h2"
                  className={cn(
                    `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                  )}
                >
                  {play_and_practice_link?.title}
                </GlitchText>
              )}
            </div>
            <div className="w-full flex gap-10">
              {google_charts_tab_name && (
                <LocationPromoModal
                  modalTriggerText={globalLabels.sim_rental_pricing_label}
                  themeColor="cyan"
                  content={
                    <SheetTable
                      variant="hours"
                      sheetRange={google_charts_tab_name}
                      sheetId={'1OCaKmSJ1s7QKfMt3qGmwJ5u_qWXFkprtA_aqe0buuk4'}
                      sheetName="Hours of Operation"
                    />
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 content:w-3/5!">
            <RichText
              content={description_play_and_practice}
              className="mb-7 text-white leading-[26px] font-normal text-lg"
            />
            <div className="flex gap-5 mt-auto flex-col md:flex-row flex-wrap">
              {cta_1_play_and_practice?.href ? (
                <Button
                  href={cta_1_play_and_practice?.href}
                  className={cn(
                    'text-lg px-8 flex gap-1.5 items-center justify-center font-semibold tracking-widest',
                    'text-light-black border-white hover:text-[var(--hover-color)]! hover:bg-light-black! hover:border-[var(--hover-color)]!'
                  )}
                  style={{
                    '--hover-color': ctaColor,
                    backgroundColor: ctaColor,
                  }}
                >
                  {cta_1_play_and_practice?.title}
                  <SvgIcon icon="golf-stick" viewBox="0 0 80 80" className="w-5 h-5" />
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
                  {cta_1_play_and_practice?.title}
                  <SvgIcon icon="golf-stick" viewBox="0 0 80 80" className="w-5 h-5" />
                </Button>
              )}

              {cta_2_play_and_practice?.href ? (
                <Button
                  href={cta_2_play_and_practice?.href}
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_2_play_and_practice?.title}
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
                    {cta_2_play_and_practice?.title}
                  </div>
                </Button>
              )}

              {cta_3_play_and_practice?.href && activate_cta_3 && (
                <Button
                  href={cta_3_play_and_practice?.href}
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_3_play_and_practice?.title}
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
