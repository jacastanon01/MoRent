import { cn } from '@/lib/utils';

const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn(className)}
    >
      <path
        d='M11.5 20.16C16.7467 20.16 21 16.0769 21 11.04C21 6.00321 16.7467 1.92004 11.5 1.92004C6.25329 1.92004 2 6.00321 2 11.04C2 16.0769 6.25329 20.16 11.5 20.16Z'
        stroke='#3D5278'
        strokeWidth='1.5'
        strokeLinecap='round'
        className={cn(className)}
        strokeLinejoin='round'
      />
      <path
        d='M22 21.12L20 19.2'
        stroke='#3D5278'
        strokeWidth='1.5'
        className={cn(className)}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SearchIcon;
