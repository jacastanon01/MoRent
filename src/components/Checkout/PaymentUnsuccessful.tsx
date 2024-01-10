import React from 'react';
import Image from 'next/image';
import GoBackButton from '../shared/GoBackButton/GoBackButton';

const PaymentUnsuccessful = () => {
  return (
    <>
      <h2 className='mb-5 text-base font-normal text-gray-400 md:text-lg'>
        There was an error making payment
      </h2>
      <Image
        src='/assets/red_attention.png'
        width={120}
        height={120}
        alt='attention icon'
      />
      <h1 className='mt-6 text-2xl font-bold text-gray-900 dark:text-white md:text-[32px]'>
        Payement Unsuccessful
      </h1>
      <GoBackButton />
    </>
  );
};

export default PaymentUnsuccessful;
