import Link from 'next/link';
import CarBackgroundImage from './CarBackgroundImage';
import Image from 'next/image';

const HowItWorksHero = () => {
  return (
    <section className='overflow-hidden'>
      <div className='container flex flex-col  px-[60px] lg:grid lg:grid-cols-2'>
        <div className='flex flex-col items-start gap-[18px] py-16 lg:py-32'>
          <h1 className='text-5xl font-bold leading-[120%] text-gray-900 dark:text-white lg:text-[64px]'>
            Discover, Reserve, and <span className='text-blue'>Rent a Car</span>{' '}
            with Morrent Effortlessly
          </h1>
          <h2 className='text-xl font-normal text-gray-700 dark:text-gray-400'>
            Seamless Car Rental Solutions Tailored Just for You.
          </h2>
          <Link
            href='/search'
            className='rounded-sm bg-blue px-[30px] py-[14px] text-white'
          >
            Explore Cars
          </Link>
        </div>
        <div className='relative hidden lg:block'>
          <CarBackgroundImage />
          <Image
            className='w-full object-contain'
            src='/assets/cars/jaguar.png'
            fill
            alt='Jaguar car'
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
