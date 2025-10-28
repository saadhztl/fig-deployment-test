import { IStatsSection } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { cn } from '@/utils/cn';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';

export const StatsSection = ({ heading, statistics, styling_options }: IStatsSection) => {
  return (
    <Container>
      <div className={cn('flex flex-col gap-8')}>
        {heading?.text && (
          <StyledText
            text={heading.text}
            styling_options={heading.styling_options as TextStylingOptions}
          />
        )}
        {statistics?.length && statistics.length > 0 ? (
          <div
            className={cn(
              'flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-2 lg:gap-5'
            )}
          >
            {statistics.map((stat, index) => {
              return (
                <div className={cn('flex flex-col gap-4 text-center', 'p-2 lg:p-4')} key={index}>
                  {stat.main_stat && (
                    <h3
                      className={cn(
                        'text-[64px] font-bold font-softcore-black tracking-[1px] leading-[88px]',
                        'lg:text-[104px]'
                      )}
                      style={
                        {
                          color: styling_options?.stat_text_color?.dropdown,
                          stroke: styling_options?.stat_stroke_color?.dropdown,
                          strokeWidth: '4px',
                          WebkitTextStrokeWidth: '4px',
                          WebkitTextStrokeColor: styling_options?.stat_stroke_color?.dropdown,
                        } as React.CSSProperties
                      }
                    >
                      {stat.main_stat}
                    </h3>
                  )}

                  {stat.description && (
                    <p
                      className={cn(
                        'font-bold leading-[24px]',
                        'lg:text-lg lg:leading-[27px] uppercase'
                      )}
                      style={
                        {
                          color: styling_options?.stat_description_color?.dropdown,
                        } as React.CSSProperties
                      }
                    >
                      {stat.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </Container>
  );
};
