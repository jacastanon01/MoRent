import React from 'react';

import { CarCard } from '..';
import type { Car } from '@prisma/client';

const CarsListGrid = ({
  title,
  cars,
}: {
  title: string;
  cars: Car[] | null;
}) => {
  return (
    cars &&
    cars.length > 0 && (
      <section className='w-full pt-12'>
        <div className=' mb-5 flex w-full justify-start'>
          <h2 className='text-xl font-bold capitalize leading-normal tracking-wide text-gray-400'>
            My {title}
          </h2>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {cars.map((car) => (
            <CarCard
              id={car.id}
              key={car.id}
              price={car.rentPrice}
              numberOfPeople={car.capacity}
              fuelEfficiency={car.fuelEfficiency!}
              fuelEfficiencyUnit={car.fuelEfficiencyUnit!}
              type={car.type!}
              model={car.model!}
              make={car.make!}
              discountedPrice={car.discountedPrice || 0}
              imageUrl={car.images && car.images[0]}
              transmission={car.transmission!}
            />
          ))}
        </div>
      </section>
    )
  );
};

export default CarsListGrid;
