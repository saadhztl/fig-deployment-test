import { ILink } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { NavigationLinks } from '../../primitives/NavigationLinks';

export type MainMenuNavigationProps = {
  main_navigation?: {
    menu_section?: {
      section_head?: {
        link?: ILink;
        opens_in_new_window: boolean;
      };
      section_children?: {
        link?: ILink;
        opens_in_new_window: boolean;
      }[];
    }[];
  }[];
};

export const MainMenuNavigation = ({ main_navigation }: MainMenuNavigationProps) => {
  return (
    <>
      {main_navigation?.map((column, columnIndex) => (
        <div className={cn('flex flex-col p-2.5 gap-5')} key={`column-${columnIndex}`}>
          {column.menu_section?.map((section, sectionIndex) => (
            <div className={cn('flex flex-col')} key={`section-${columnIndex}-${sectionIndex}`}>
              {section.section_head?.link?.href ? (
                <NavigationLinks
                  href={section.section_head.link.href}
                  className={cn(
                    'text-2xl leading-9 tracking-[2px] text-light font-semibold',
                    'pb-2.5'
                  )}
                  target={section.section_head.opens_in_new_window ? '_blank' : '_self'}
                >
                  {section.section_head.link.title}
                </NavigationLinks>
              ) : (
                <h2
                  className={cn(
                    'text-2xl leading-9 tracking-[2px] text-light font-semibold',
                    'pb-2.5'
                  )}
                >
                  {section.section_head?.link?.title}
                </h2>
              )}

              {section.section_children?.map((navLink, linkIndex) => (
                <h3
                  key={`link-${columnIndex}-${sectionIndex}-${linkIndex}`}
                  className={cn('mb-1.5 last:mb-0')}
                >
                  <NavigationLinks
                    activeClassName="!text-light bg-none! before:!w-full"
                    href={navLink.link?.href || ''}
                    target={navLink.opens_in_new_window ? '_blank' : '_self'}
                    className={cn(
                      'bg-clip-text text-xl relative w-fit',
                      'text-xl leading-[30px] tracking-[2px] textColor-transition underline-transition before:!-bottom-1.5'
                    )}
                  >
                    {navLink.link?.title}
                  </NavigationLinks>
                </h3>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
