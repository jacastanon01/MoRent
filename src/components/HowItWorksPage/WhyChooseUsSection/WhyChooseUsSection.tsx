import Image from 'next/image';
import React from 'react';
import UserIcon from './UserIcon';
import SecureIcon from './SecureIcon';
import MessageIcon from './MessageIcon';

const WhyChooseUsSection = () => {
  return (
    <section className='bg-white-100 dark:bg-gray-850'>
      <div className='flex flex-col items-center justify-center md:grid md:grid-cols-2'>
        <div className='map-background dark:map-background-dark flex justify-end gap-8 bg-gradient-to-l from-white-200 to-transparent py-16 dark:from-gray-850 md:py-24'>
          <Image
            src='/assets/black-car-with-cards.png'
            width={682}
            height={638}
            className='relative z-10 dark:hidden'
            alt='black car with cards'
          />
          <Image
            src='/assets/black-car-with-cards-dark.png'
            width={682}
            height={638}
            className='relative z-10 hidden dark:block'
            alt='black car with cards'
          />
        </div>
        <div className='flex flex-col items-start gap-16 px-8  py-16 md:py-24'>
          <div className='flex max-w-[506px] flex-col items-start gap-[10px]'>
            <h2 className='text-lg font-normal uppercase leading-[200%] tracking-widest text-gray-700 dark:text-gray-400 '>
              Why choose us
            </h2>
            <h3 className='text-4xl font-bold leading-[120%] text-gray-900 dark:text-white'>
              We offer the best experience with our rental deels
            </h3>
          </div>

          <div className='flex flex-col gap-12'>
            <div className='flex max-w-[430px] gap-[14px]'>
              <div className='flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[10px] bg-white dark:bg-gray-900'>
                <UserIcon />
              </div>
              <div className='flex flex-col justify-center'>
                <h4 className='text-xl font-bold leading-[130%] text-gray-850 dark:text-white'>
                  User-Centric Service
                </h4>
                <p className='text-base font-medium leading-[160%] dark:text-gray-400'>
                  Our Focus is You - Enjoy Hassle-Free Rentals Tailored to Your
                  Needs
                </p>
              </div>
            </div>
            <div className='flex max-w-[430px] gap-[14px]'>
              <div className='flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[10px] bg-white dark:bg-gray-900'>
                <SecureIcon />
              </div>
              <div className='flex flex-col justify-center'>
                <h4 className='text-xl font-bold leading-[130%] text-gray-850 dark:text-white'>
                  User-Centric Service
                </h4>
                <p className='text-base font-medium leading-[160%] dark:text-gray-400'>
                  Our Focus is You - Enjoy Hassle-Free Rentals Tailored to Your
                  Needs
                </p>
              </div>
            </div>
            <div className='flex max-w-[430px] gap-[14px]'>
              <div className='flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[10px] bg-white dark:bg-gray-900'>
                <MessageIcon />
              </div>
              <div className='flex flex-col justify-center'>
                <h4 className='text-xl font-bold leading-[130%] text-gray-850 dark:text-white'>
                  User-Centric Service
                </h4>
                <p className='text-base font-medium leading-[160%] dark:text-gray-400'>
                  Our Focus is You - Enjoy Hassle-Free Rentals Tailored to Your
                  Needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
