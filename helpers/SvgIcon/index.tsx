// // Global
// import { cn } from "@/utils/cn";
// import dynamic from "next/dynamic";
// import React from "react";

// /**
//  * Standardize SVG icons on a 48x48 grid to allow
//  * for consistent use across the project
//  *
//  * Icon contents should be stored in the icons subdirectory
//  * using the naming scheme 'icon--[name].tsx'
//  */

// export type IconTypes = undefined | "arrow-up" | "arrow-down" | "hamburger";

// export type SVGFill = "currentColor" | "none";

// export interface SvgIconProps {
//   className?: string;
//   fill?: SVGFill; // The "fill" attribute must be applied to individual <path /> tags in order to be effective. Applying it to <svg /> does nothing.
//   icon: IconTypes;
//   viewBox?: string; // This could pretty easily be hard coded as the "size" attribute is doing the hard work here.
//   title?: string;
// }

// // Icon component mapping

// const SvgIcon = ({
//   fill = "currentColor",
//   icon,
//   viewBox = "0 0 24 24",
//   title,
//   className,
// }: SvgIconProps): React.ReactElement => {
//   const IconContent = dynamic(
//     () => import(`../../helpers/SvgIcon/icons/icon--${icon}`)
//   );

//   if (!icon || !IconContent) return <></>;

//   return (
//     <svg
//       className={cn("", className)}
//       fill={fill}
//       viewBox={viewBox}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       {title && <title>{title}</title>}
//       <IconContent />
//     </svg>
//   );
// };

// export default React.memo(SvgIcon);

import { cn } from '@/utils/cn';
import React from 'react';
import { iconMap } from '@/helpers/SvgIcon/iconMap';

export type IconTypes = keyof typeof iconMap;
export type SVGFill = 'currentColor' | 'none';

export interface SvgIconProps {
  className?: string;
  fill?: SVGFill;
  icon: IconTypes;
  viewBox?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

const SvgIcon = ({
  fill = 'currentColor',
  icon,
  viewBox = '0 0 24 24',
  title,
  className,
  ...rest
}: SvgIconProps): React.ReactElement | null => {
  const IconComponent = iconMap[icon];

  if (!IconComponent) return null;

  return (
    <svg
      className={cn('', className)}
      fill={fill}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title && <title>{title}</title>}
      <IconComponent />
    </svg>
  );
};

export default React.memo(SvgIcon);
