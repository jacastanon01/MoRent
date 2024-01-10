'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { HiOutlineMagnifyingGlass, HiTrash } from 'react-icons/hi2';

const Button = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  props.disabled && (className += ' opacity-60 cursor-not-allowed');
  return (
    <button
      {...props}
      className={cn(
        'flex w-full items-center justify-center rounded-md bg-blue-500 py-2 px-3 text-sm font-semibold text-white gap-x-1 hover:opacity-80 sm:gap-x-1.5 sm:text-base',
        className,
      )}
    >
      {children}
    </button>
  );
};

Button.Remove = function RemoveCarButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Button styles='bg-red-600' {...props}>
      <HiTrash className='h-4 w-4' />
      {children}
    </Button>
  );
};

Button.Search = function SearchButton({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Button {...props}>
      <HiOutlineMagnifyingGlass className='h-4 w-4 sm:h-5 sm:w-5' />
      {children}
    </Button>
  );
};

Button.MobileLogin = function LoginButton({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Button
      {...props}
      className={cn(
        'mt-5 border border-blue-50 bg-white px-[35px] py-[15px] text-blue-500 dark:border-0 dark:bg-gray-700 dark:text-[#5CAFFC]',
        className,
      )}
    >
      {children}
    </Button>
  );
};

Button.DesktopLogin = function LoginButton({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Button {...props} className='sm:!min-w-[110px]'>
      {children}
    </Button>
  );
};

export default Button;
