import { ILocationComponents } from '@/lib/generated';
import { Container } from '../../primitives/Container';
import { cn } from '@/utils/cn';
import { GlitchText } from '../../primitives/GlitchText';
import { RichText } from '../../primitives/RichText';
import { Button } from '../../primitives/Button';
import Link from 'next/link';
import SvgIcon from '@/helpers/SvgIcon';

export const MakeItAParty = ({
  enable_make_it_a_party,
  make_it_a_party_link,
  subtitle_make_it_a_party,
  description_make_it_a_party,
  cta_1_make_it_a_party,
  cta_2_make_it_a_party,
  color_theme,
}: ILocationComponents['make_it_a_party']) => {
  const glowColor = color_theme?.split('-')[0];
  const ctaColor = color_theme?.split('-')[1];
  return (
    enable_make_it_a_party && (
      <Container componentName="MakeItAParty" className={cn('w-full mb-[52px]')}>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row pb-8 w-full self-stretch border-b border-gray-charcoal">
          <div className="flex flex-col w-full md:w-1/2 content:w-2/5!">
            <div className="w-full">
              {make_it_a_party_link?.href ? (
                <Link href={make_it_a_party_link?.href}>
                  <GlitchText
                    tag="h2"
                    className={cn(
                      `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                    )}
                  >
                    {make_it_a_party_link?.title}
                  </GlitchText>
                </Link>
              ) : (
                <GlitchText
                  tag="h2"
                  className={cn(
                    `text-3xl md:text-5xl xl:text-[64px] xl:leading-none uppercase mb-7 glowingText ${glowColor} font-semibold tracking-widest text-start`
                  )}
                >
                  {make_it_a_party_link?.title}
                </GlitchText>
              )}
              <h3
                className={cn(
                  'pb-1 text-base leading-7 uppercase text-white tracking-widest font-semibold'
                )}
              >
                {subtitle_make_it_a_party}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 content:w-3/5!">
            <RichText
              content={description_make_it_a_party}
              className="mb-7 text-white leading-[26px] font-normal text-lg"
            />
            <div className="flex gap-5 mt-auto flex-col md:flex-row flex-wrap">
              {cta_1_make_it_a_party?.href ? (
                <Button
                  href={cta_1_make_it_a_party?.href}
                  className={cn(
                    'text-lg px-8 flex gap-1.5 items-center justify-center font-semibold tracking-widest',
                    'text-light-black border-white hover:text-[var(--hover-color)]! hover:bg-light-black! hover:border-[var(--hover-color)]!'
                  )}
                  style={{
                    '--hover-color': ctaColor,
                    backgroundColor: ctaColor,
                  }}
                >
                  {cta_1_make_it_a_party?.title}
                  <SvgIcon icon="party" viewBox="0 0 80 80" className="w-5 h-5" />
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
                  {cta_1_make_it_a_party?.title}
                  <SvgIcon icon="party" viewBox="0 0 80 80" className="w-5 h-5" />
                </Button>
              )}
              {cta_2_make_it_a_party?.href ? (
                <Button
                  href={cta_2_make_it_a_party?.href}
                  className={cn(
                    'text-lg px-8 font-semibold tracking-widest',
                    'bg-light-black text-white border-white hover:bg-white hover:text-light-black'
                  )}
                >
                  <div className={cn('flex items-center justify-center gap-2.5')}>
                    {cta_2_make_it_a_party?.title}
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
                    {cta_2_make_it_a_party?.title}
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
