'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { addOrReplaceSearchParams, cn } from '@/lib/utils';
import { Car } from '@prisma/client';

import { useRouter, useSearchParams } from 'next/navigation';

import { startTransition, useState } from 'react';

export function CapacityFilter({
  className,
  cars,
  filteredCars,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCapacity, setSelectedCapacity] = useState<string[]>(
    (searchParams.get('capacity') &&
      searchParams.get('capacity')?.split(',')) ||
      [],
  );

  const handleCheck = (checked: boolean | string, capacity: string) => {
    let newSelectedCapacity = [...selectedCapacity];
    if (checked) {
      newSelectedCapacity = [...newSelectedCapacity, capacity];
    } else {
      newSelectedCapacity = newSelectedCapacity.filter(
        (selectedCapacity) => selectedCapacity !== capacity,
      );
    }

    startTransition(() => {
      try {
        setSelectedCapacity(newSelectedCapacity);
        addOrReplaceSearchParams(
          [{ capacity: newSelectedCapacity.join(',') }, { page: '1' }],
          router,
        );
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
  };

  function getCarCapacities(carArray: Partial<Car>[]) {
    const capacities = new Set<Number>();
    carArray.forEach((car) => {
      if (car.capacity) {
        capacities.add(car.capacity);
      }
    });
    return Array.from(capacities);
  }

  function countCarCapacities(capacities: Number[], carArray: Partial<Car>[]) {
    const capacityCount: { [key: string]: number } = {};
    capacities.forEach((capacity) => {
      capacityCount[capacity.toString()] = 0;
    }); // Initialize capacityCount object

    carArray.forEach((car) => {
      const capacity = car.capacity || 'Unknown'; // Handle undefined capacity
      // eslint-disable-next-line no-prototype-builtins
      if (capacityCount.hasOwnProperty(capacity.toString())) {
        capacityCount[capacity.toString()]++;
      }
    });

    return Object.entries(capacityCount).map(([capacity, count]) => ({
      capacity,
      count,
    }));
  }

  const allCapacities = getCarCapacities(cars);
  const capacitiesArray = countCarCapacities(allCapacities, filteredCars).sort(
    (a, b) => Number(a.capacity) - Number(b.capacity),
  );

  return (
    <div
      className={cn(
        'flex flex-col gap-8 text-xl font-semibold text-gray-700',
        className,
      )}
    >
      <h2 className='text-xs font-semibold uppercase leading-[150%] tracking-wider text-blue-100'>
        Capacity
      </h2>
      {capacitiesArray.map((capacity) => (
        <div key={capacity.capacity} className='flex items-center gap-2'>
          <Checkbox
            checked={selectedCapacity.some(
              (selectedCapacity) => selectedCapacity === capacity.capacity,
            )}
            id={capacity.capacity.toString()}
            name={capacity.capacity.toString()}
            className='h-6 w-6 rounded-md !border-blue-50 data-[state=checked]:!border-blue-500 '
            onCheckedChange={(checked) =>
              handleCheck(checked, capacity.capacity)
            }
          />
          <label
            htmlFor={capacity.capacity.toString()}
            className='flex cursor-pointer gap-1 dark:text-white-100'
          >
            {capacity.capacity.toString() + ' Person'}
            <span className='font-medium text-gray-400'>
              ({capacity.count})
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}
