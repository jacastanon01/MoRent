import { Car } from '@prisma/client';
import React from 'react';
import { CarCard } from '../shared';
import { v4 as uuidv4 } from 'uuid';
import { getFilteredCars } from '@/lib/actions/cars';

const SearchCards = async ({ options }: { options: any }) => {
  const searchResult: Car[] = await getFilteredCars(...options);
  return (
    <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
      {searchResult &&
        searchResult.map((car) => {
          return (
            <CarCard
              id={car.id!}
              key={uuidv4()}
              price={car.rentPrice! ?? car.discountedPrice}
              numberOfPeople={car.capacity}
              fuelEfficiency={car.fuelEfficiency!}
              fuelEfficiencyUnit={car.fuelEfficiencyUnit!}
              type={car.type!}
              model={car.model!}
              transmission={car.transmission!}
              make={car.make!}
              discountedPrice={car.discountedPrice || 0}
              imageUrl={car.images && car.images[0]}
            />
          );
        })}
    </div>
  );
};

export default SearchCards;
