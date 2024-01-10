import Link from 'next/link';
import { cookies } from 'next/headers';
import React from 'react';

import { CarCard } from '@/components/shared';
import { getPopularCars } from '@/lib/actions/cars';
import { v4 as uuidv4 } from 'uuid';

const PopularCarsSection = async () => {
  const cookieStore = cookies();

  const latitude = Number(cookieStore.get('latitude')?.value);
  const longitude = Number(cookieStore.get('longitude')?.value);
  const cars =
    !latitude || !longitude
      ? await getPopularCars()
      : await getPopularCars(latitude, longitude);

  return (
    !!cars.length && (
      <section className='container relative py-[100px] '>
        <div className='flex flex-col items-center gap-[10px]'>
          <h2 className='text-lg font-normal uppercase leading-[200%] tracking-widest text-gray-700 dark:text-gray-400 '>
            Popular Rental Deals
          </h2>
          <h3 className='text-4xl font-bold leading-[120%] text-gray-900 dark:text-white'>
            Car Selections That Suit Your Style
          </h3>
        </div>
        <div className='no-scrollbar flex justify-between gap-8 overflow-x-scroll pb-[100px] pt-[30px] 2xl:grid 2xl:grid-cols-4 2xl:overflow-visible'>
          {cars.map((car) => (
            <CarCard
              id={car.id!}
              key={uuidv4()}
              price={car.rentPrice}
              discountedPrice={car.discountedPrice}
              numberOfPeople={car.capacity}
              fuelEfficiency={car.fuelEfficiency!}
              fuelEfficiencyUnit={car.fuelEfficiencyUnit!}
              type={car.type!}
              model={car.model!}
              make={car.make!}
              imageUrl={car.images && car.images[0]}
            />
          ))}
          <div className='absolute right-0 h-full w-8 bg-gradient-to-l from-white-200 from-0% to-transparent to-100% group-hover:hidden dark:hidden 2xl:hidden'></div>
          <div className='absolute right-0 hidden h-full w-8 bg-gradient-to-l from-gray-900 from-0% to-transparent to-100% group-hover:hidden dark:block dark:2xl:hidden'></div>
        </div>
        <div className='mt-16 flex items-center justify-center'>
          <Link
            className='flex h-14 w-[228px] items-center justify-center rounded-lg bg-blue-500 text-base font-bold text-white hover:bg-blue-700'
            href='/search'
          >
            Show more cars
          </Link>
        </div>
      </section>
    )
  );
};

export default PopularCarsSection;
