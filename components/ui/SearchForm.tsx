'use client';
import { useState } from 'react';
import { Button } from '@/components/primitives/Button';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';

interface SearchFormProps {
  cities: string[];
  searchCallback: (text: string, location: string, defaultLocation: string) => void;
}

export const SearchForm = ({ cities, searchCallback }: SearchFormProps) => {
  const { globalLabels } = useGlobalLabels();
  cities = ['All Locations', ...cities];
  const [textFilter, setTextFilter] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<string>(cities[0]);
  const handleSearch = () => {
    searchCallback(textFilter, locationFilter, cities[0]);
  };

  return (
    <div className="p-2.5 max-w-max-content w-full flex justify-center items-center gap-5 flex-col md:flex-row mx-auto my-5">
      <div className="flex flex-col gap-3 md:flex-row w-full md:w-8/12 justify-end">
        <input
          type="text"
          placeholder="Search by Keywords"
          className="bg-white px-4 py-2 rounded-xs w-full md:w-1/2"
          onChange={(e) => setTextFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        ></input>
        <select
          className="bg-white px-4 py-2 rounded-xs w-full md:w-1/2"
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          {cities.map((city, ind) => (
            <option key={ind} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Button
          className="py-2 px-8 text-light-black bg-light border border-light text-lg tracking-widest font-semibold hover:text-light hover:bg-light-black"
          onClick={handleSearch}
        >
          {globalLabels.search_button_text}
        </Button>
      </div>
    </div>
  );
};
