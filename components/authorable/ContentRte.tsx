import { IContentRte } from '@/lib/generated';
import { RichText } from '../primitives/RichText';
import { Container } from '../primitives/Container';
import { cn } from '@/utils/cn';
import { FadeInSSRWrapper } from '../primitives/FadeInSSRWrapper';

export const ContentRte = ({ rich_text_editor, styling_options, $ }: IContentRte) => {
  return (
    <Container componentName="ContentRte" bottomPadded={!styling_options?.disable_bottom_spacing}>
      <FadeInSSRWrapper>
        <RichText
          content={rich_text_editor}
          className={cn(`${styling_options?.content_alignment}!`, 'text-white')}
          $={$?.rich_text_editor}
        />
      </FadeInSSRWrapper>
    </Container>
  );
};
