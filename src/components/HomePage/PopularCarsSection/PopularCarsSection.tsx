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
      <section className='relative w-full'>
        <div className='mt-[46px] flex w-full justify-between'>
          <h2 className='text-base font-semibold leading-normal text-gray-400'>
            Popular cars
          </h2>
          <Link
            href='/search'
            className='text-base font-semibold leading-normal text-blue-500'
          >
            View all
          </Link>
        </div>
        <div className='relative flex'>
          <div className='no-scrollbar peer flex justify-between gap-8 overflow-x-scroll px-5 pb-[46px] pt-[30px] lg:px-0 2xl:grid 2xl:grid-cols-4 2xl:overflow-visible'>
            {cars.map((car) => (
              <CarCard
                id={car.id!}
                key={uuidv4()}
                price={car.rentPrice ?? car.discountedPrice}
                numberOfPeople={car.capacity}
                fuelEfficiency={car.fuelEfficiency!}
                fuelEfficiencyUnit={car.fuelEfficiencyUnit!}
                type={car.type!}
                model={car.model!}
                make={car.make!}
                discountedPrice={car.discountedPrice}
                imageUrl={car.images && car.images[0]}
              />
            ))}
          </div>
          <div className='absolute right-0 h-full w-8 bg-gradient-to-l from-white-200 from-0% to-transparent to-100% peer-hover:hidden dark:hidden 2xl:hidden '></div>
          <div className='absolute right-0 hidden h-full w-8 bg-gradient-to-l from-[#1E2430] from-0% to-transparent to-100% peer-hover:hidden dark:block dark:2xl:hidden '></div>
        </div>
      </section>
    )
  );
};

export default PopularCarsSection;
