import { Locations } from '@/components/authorable/Locations';
import { getEntries } from '@/lib/contentstack';
import {
  ILocationDetailPage,
  ILocationsLandingComponents,
  ILocationsLandingPage,
} from '@/lib/generated';

export const LocationsList = async ({
  list_title,
  no_result_found_message,
  left_column_state_display_count,
}: ILocationsLandingComponents['locations_list'] & ILocationsLandingPage) => {
  const allLocations = await getEntries<ILocationDetailPage>({
    contentTypeUid: 'location_detail_page',
  });

  return (
    <Locations
      list_title={list_title}
      locations={allLocations?.entries}
      no_result_found_message={no_result_found_message}
      left_column_state_display_count={left_column_state_display_count}
    />
  );
};
