import { IComponents, IGamesBoxCard, ISystemFields } from '@/lib/generated';
import { Container } from '../primitives/Container';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';
import { StyledText } from '../primitives/StyledText';
import { TextStylingOptions } from '@/lib/types';
import { cn } from '@/utils/cn';
import { ReferencePlaceholder } from '../primitives/ReferencePlaceholder';

export const GamesBoxCardsList = ({
  heading,
  description,
  box_card_row_1,
  box_cards_row_2,
}: IComponents['games_box_cards_list']) => {
  const handleColumns = (row?: IGamesBoxCard[]) => {
    if (row?.length === 1) {
      return 'md:grid-cols-1';
    } else if (row?.length === 2) {
      return 'md:grid-cols-2';
    } else if (row?.length === 3) {
      return 'md:grid-cols-3';
    }
    return 'md:grid-cols-4';
  };

  return (
    <Container componentName="GamesBoxCardsList" tag="section">
      <FadeInSSRWrapper>
        <div className="flex flex-col gap-10 items-center">
          {(heading?.text || description) && (
            <div className="flex flex-col gap-5 w-full">
              {heading?.text && (
                <StyledText
                  text={heading.text}
                  styling_options={heading.styling_options as TextStylingOptions}
                  className="pb-2.5"
                />
              )}

              {description && (
                <p className="text-center w-full md:w-1/2 mx-auto text-lg md:text-[22px] leading-8 text-white">
                  {description}
                </p>
              )}
            </div>
          )}
          {(box_card_row_1?.reference?.length || box_cards_row_2?.reference?.length) && (
            <div className="flex flex-col gap-4 w-full">
              {box_card_row_1?.reference?.length && box_card_row_1?.reference?.length > 0 ? (
                <div className={cn('grid gap-4 w-full', handleColumns(box_card_row_1?.reference))}>
                  <ReferencePlaceholder
                    references={box_card_row_1?.reference as Array<ISystemFields>}
                  />
                </div>
              ) : null}
              {box_cards_row_2?.reference?.length && box_cards_row_2?.reference?.length > 0 ? (
                <div className={cn('grid gap-4 w-full', handleColumns(box_cards_row_2?.reference))}>
                  <ReferencePlaceholder
                    references={box_cards_row_2?.reference as Array<ISystemFields>}
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
