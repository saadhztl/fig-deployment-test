import { cn } from '@/utils/cn';
import { NavigationLinks } from '../../primitives/NavigationLinks';
import { ILink } from '@/lib/generated';

export type UtilityNavigationProps = {
  utility_navigation?: {
    link?: ILink;
    opens_in_new_window: boolean;
  }[];
};

export const UtilityNavigation = ({ utility_navigation }: UtilityNavigationProps) => {
  return (
    <div className="flex-1 px-2.5">
      <div
        className={cn(
          'flex py-2.5 xl:justify-end flex-col small-mobile:flex-row',
          'tracking-[1px] divide-x-0 small-mobile:divide-x-[1px] small-mobile:divide-light'
        )}
      >
        {utility_navigation?.map((utility, index) => (
          <div
            className={cn('cursor-pointer px-0 first:ps-0 last:pe-0 small-mobile:px-2.5')}
            key={`utility-${index}`}
          >
            {utility.link?.href && (
              <NavigationLinks
                href={utility.link.href}
                className="relative underline-transition font-normal before:!h-[2px]"
                target={utility.opens_in_new_window ? '_blank' : '_self'}
              >
                {utility.link.title}
              </NavigationLinks>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
