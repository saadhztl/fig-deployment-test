import { ILink } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { NavigationLinks } from '@/components/primitives/NavigationLinks';

export type FooterNavigationProps = {
  footer_navigation?: {
    footer_navigation_items?: {
      link?: ILink;
      opens_in_new_window: boolean;
    }[];
  }[];
};

export const MainNavigation = ({ footer_navigation }: FooterNavigationProps) => {
  return (
    <div className="flex p-2.5 px-0 md:px-2.5">
      <div className={cn('flex gap-x-5 md:gap-x-10 gap-y-4', 'pt-5 md:pt-14')}>
        {footer_navigation?.map((link, index) => (
          <div key={index} className={cn('flex flex-col gap-4')}>
            {link.footer_navigation_items?.map((item, itemIndex) => (
              <NavigationLinks
                key={itemIndex}
                href={item.link?.href || ''}
                className="text-white hover:text-blue-sky uppercase font-medium leading-5"
                activeClassName="text-blue-sky"
              >
                {item.link?.title}
              </NavigationLinks>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
