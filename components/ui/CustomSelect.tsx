'use client';
import { FAIcons } from '@/helpers/FAIcons';
import { IColorDropdown, ILocationEntity } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';
import { createPortal } from 'react-dom';
import ModalWrapper from '@/helpers/ModalWrapper';
import { HealCodeWidget } from './HealCodeWidget';

type CustomSelectProps = {
  dropdown_label?: string;
  location_url_type?: string;
  locationEntities: ILocationEntity[];
  styling_options?: {
    dropdown_icon_options?: {
      icon_color?: IColorDropdown;
      hover_icon_color?: IColorDropdown;
      background_color?: IColorDropdown;
      hover_background_color?: IColorDropdown;
    };
    dropdown_list_options?: {
      text_color?: IColorDropdown;
      hover_text_color?: IColorDropdown;
      background_color?: IColorDropdown;
      hover_background_color?: IColorDropdown;
    };
    dropdown_button_options?: {
      text_color?: IColorDropdown;
      hover_text_color?: IColorDropdown;
      background_color?: IColorDropdown;
      hover_background_color?: IColorDropdown;
    };
    border_color?: IColorDropdown;
    dropdown_horizontal_alignment?: ('justify-start' | 'justify-center' | 'justify-end') | null;
  };
};
export const CustomSelect = ({
  dropdown_label,
  location_url_type,
  locationEntities,
  styling_options,
}: CustomSelectProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [selectedOption, setSelectedOption] = useState<string | undefined>(dropdown_label);
  const [options, setOptions] = useState<ILocationEntity[]>(locationEntities);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupWidgetOptions, setPopupWidgetOptions] = useState<ILocationEntity>();
  const [dropdownContainerPosition, setDropdownContainerPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const { globalLabels } = useGlobalLabels();

  const updateDirection = useCallback(() => {
    if (!dropdownRef.current) return;
    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDirection('up');
    } else {
      setDirection('down');
    }
  }, []);

  const toggleDropdown = () => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDirection('up');
    } else {
      setDirection('down');
    }

    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: ILocationEntity) => {
    if (location_url_type === 'mindbody_popup') {
      if (option?.widget_type && option?.widget_partner && option?.widget_id) {
        setPopupWidgetOptions(option);
        setIsPopupOpen(true);
      }
    } else {
      setSelectedOption(option.location_area);
      setIsOpen(false);
      if (location_url_type && location_url_type in option) {
        const url = option[location_url_type as keyof ILocationEntity];
        if (typeof url === 'string' && url) {
          router.push(url);
        }
      }
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const setPosition = () => {
    if (dropdownRef.current) {
      setDropdownContainerPosition({
        top:
          dropdownRef.current.getBoundingClientRect().top +
          window.scrollY +
          dropdownRef.current.offsetHeight,
        left: dropdownRef.current.getBoundingClientRect().left + window.scrollX,
      });
    }
  };

  // Debounced scroll handlers
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const directionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedSetPosition = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setPosition();
    }, 150);
  }, []);

  const debouncedUpdateDirection = useCallback(() => {
    if (directionTimeoutRef.current) {
      clearTimeout(directionTimeoutRef.current);
    }
    directionTimeoutRef.current = setTimeout(() => {
      updateDirection();
    }, 100);
  }, [updateDirection]);

  useEffect(() => {
    window.addEventListener('scroll', debouncedSetPosition);

    return () => {
      window.removeEventListener('scroll', debouncedSetPosition);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [debouncedSetPosition]);

  useEffect(() => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 200 && spaceAbove > spaceBelow) {
      setDirection('up');
    } else {
      setDirection('down');
    }

    if (dropdownRef.current) {
      setDropdownContainerPosition({
        top: dropdownRef.current.getBoundingClientRect().top + window.scrollY,

        left: dropdownRef.current.getBoundingClientRect().left + window.scrollX,
      });
    }
  }, []);

  useEffect(() => {
    if (searchValue.length > 0) {
      setOptions(
        locationEntities.filter((option) =>
          option.location_area?.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setOptions(locationEntities);
    }
  }, [searchValue, locationEntities]);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('scroll', debouncedUpdateDirection);

    return () => {
      window.removeEventListener('scroll', debouncedUpdateDirection);
      if (directionTimeoutRef.current) {
        clearTimeout(directionTimeoutRef.current);
      }
    };
  }, [isOpen, debouncedUpdateDirection]);

  useEffect(() => {
    if (!isOpen) return;

    setSearchValue('');
    setOptions(locationEntities);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const renderOptions = () => {
    if (options.length === 0) {
      return (
        <li
          className={cn('px-3 py-4 font-semibold tracking-[2px] uppercase')}
          style={
            {
              color: styling_options?.dropdown_list_options?.text_color?.dropdown,
            } as React.CSSProperties
          }
        >
          {globalLabels.no_results_found_label}
        </li>
      );
    }
    return options.map((option) => (
      <li
        key={option.uid}
        className={cn(
          'px-3 py-4 hover:bg-[var(--hover-background-color)]! hover:text-[var(--hover-text-color)]! font-semibold tracking-[2px] uppercase cursor-pointer'
        )}
        style={
          {
            color: styling_options?.dropdown_list_options?.text_color?.dropdown,
            '--hover-background-color':
              styling_options?.dropdown_list_options?.hover_background_color?.dropdown,
            '--hover-text-color':
              styling_options?.dropdown_list_options?.hover_text_color?.dropdown,
          } as React.CSSProperties
        }
        onClick={() => handleOptionClick(option)}
      >
        {option.location_area}
      </li>
    ));
  };

  return (
    <>
      <div
        role="combobox"
        aria-haspopup={true}
        aria-expanded={isOpen}
        tabIndex={0}
        aria-disabled={false}
        className={cn('w-full md:w-fit cursor-pointer min-w-[300px]')}
      >
        <button
          ref={dropdownRef}
          onClick={toggleDropdown}
          className={cn(
            'flex items-center relative px-4 py-2 border rounded-3xl w-full cursor-pointer'
          )}
          style={
            {
              backgroundColor: isOpen
                ? styling_options?.dropdown_button_options?.hover_background_color?.dropdown
                : styling_options?.dropdown_button_options?.background_color?.dropdown,
              color: isOpen
                ? styling_options?.dropdown_button_options?.hover_text_color?.dropdown
                : styling_options?.dropdown_button_options?.text_color?.dropdown,
              borderColor: styling_options?.border_color?.dropdown,
              zIndex: 1001,
            } as React.CSSProperties
          }
        >
          <span className={cn('text-lg font-medium tracking-[2px] uppercase')}>
            {selectedOption}
          </span>
          <span
            className={cn(
              'absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center'
            )}
          >
            <b
              className={cn('rounded-full w-7 h-7 relative')}
              style={
                {
                  backgroundColor: isOpen
                    ? styling_options?.dropdown_icon_options?.hover_background_color?.dropdown
                    : styling_options?.dropdown_icon_options?.background_color?.dropdown, //this color will be used for the background color of the dropdown icon.
                } as React.CSSProperties
              }
            >
              <FAIcons
                iconCode="fas fa-arrow-up"
                className={cn(
                  'absolute left-1 top-1 transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
                style={
                  {
                    color: isOpen
                      ? styling_options?.dropdown_icon_options?.hover_icon_color?.dropdown //this color will be used for the text color of the dropdown icon.
                      : styling_options?.dropdown_icon_options?.icon_color?.dropdown,
                  } as React.CSSProperties
                }
              ></FAIcons>
            </b>
          </span>
        </button>

        {isOpen &&
          createPortal(
            <div
              className={cn('absolute')}
              style={{
                top:
                  direction === 'up'
                    ? dropdownContainerPosition.top - 355
                    : dropdownContainerPosition.top + 10,
                left: dropdownContainerPosition.left,
                zIndex: 11,
              }}
            >
              <div
                ref={dropdownContainerRef}
                className={cn(
                  'max-h-[300px] min-w-[300px] absolute rounded-3xl py-6 overflow-hidden border w-full md:w-fit'
                )}
                style={
                  {
                    backgroundColor:
                      styling_options?.dropdown_list_options?.background_color?.dropdown,
                    borderColor: styling_options?.border_color?.dropdown,
                  } as React.CSSProperties
                }
              >
                <div className={cn('p-3')}>
                  <input
                    type="search"
                    tabIndex={0}
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    role="searchbox"
                    aria-autocomplete="list"
                    autoComplete="off"
                    aria-label="Search"
                    placeholder="Type to search..."
                    autoFocus
                    value={searchValue}
                    className={cn('w-full rounded-3xl px-4 py-2.5 bg-white outline-none')}
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px inset',
                    }}
                    onChange={(e) => handleSearch(e.target.value)}
                  ></input>
                </div>
                <ul
                  className={cn(
                    'overflow-y-auto max-h-52 flex flex-col h-full location-dropdown-list'
                  )}
                >
                  {renderOptions()}
                </ul>
              </div>
            </div>,
            document.body
          )}
      </div>
      <ModalWrapper
        position="center"
        outSideClick={false}
        onClose={() => setIsPopupOpen(false)}
        state={isPopupOpen}
        containerClasses="p-2 md:p-5 bg-white border border-white rounded-none w-full lg:w-1/2 max-h-fit rounded-[20px] border-3 border-light"
        enableCloseButton={true}
      >
        <div className="w-full h-full overflow-auto max-h-11/12 px-4 border-1 border-dark/20">
          <HealCodeWidget
            widgetType={popupWidgetOptions?.widget_type}
            widgetPartner={popupWidgetOptions?.widget_partner}
            widgetId={popupWidgetOptions?.widget_id}
            widgetVersion={0}
          />
        </div>
      </ModalWrapper>
    </>
  );
};
