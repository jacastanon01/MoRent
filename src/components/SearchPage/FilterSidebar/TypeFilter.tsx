'use client';
import { Car } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { addOrReplaceSearchParams, cn } from '@/lib/utils';

export function TypeFilter({
  className,
  cars,
  filteredCars,
  ...props
}: {
  className?: string;
  cars: Partial<Car>[];
  filteredCars: Partial<Car>[];
  [key: string]: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    (searchParams.get('types') && searchParams.get('types')?.split(',')) || [],
  );

  function getCarTypes(carArray: Partial<Car>[]) {
    const types = new Set<string>();
    carArray.forEach((car) => {
      if (car.type) {
        types.add(car.type);
      }
    });
    return Array.from(types);
  }

  function countCarTypes(types: string[], carArray: Partial<Car>[]) {
    const typeCount: { [key: string]: number } = {};
    types.forEach((type) => {
      typeCount[type] = 0;
    }); // Initialize typeCount object

    carArray.forEach((car) => {
      const type = car.type || 'Unknown'; // Handle undefined types
      // eslint-disable-next-line no-prototype-builtins
      if (typeCount.hasOwnProperty(type)) {
        typeCount[type]++;
      }
    });

    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
    }));
  }

  const allTypes = getCarTypes(cars);
  const typesArray = countCarTypes(allTypes, filteredCars!).sort((a, b) =>
    a.type.localeCompare(b.type),
  );

  const handleCheck = (checked: boolean | string, type: string) => {
    let newSelectedTypes = [...selectedTypes];
    if (checked) {
      newSelectedTypes = [...newSelectedTypes, type];
    } else {
      newSelectedTypes = newSelectedTypes.filter((t) => t !== type);
    }

    startTransition(() => {
      try {
        setSelectedTypes(newSelectedTypes);
        addOrReplaceSearchParams(
          [{ types: newSelectedTypes.join(',') }, { page: '1' }],
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

  return (
    <div
      className={cn(
        'flex flex-col gap-8 text-xl font-semibold text-gray-700',
        className,
      )}
    >
      <h2 className='text-xs font-semibold uppercase leading-[150%] tracking-wider text-blue-100'>
        Type
      </h2>
      {typesArray.map((types) => (
        <div
          key={types.type}
          className='flex cursor-pointer items-center gap-2'
        >
          <Checkbox
            id={types.type}
            name={types.type}
            checked={selectedTypes.includes(types.type)}
            className='h-6 w-6 rounded-md !border-blue-50 data-[state=checked]:!border-blue-500'
            onCheckedChange={(checked) => handleCheck(checked, types.type)}
          />
          <label
            htmlFor={types.type}
            className='flex cursor-pointer gap-1 dark:text-white-100'
          >
            {types.type}
            <span className='font-medium text-gray-400'>({types.count})</span>
          </label>
        </div>
      ))}
    </div>
  );
}
