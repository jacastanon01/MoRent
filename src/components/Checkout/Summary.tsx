'use client';

import { calculateOrderAmount, getCarById } from '@/lib/actions/cars';
import dayjs from 'dayjs';
import { Car } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { TbCalendarDown, TbCalendarUp, TbMapPin } from 'react-icons/tb';
import React, { useEffect, useState, useTransition } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import ImageSlider from '../Modals/CarDetailsPopup/ImageSlider';

const Summary = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pickupTime = searchParams.get('pickuptime');
  const dropoffTime = searchParams.get('dropofftime');
  const fromDate = searchParams.get('from');
  const fromDateFormated = dayjs(fromDate, 'YYYY-MM-DD')
    .format('DD/MM/YYYY')
    .toString();
  const toDate = searchParams.get('to');
  const toDateFormated = dayjs(toDate, 'YYYY-MM-DD')
    .format('DD/MM/YYYY')
    .toString();
  const location = searchParams.get('selectedCarLocationAddress');
  const carId = searchParams.get('carId');
  const [car, setCar] = useState<Partial<Car> | null>();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    startTransition(() => {
      if (!carId || !fromDate || !toDate || !pickupTime || !dropoffTime) return;
      getCarById(Number(carId)).then((car) => {
        setCar(car);
      });
      calculateOrderAmount({
        carId,
        fromDate,
        toDate,
        pickupTime,
        dropoffTime,
      }).then((amount) => setTotalAmount(amount));
    });
  }, [carId]);
  return isPending || !car ? (
    <div className='order-1 flex w-full shrink-0 flex-col gap-5 rounded-[10px] bg-white px-4 py-10 shadow-lg dark:bg-gray-850 md:order-2 md:max-w-[420px] md:p-[50px]'>
      <Skeleton className='h-[30px] w-[150px] rounded-lg bg-gray-800 dark:bg-white-200' />
      <div className='mt-2 flex h-56 flex-col gap-3'>
        <Skeleton className='h-2/3 w-full rounded-lg bg-gray-200 dark:bg-gray-800' />
        <div className='flex h-1/3 flex-row gap-2'>
          <Skeleton className='h-full w-1/3 rounded-lg bg-gray-200 dark:bg-gray-800' />
          <Skeleton className='h-full w-1/3 rounded-lg bg-gray-200 dark:bg-gray-800' />
          <Skeleton className='h-full w-1/3 rounded-lg bg-gray-200 dark:bg-gray-800' />
        </div>
      </div>
      <hr />
      <div className='flex items-center justify-between gap-8'>
        <Skeleton className='h-[16px] w-[170px] rounded-sm bg-gray-200 dark:bg-gray-800' />
        <Skeleton className='h-[14px] w-full rounded-sm bg-gray-800  dark:bg-white-200' />
      </div>
      <div className='flex items-center justify-between gap-8'>
        <Skeleton className='h-[16px] w-[170px] rounded-sm bg-gray-200 dark:bg-gray-800' />
        <Skeleton className='h-[14px] w-full rounded-sm bg-gray-800 dark:bg-white-200' />
      </div>
      <div className='flex items-center justify-between gap-8'>
        <Skeleton className='h-[16px] w-[170px] rounded-sm bg-gray-200 dark:bg-gray-800' />
        <Skeleton className='h-[14px] w-full rounded-sm bg-gray-800  dark:bg-white-200' />
      </div>
      <hr />
      <div className='flex items-center justify-between gap-12'>
        <Skeleton className='h-[18px] w-[190px] rounded-sm bg-gray-200 dark:bg-gray-800' />
        <Skeleton className='h-[30px] w-full rounded-sm bg-gray-800 dark:bg-white-200' />
      </div>
    </div>
  ) : (
    <div className='order-1 flex w-full shrink-0 flex-col gap-4 rounded-[10px] bg-white px-4 py-10 shadow-lg dark:bg-gray-850 md:order-2 md:max-w-[420px] md:p-[50px]'>
      <h2 className='text-3xl font-bold capitalize'>
        {car?.make} {car?.model}
      </h2>
      <div className='h-56'>
        {car && <ImageSlider carImages={car.images} />}
      </div>
      <hr />
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1 font-bold text-gray-400'>
            <TbMapPin className='stroke-gray-400' />
            Location
          </div>
          <div className='text-sm font-semibold'>{location}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1 font-bold text-gray-400'>
            <TbCalendarUp className='stroke-gray-400' />
            From
          </div>
          <div className='text-sm font-semibold'>
            {fromDateFormated} at {pickupTime}
          </div>
        </div>
        <div className='flex items-center justify-between '>
          <div className='flex items-center gap-1 font-bold text-gray-400'>
            <TbCalendarDown className='stroke-gray-400' />
            To
          </div>
          <div className='text-sm font-semibold'>
            {toDateFormated} at {dropoffTime}
          </div>
        </div>
      </div>
      <hr />

      {!!totalAmount && (
        <div className='flex h-12 items-center justify-between'>
          <div className=' h-6  text-lg font-bold text-gray-400'>
            Rental Price
          </div>
          <div className='text-3xl font-bold text-gray-900 dark:text-white'>
            ${(totalAmount / 100).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
