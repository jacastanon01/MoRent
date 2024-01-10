import React from 'react';
import GenerateReceiptButton from './GenerateReceiptButton';
import Image from 'next/image';
import Link from 'next/link';

const PaymentSuccessful = () => {
  return (
    <>
      <h2 className='mb-5 text-base font-normal text-gray-400 md:text-lg'>
        Thank You For Your Purchase
      </h2>
      <Image
        src='/assets/check.png'
        width={120}
        height={120}
        alt='check icon'
      />
      <h1 className='mt-6 text-2xl font-bold text-gray-900 dark:text-white md:text-[32px]'>
        Payment Successful
      </h1>
      <Link
        className='mt-2 flex h-14 w-full items-center justify-center rounded-[10px] bg-blue font-bold text-white'
        href='/profile'
      >
        View Rented Car
      </Link>
      <GenerateReceiptButton />
    </>
  );
};

export default PaymentSuccessful;
