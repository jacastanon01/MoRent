import { CarCard } from '@/components/shared';
import { getRecomendedCars } from '@/lib/actions/cars';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

const RecommendedCarsSection = async () => {
  const cookieStore = cookies();

  const latitude = Number(cookieStore.get('latitude')?.value);
  const longitude = Number(cookieStore.get('longitude')?.value);
  const cars =
    !latitude || !longitude
      ? await getRecomendedCars()
      : await getRecomendedCars(latitude, longitude);

  return (
    !!cars.length && (
      <section className='w-full'>
        <div className='mb-[30px] flex w-full justify-start'>
          <h2 className='text-base font-semibold leading-normal text-gray-400'>
            Recommended cars
          </h2>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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

export default RecommendedCarsSection;
