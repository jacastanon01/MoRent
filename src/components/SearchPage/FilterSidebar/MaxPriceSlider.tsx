'use client';
import { Slider } from '@/components/ui/slider';
import { debounce } from 'lodash';
import { toast } from '@/components/ui/use-toast';
import { addOrReplaceSearchParams, cn } from '@/lib/utils';
import { Car } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { startTransition, useCallback, useState } from 'react';

const MaxPriceSlider = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => {
  const router = useRouter();
  const [maxPriceRange] = useState(
    props.cars.reduce(
      (max: number, car: Car) => (car.rentPrice > max ? car.rentPrice : max),
      0,
    ),
  );
  const searchParams = useSearchParams();
  const [maxPrice, setMaxPrice] = useState(
    (searchParams.get('maxPrice') && Number(searchParams.get('maxPrice'))) ||
      maxPriceRange,
  );

  const updateSearchParams = useCallback(
    debounce((value: number) => {
      startTransition(() => {
        try {
          if (value) {
            addOrReplaceSearchParams(
              [{ maxPrice: value.toString() }, { page: '1' }],
              router,
            );
          }
        } catch (error: any) {
          // Handle errors
          toast({
            title: 'Error searching for brand!',
            description: `Error: ${error.message}`,
            variant: 'destructive',
            duration: 2000,
          });
        }
      });
    }, 300),
    [startTransition, router], // Add dependencies here
  );

  const handleMaxPriceChange = (value: number[]) => {
    setMaxPrice(value[0] as number);
    updateSearchParams(value[0] as number);
  };
  return (
    <div
      className={cn(
        'flex flex-col gap-8 text-xl font-semibold text-gray-700',
        className,
      )}
    >
      <label className='text-xs font-semibold uppercase leading-[150%] tracking-wider text-blue-100'>
        Price
      </label>
      <div className='flex flex-col gap-3'>
        <Slider
          defaultValue={[maxPriceRange]}
          onValueChange={handleMaxPriceChange}
          value={[maxPrice]}
          max={maxPriceRange}
          step={1}
        />
        <div className='dark:text-white-200'>Max. ${maxPrice.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default MaxPriceSlider;
