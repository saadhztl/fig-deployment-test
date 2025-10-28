import { ILocationComponents } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { GlitchText } from '@/components/primitives/GlitchText';
import { RichText } from '@/components/primitives/RichText';
import { Button } from '@/components/primitives/Button';
import Link from 'next/link';
import SvgIcon from '@/helpers/SvgIcon';
import { Container } from '@/components/primitives/Container';

export const DuckpinBowling = ({
  enable_duckpin_bowling,
  duckpin_bowling_link,
  description_duckpin_bowling,
  cta_1_duckpin_bowling,
  cta_2_duckpin_bowling,
  show_learn_more,
  learn_more_link,
  color_theme,
}: ILocationComponents['duckpin_bowling']) => {
  const glowColor = color_theme?.split('-')[0];
  const ctaColor = color_theme?.split('-')[1];
  return (
    enable_duckpin_bowling && (
      <Container componentName="DuckpinBowling" className={cn('w-full mb-[52px]')}>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row pb-8 w-full self-stretch border-b border-gray-charcoal">
          <div className="flex flex-col w-full md:w-1/2 content:w-2/5!">
            <div className="w-full">
              {duckpin_bowling_link?.href ? (
                <Link href={duckpin_bowling_link?.href}>
                  <GlitchText
                    tag="h2"
                    className={cn(
                      `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                    )}
                  >
                    {duckpin_bowling_link?.title}
                  </GlitchText>
                </Link>
              ) : (
                <GlitchText
                  tag="h2"
                  className={cn(
                    `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                  )}
                >
                  {duckpin_bowling_link?.title}
                </GlitchText>
              )}
            </div>
            <div className="w-full flex gap-10">
              {show_learn_more && learn_more_link?.href && (
                <Link
                  href={learn_more_link?.href}
                  className={cn(
                    `text-white hover:text-yellow font-semibold uppercase`,
                    `border-0 border-b border-yellow`,
                    'p-0 py-1 rounded-none tracking-widest w-fit'
                  )}
                >
                  {learn_more_link?.title}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 content:w-3/5!">
            <RichText
              content={description_duckpin_bowling}
              className="mb-7 text-white leading-[26px] font-normal text-lg"
            />
            <div className="flex gap-5 mt-auto flex-col md:flex-row flex-wrap">
              {cta_1_duckpin_bowling?.href ? (
                <Button
                  href={cta_1_duckpin_bowling?.href}
                  className={cn(
                    'text-lg px-8 flex gap-1.5 items-center justify-center font-semibold tracking-widest',
                    'text-light-black border-white hover:text-[var(--hover-color)]! hover:bg-light-black! hover:border-[var(--hover-color)]!'
                  )}
                  style={{
                    '--hover-color': ctaColor,
                    backgroundColor: ctaColor,
                  }}
                >
                  {cta_1_duckpin_bowling?.title}
                  <SvgIcon icon="bowling-pins" viewBox="0 0 80 80" className="w-5 h-5" />
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
                  {cta_1_duckpin_bowling?.title}
                  <SvgIcon icon="golf-stick" viewBox="0 0 80 80" className="w-5 h-5" />
                </Button>
              )}
              {cta_2_duckpin_bowling?.href ? (
                <Button
                  href={cta_2_duckpin_bowling?.href}
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_2_duckpin_bowling?.title}
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
                    {cta_2_duckpin_bowling?.title}
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
