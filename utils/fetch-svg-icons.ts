import { IconTypes } from '@/helpers/SvgIcon';
import dynamic from 'next/dynamic';

export const getIconComponent = (icon: IconTypes) => {
  if (!icon) return null;
  
  // Dynamically import the icon component based on the naming convention
  // This will automatically work for any new icons added to the icons directory
  // as long as they follow the 'icon--[name].tsx' naming pattern
  return dynamic(() => import(`../helpers/SvgIcon/icons/icon--${icon}`));
};