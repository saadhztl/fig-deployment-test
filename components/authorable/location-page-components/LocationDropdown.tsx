import { Container } from '@/components/primitives/Container';
import { FadeInSSRWrapper } from '@/components/primitives/FadeInSSRWrapper';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { getEntriesByUids } from '@/lib/contentstack';
import { ILocationDropdown, ILocationEntity } from '@/lib/generated';
import { cn } from '@/utils/cn';

export const LocationDropdown = async ({
  dropdown_label,
  location_url_type,
  reference,
  styling_options,
}: ILocationDropdown) => {
  const contentTypeUid = reference?.[0]?._content_type_uid || '';
  const entryUids = reference?.map((item) => item.uid).filter(Boolean) as string[];
  const locationEntities = await getEntriesByUids<ILocationEntity>({
    contentTypeUid,
    entryUids,
  });
  if (!locationEntities?.entries) return null;
  const sortedLocationEntities = locationEntities?.entries?.sort((a, b) => {
    if (!a.location_area || !b.location_area) return 0;
    return a.location_area.localeCompare(b.location_area);
  });
  return (
    <Container
      componentName="LocationDropdown"
      bottomPadded={!styling_options?.disable_bottom_spacing}
    >
      <FadeInSSRWrapper>
        <div className={cn('flex items-center', styling_options?.dropdown_horizontal_alignment)}>
          <CustomSelect
            dropdown_label={dropdown_label}
            location_url_type={location_url_type || ''}
            locationEntities={sortedLocationEntities}
            styling_options={styling_options}
          />
        </div>
      </FadeInSSRWrapper>
    </Container>
  );
};
