import React from 'react';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { StylingOptions } from '@/lib/types';
import { CSLPFieldMapping } from '@/lib/generated';
import { getCSLPAttributes } from '@/lib/type-guards';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  target?: '_self' | '_blank';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  styling_options?: StylingOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  $?: CSLPFieldMapping;
}

export const Button = ({
  children,
  href,
  target = '_self',
  onClick,
  className,
  disabled,
  styling_options,
  $,
  ...rest
}: ButtonProps) => {
  const baseStyles = {
    base: 'py-3 px-16 md:w-auto w-full border rounded-md uppercase text-center border-white font-extrabold',
    hover: 'hover:cursor-pointer transition-all duration-300',
    disabled: 'disabled:cursor-not-allowed disabled:opacity-70',
    active: '',
  };

  // const variantStyles = {
  //   default: 'bg-white text-black hover:bg-transparent hover:text-white',
  //   outline: 'border-white text-white hover:bg-white hover:text-black',
  //   link: 'border-transparent text-white hover:text-gray-300 underline',
  // } as const;

  // const variantKey = variant.toLowerCase() as keyof typeof variantStyles;
  // const selectedVariantStyle = variantStyles[variantKey] || variantStyles.default;

  const combinedClassName = cn(
    Object.values({
      ...baseStyles,
    }).join(' '),
    className,
    styling_options &&
      'hover:bg-[var(--hover-background-color)]! hover:text-[var(--hover-text-color)]! hover:border-[var(--hover-border-color)]!'
  );

  const CTAStyle = {
    color: styling_options?.text_color?.dropdown,
    borderColor: styling_options?.border_color?.dropdown,
    backgroundColor: styling_options?.background_color?.dropdown,
    '--hover-text-color': styling_options?.hover_text_color?.dropdown,
    '--hover-background-color': styling_options?.hover_background_color?.dropdown,
    '--hover-border-color': styling_options?.hover_border_color?.dropdown,
  } as React.CSSProperties;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={combinedClassName}
        style={styling_options && CTAStyle}
        onClick={onClick}
        {...rest}
        {...getCSLPAttributes($)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClassName}
      style={styling_options && CTAStyle}
      disabled={disabled}
      {...rest}
      {...getCSLPAttributes($)}
    >
      {children}
    </button>
  );
};
