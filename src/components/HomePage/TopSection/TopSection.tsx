import React from 'react';
import LeftBackgroundImage from './LeftBackgroundImage';
import RightBackgroundImage from './RightBackgroundImage';
import Image from 'next/image';

const TopSection = () => {
  return (
    <section className='grid grid-cols-1 gap-8 md:grid-cols-2'>
      <div className='relative flex h-[360px] w-full flex-col justify-between overflow-hidden rounded-[10px] bg-blue-300 p-6 '>
        <LeftBackgroundImage />
        <div className='flex flex-col gap-4'>
          <h1 className='h1-semibold max-w-[272px] text-white'>
            The Best Platform for Car Rental
          </h1>
          <p className='max-w-[284px] text-base font-medium leading-[160%] text-white'>
            Ease of doing car rental safely and reliably, and at a low price.
          </p>
        </div>
        <Image
          className='relative mx-auto'
          src='/assets/cars/koenigsegg.png'
          alt='Koenigsegg'
          height={116}
          width={406}
        />
      </div>
      <div className='relative hidden h-[360px] w-full flex-col justify-between overflow-hidden rounded-[10px] bg-blue-600 p-6 md:flex'>
        <RightBackgroundImage />
        <div className='flex flex-col gap-4'>
          <h2 className='h1-semibold max-w-[272px] text-white'>
            Easy way to rent a car at a low price
          </h2>
          <p className='max-w-[284px] text-base font-medium leading-[160%] text-white'>
            Providing cheap car rental services and safe and comfortable
            facilities.
          </p>
        </div>
        <Image
          className='relative mx-auto'
          src='/assets/cars/nissan-gtr.png'
          alt='Koenigsegg'
          height={108}
          width={340}
        />
      </div>
    </section>
  );
};

export default TopSection;
