import { ILocationComponents } from '@/lib/generated';
import { Container } from '../../primitives/Container';
import { cn } from '@/utils/cn';
import { GlitchText } from '../../primitives/GlitchText';
import { RichText } from '../../primitives/RichText';
import { Button } from '../../primitives/Button';
import Link from 'next/link';
import SvgIcon from '@/helpers/SvgIcon';

export const CustomClubFitting = ({
  enable_custom_club_fitting,
  custom_club_fitting_link,
  subtitle_custom_club_fitting,
  description_custom_club_fitting,
  cta_1_custom_club_fitting,
  cta_2_custom_club_fitting,
  color_theme,
}: ILocationComponents['custom_club_fitting']) => {
  const glowColor = color_theme?.split('-')[0];
  const ctaColor = color_theme?.split('-')[1];
  return (
    enable_custom_club_fitting && (
      <Container componentName="CustomClubFitting" className={cn('w-full mb-[52px]')}>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row pb-8 w-full self-stretch border-b border-gray-charcoal">
          <div className="flex flex-col w-full md:w-1/2 content:w-2/5!">
            <div className="w-full">
              {custom_club_fitting_link?.href ? (
                <Link href={custom_club_fitting_link?.href}>
                  <GlitchText
                    tag="h2"
                    className={cn(
                      `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                    )}
                  >
                    {custom_club_fitting_link?.title}
                  </GlitchText>
                </Link>
              ) : (
                <GlitchText
                  tag="h2"
                  className={cn(
                    `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                  )}
                >
                  {custom_club_fitting_link?.title}
                </GlitchText>
              )}
              <h3
                className={cn(
                  'pb-1 text-base leading-7 uppercase text-white tracking-widest font-semibold'
                )}
              >
                {subtitle_custom_club_fitting}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 content:w-3/5!">
            <RichText
              content={description_custom_club_fitting}
              className="mb-7 text-white leading-[26px] font-normal text-lg"
            />
            <div className="flex gap-5 mt-auto flex-col md:flex-row flex-wrap">
              {cta_1_custom_club_fitting?.href ? (
                <Button
                  href={cta_1_custom_club_fitting?.href}
                  className={cn(
                    'text-lg px-8 flex gap-1.5 items-center justify-center font-semibold tracking-widest',
                    'text-light-black border-white hover:text-[var(--hover-color)]! hover:bg-light-black! hover:border-[var(--hover-color)]!'
                  )}
                  style={{
                    '--hover-color': ctaColor,
                    backgroundColor: ctaColor,
                  }}
                >
                  {cta_1_custom_club_fitting?.title}
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
                  {cta_1_custom_club_fitting?.title}
                  <SvgIcon icon="golf-stick" viewBox="0 0 80 80" className="w-5 h-5" />
                </Button>
              )}
              {cta_2_custom_club_fitting?.href ? (
                <Button
                  href={cta_2_custom_club_fitting?.href}
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_2_custom_club_fitting?.title}
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
                    {cta_2_custom_club_fitting?.title}
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
