'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/utils/cn';

interface NavigationLinkProps {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
  target?: string;
  style?: React.CSSProperties;
}

export const NavigationLinks = ({
  href,
  className,
  children,
  activeClassName,
  target,
  style,
}: NavigationLinkProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(className, pathname === href && activeClassName)}
      target={target}
      style={style}
    >
      {children}
    </Link>
  );
};
