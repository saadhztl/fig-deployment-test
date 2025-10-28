import { cn } from '@/utils/cn';

interface FAIconProps {
  iconCode?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FAIcons = ({ iconCode, className, style }: FAIconProps) => {
  return <i className={cn(iconCode, className)} style={style}></i>;
};
