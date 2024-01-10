import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const MakeLogo = ({
  src,
  brand,
  className,
}: {
  src: string;
  brand: string;
  className: string;
}) => {
  return (
    <div className={cn('relative h-32 w-32 shrink-0', className)}>
      <Image
        className='object-contain dark:brightness-200 dark:contrast-200'
        src={src}
        fill={true}
        alt={brand + 'logo'}
      />
    </div>
  );
};

export default MakeLogo;
