'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Container } from '../primitives/Container';
import { CSLPFieldMapping, ILocationDetailPage, IStyledSingleLineText } from '@/lib/generated';
import { StyledText } from '../primitives/StyledText';
import { cn } from '@/utils/cn';
import SvgIcon from '@/helpers/SvgIcon';
import { getCSLPAttributes } from '@/lib/type-guards';

type Prediction = {
  description?: string;
  place_id?: string;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type LocationProps = {
  list_title?: IStyledSingleLineText;
  locations?: ILocationDetailPage[];
  no_result_found_message?: string;
  left_column_state_display_count: number;
  $?: {
    list_title?: CSLPFieldMapping;
    no_result_found_message?: CSLPFieldMapping;
    left_column_state_display_count?: CSLPFieldMapping;
    clear_search?: CSLPFieldMapping;
    search_input?: CSLPFieldMapping;
  };
};

export const Locations = ({
  list_title,
  locations,
  no_result_found_message,
  left_column_state_display_count,
  $,
}: LocationProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Prediction[]>([]);
  const [filtered, setFiltered] = useState<ILocationDetailPage[]>(locations || []);
  const [showError, setShowError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const groupedLocations = (items: ILocationDetailPage[]) => {
    const groupedObj = groupByState(items || []);

    return Object.keys(groupedObj).map((key) => {
      return { [key]: groupedObj[key] };
    });
  };

  const groupedSortedLocations = groupedLocations(filtered || []);

  async function fetchSuggestions(input: string) {
    if (!input) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const res = await fetch(`/api/autocomplete?input=${encodeURIComponent(input)}`);
    const data = await res.json();
    setSuggestions(data.predictions || []);
    setSelectedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!query.trim()) {
        // If input is empty, show all results
        setFiltered(locations || []);
        setShowError(false);
        setSuggestions([]);
        setSelectedIndex(-1);
      } else if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        // If a suggestion is selected, use it
        const selected = suggestions[selectedIndex];
        handleSelect(selected.description || '', selected.place_id || '');
      } else if (suggestions.length > 0) {
        // If no suggestion selected but suggestions exist, use the first one
        const first = suggestions[0];
        handleSelect(first.description || '', first.place_id || '');
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  }

  async function handleSelect(description: string, placeId: string) {
    setQuery(description);
    setSuggestions([]);
    setShowError(false);
    setSelectedIndex(-1);
    setIsLoading(true);

    try {
      // Get geocode data to extract state information
      const geoRes = await fetch(`/api/geocode?place_id=${placeId}`);
      const geoData = await geoRes.json();

      if (!geoData.results.length) {
        setIsLoading(false);
        setShowError(true);
        setFiltered(locations || []);
        return;
      }

      // Find the state from address_components
      const addressComponents: AddressComponent[] = geoData.results[0].address_components;
      const stateComponent = addressComponents.find((component) =>
        component.types.includes('administrative_area_level_1')
      );

      if (!stateComponent) {
        setIsLoading(false);
        setShowError(true);
        setFiltered(locations || []);
        return;
      }

      const stateName = stateComponent.long_name;

      // Filter locations by matching state
      const filteredList = (locations || []).filter((loc) => {
        return loc.location_states === stateName;
      });

      // If no locations found in that state, show error and display all locations
      if (filteredList.length === 0) {
        setShowError(true);
        setFiltered(locations || []);
      } else {
        setShowError(false);
        setFiltered(filteredList);
      }
    } catch (error) {
      console.error('Error filtering locations:', error);
      setShowError(true);
      setFiltered(locations || []);
    } finally {
      setIsLoading(false);
    }
  }

  function groupByState(locs: ILocationDetailPage[]) {
    // Group by state
    const grouped = locs.reduce((acc: Record<string, ILocationDetailPage[]>, item) => {
      if (!item.location_states) return acc;
      if (!acc[item.location_states]) {
        acc[item.location_states] = [];
      }
      acc[item.location_states].push(item);
      return acc;
    }, {});

    // Sort each state’s array by city, then neighborhood
    for (const state in grouped) {
      grouped[state].sort((a, b) => {
        if (!a.location_city || !b.location_city) return 0;
        const cityCompare = a.location_city.localeCompare(b.location_city);
        if (cityCompare !== 0) return cityCompare;
        if (!a.location_neighbourhood || !b.location_neighbourhood) return 0;
        return a.location_neighbourhood.localeCompare(b.location_neighbourhood);
      });
    }

    // Return new object with alphabetically sorted state keys
    return Object.keys(grouped)
      .sort()
      .reduce((acc: Record<string, ILocationDetailPage[]>, key) => {
        acc[key] = grouped[key];
        return acc;
      }, {});
  }

  return (
    <Container componentName="LocationsList" className="mb-0 pb-20">
      <div
        className={cn(
          'flex flex-col md:flex-row gap-4 w-full py-14 md:py-10 justify-between items-start md:items-center'
        )}
      >
        {list_title?.text && (
          <StyledText
            text={list_title?.text}
            styling_options={list_title?.styling_options}
            className="text-start basis-1/2"
            $={list_title.$?.text}
          />
        )}
        <div className={clsx('relative', 'group basis-1/2 w-full')}>
          <input
            name="search"
            type="text"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              fetchSuggestions(val);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Find your nearest 5i"
            className={clsx(
              'bg-white',
              'peer',
              'bg-[url(https://cdn-icons-png.flaticon.com/512/622/622669.png)]',
              'bg-no-repeat',
              'bg-[center_right_8px]',
              'bg-[length:14px]',
              'uppercase',
              'text-[17px]',
              'leading-5',
              'tracking-[1.6px]',
              'font-semibold',
              'text-base',
              'block',
              'font-black',
              'placeholder-gray-500',
              'w-full',
              'md:min-w-[500px]',
              'px-4',
              'py-2',
              'h-11',
              'rounded-sm'
            )}
          />
          <button
            className="absolute block text-black peer-placeholder-shown:hidden cursor-pointer right-2 md:right-9 w-9 h-9 top-1"
            onClick={() => {
              setFiltered(locations || []);
              setQuery('');
              setSuggestions([]);
              setShowError(false);
              setSelectedIndex(-1);
            }}
            {...getCSLPAttributes($?.clear_search)}
          >
            <svg
              className="h-5 w-5 fill-current"
              fill="currentColor"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c9.4-9.4 24.6-9.4 33.9 0l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9z"></path>
            </svg>
          </button>
          {suggestions.length > 0 && (
            <ul className="border bg-white absolute z-10 w-full max-h-60 overflow-y-auto shadow-lg">
              {suggestions.map((s, index) => (
                <li
                  key={s.place_id}
                  ref={(el) => {
                    suggestionRefs.current[index] = el;
                  }}
                  onClick={() => handleSelect(s.description || '', s.place_id || '')}
                  className={clsx(
                    'cursor-pointer',
                    'p-3',
                    'text-black',
                    'border-b',
                    'last:border-b-0',
                    'transition-colors',
                    'duration-150',
                    index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
                  )}
                  {...getCSLPAttributes($?.search_input)}
                >
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showError && no_result_found_message && (
        <div className={clsx('w-full', 'mb-6', 'mt-4')}>
          <div
            className={clsx('bg-[#FF4800]', 'text-white', 'p-[10px]', 'rounded-[6px]', 'mb-[40px]')}
            {...getCSLPAttributes($?.no_result_found_message)}
          >
            {no_result_found_message}
          </div>
        </div>
      )}
      {isLoading && (
        <div className={clsx('w-full', 'flex', 'justify-center', 'items-center')}>
          <div className={clsx('flex', 'flex-col', 'items-center')}>
            <SvgIcon
              icon="loading-spinner"
              className={clsx('w-[150px]', 'h-[150px]', 'text-[#bff300]')}
              viewBox="0 0 100 100"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className={clsx('flex flex-col md:flex-row w-full')}>
          <ul className="flex flex-col basis-1/2 w-full">
            {groupedSortedLocations
              ?.slice(
                0,
                Math.ceil(left_column_state_display_count || groupedSortedLocations?.length / 2)
              )
              .map((location, index) => {
                return (
                  <li key={index} className="break-before-all">
                    <h3
                      className={clsx(
                        'text-[28px]',
                        'text-orange',
                        'break-after-avoid',
                        'mt-2',
                        'font-black',
                        'font-softcore-black',
                        'leading-8',
                        'mb-4'
                      )}
                    >
                      {Object.keys(location)}
                    </h3>
                    <ul className="flex flex-col gap-2 mb-4">
                      {Object.values(location).map((locs) => {
                        return locs.map((l, index) => (
                          <li
                            key={index}
                            className={clsx('hover:-translate-y-1', 'transion-all', 'duration-300')}
                          >
                            <Link
                              href={l.url || '/'}
                              className={clsx(
                                'transion-all',
                                'duration-300',
                                'border-l',
                                'uppercase',
                                'text-white',
                                'text-lg',
                                'font-semibold',
                                'tracking-widest',
                                'border-white',
                                'hover:border-light',
                                'px-4',
                                'p-1',
                                'flex gap-1 flex-wrap'
                              )}
                              style={{ wordWrap: 'break-word' }}
                            >
                              <span className="text-light">{l.location_city}</span>
                              {l.location_neighbourhood}
                              {l.enable_coming_soon && (
                                <span
                                  className={clsx(
                                    'text-sm',
                                    'bg-orange',
                                    'py-1',
                                    'px-3',
                                    'uppercase',
                                    'font-medium',
                                    'leading-4'
                                  )}
                                >
                                  Coming Soon
                                </span>
                              )}
                            </Link>
                          </li>
                        ));
                      })}
                    </ul>
                  </li>
                );
              })}
          </ul>

          <ul className="flex flex-col basis-1/2 w-full">
            {groupedSortedLocations
              ?.slice(
                Math.ceil(left_column_state_display_count || groupedSortedLocations?.length / 2)
              )
              .map((location, index) => {
                return (
                  <li key={index} className="break-before-all">
                    <h3
                      className={clsx(
                        'text-[28px]',
                        'text-orange',
                        'break-after-avoid',
                        'mt-2',
                        'font-black',
                        'font-softcore-black',
                        'leading-8',
                        'mb-4'
                      )}
                    >
                      {Object.keys(location)}
                    </h3>
                    <ul className="flex flex-col gap-2 mb-4">
                      {Object.values(location).map((locs) => {
                        return locs.map((l, index) => (
                          <li
                            key={index}
                            className={clsx('hover:-translate-y-1', 'transion-all', 'duration-300')}
                          >
                            <Link
                              href={l.url || '/'}
                              className={clsx(
                                'transion-all',
                                'duration-300',
                                'border-l',
                                'uppercase',
                                'text-white',
                                'text-lg',
                                'font-semibold',
                                'tracking-widest',
                                'border-white',
                                'hover:border-light',
                                'px-4',
                                'p-1',
                                'flex gap-1 flex-wrap'
                              )}
                              style={{ wordWrap: 'break-word' }}
                            >
                              <span className="text-light">{l.location_city}</span>
                              {l.location_neighbourhood}
                              {l.enable_coming_soon && (
                                <span
                                  className={clsx(
                                    'text-sm',
                                    'bg-orange',
                                    'py-1',
                                    'px-3',
                                    'uppercase',
                                    'font-light'
                                  )}
                                >
                                  Coming Soon
                                </span>
                              )}
                            </Link>
                          </li>
                        ));
                      })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </Container>
  );
};
