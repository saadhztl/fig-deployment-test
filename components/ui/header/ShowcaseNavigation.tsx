import { ILink } from '@/lib/generated';
import { cn } from '@/utils/cn';
import { NavigationLinks } from '../../primitives/NavigationLinks';

export type ShowcaseNavigationProps = {
  showcase_navigation:
    | {
        section_head?: {
          link?: ILink;
          opens_in_new_window: boolean;
        };
        section_children?: {
          link?: ILink;
          opens_in_new_window: boolean;
        }[];
      }[]
    | undefined;
  isDesktop?: boolean;
};

export const ShowcaseNavigation = ({ showcase_navigation, isDesktop }: ShowcaseNavigationProps) => {
  return (
    <>
      {isDesktop ? (
        <div className={cn('flex items-center gap-8 h-full', 'text-white uppercase')}>
          {showcase_navigation &&
            showcase_navigation.map((section, index) => (
              <div
                key={index}
                className={cn(
                  'relative group cursor-default',
                  'textColor-transition underline-transition bg-clip-text'
                )}
              >
                {section.section_head?.link?.href ? (
                  <NavigationLinks
                    href={section.section_head.link.href}
                    target={section.section_head.opens_in_new_window ? '_blank' : '_self'}
                    activeClassName="!text-light before:!w-full"
                    className={cn('tracking-[2px] font-semibold text-[22px] leading-8')}
                  >
                    {section.section_head.link.title}
                  </NavigationLinks>
                ) : (
                  <h2 className={cn('tracking-[2px] font-semibold text-[22px] leading-8')}>
                    {section.section_head?.link?.title}
                  </h2>
                )}
                <div className={cn('absolute top-full left-0', 'hidden group-hover:block', 'py-4')}>
                  <div
                    className={cn(
                      'w-max overflow-hidden p-2',
                      'bg-light',
                      'text-black',
                      'rounded-xl'
                    )}
                  >
                    <ul
                      className="max-h-64 overflow-y-auto flex flex-col p-1"
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'var(--color-dark-olive) transparent',
                      }}
                    >
                      {section.section_children?.map((_, index) => (
                        <li
                          key={index}
                          className={cn(
                            'p-4 border-b border-b-gray-700 last:border-b-0 hover:bg-dark-olive hover:text-light text-xl leading-[30px] tracking-[2px]'
                          )}
                        >
                          <NavigationLinks
                            href={_.link?.href || ''}
                            target={_.opens_in_new_window ? '_blank' : '_self'}
                            className="w-full inline-block"
                          >
                            {_.link?.title}
                          </NavigationLinks>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex-1 block">
          <div className={cn('flex flex-col p-2.5 gap-5')}>
            {showcase_navigation?.map((section, sectionIndex) => (
              <div className={cn('flex flex-col')} key={`section-${sectionIndex}`}>
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
                  <h3 key={`link-${sectionIndex}-${linkIndex}`} className={cn('mb-1.5 last:mb-0')}>
                    <NavigationLinks
                      activeClassName="!text-light before:!w-full"
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
        </div>
      )}
    </>
  );
};
