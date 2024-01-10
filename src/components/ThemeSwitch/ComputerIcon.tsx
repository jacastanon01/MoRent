import { cn } from '@/lib/utils';
import React from 'react';

const ComputerIcon = ({ ...props }: { [key: string]: any }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '20'}
      height={props.height || '20'}
      viewBox='0 0 13 13'
      fill='none'
    >
      <path
        d='M7.15001 9.74998V11.05H9.75001V12.35H3.25002V11.05H5.85002V9.74998H0.644831C0.559422 9.74947 0.474954 9.7321 0.396275 9.69886C0.317596 9.66563 0.246254 9.61718 0.186345 9.5563C0.126435 9.49543 0.079137 9.42332 0.0471647 9.34412C0.0151924 9.26492 -0.000824653 9.18018 3.26842e-05 9.09478V0.655198C3.26842e-05 0.293149 0.295782 0 0.644831 0H12.3552C12.7114 0 13 0.291849 13 0.654548V9.09478C13 9.45683 12.7043 9.74998 12.3552 9.74998H7.15001Z'
        className={cn(
          'fill-blue duration-500 hover:fill-blue-400',
          props.className,
        )}
      />
    </svg>
  );
};

export default ComputerIcon;
