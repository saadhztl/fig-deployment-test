'use client';

import { IFields, ILocationEntity } from '@/lib/generated';
import { useGetEntriesByUids } from '@/lib/hooks/useEntryData';
import React from 'react';
import { Select, SelectProps } from './Select';

export const LocationsDropdown = ({
  reference,
  location_name_type,
  ...props
}: IFields['locations'] & SelectProps) => {
  const { data: locationReferenceData } = useGetEntriesByUids<ILocationEntity>({
    references: reference,
  });

  if (!locationReferenceData) return null;

  const options = locationReferenceData.map((location) => ({
    value: location_name_type === 'Short' ? location.data?.title : location.data?.location_area,
    label: location_name_type === 'Short' ? location.data?.title : location.data?.location_area,
  }));

  return (
    <Select
      id={props.id}
      options={[
        { label: 'Select Location', value: '', disabled: true, selected: true },
        ...((options as SelectProps['options']) || []),
      ]}
      {...props}
    />
  );
};

LocationsDropdown.displayName = 'LocationsDropdown';
