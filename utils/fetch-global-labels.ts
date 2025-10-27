import { getEntries } from '@/lib/contentstack';
import { IDictionaryItems } from '@/lib/generated';

export const fetchGlobalLabels = async () => {
  const response = await getEntries({
    contentTypeUid: 'dictionary_items',
  });
  // Extract every field from IDictionaryItems except those from ISystemFields
  if (response && response.entries && response.entries.length > 0) {
    return response.entries?.[0] as IDictionaryItems;
  }

  return {} as IDictionaryItems;
};
