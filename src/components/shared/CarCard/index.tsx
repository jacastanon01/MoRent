import React from 'react';

import Image from 'next/image';

import HeartButton from './HeartButton';
import GasIcon from './GasIcon';
import WheelIcon from './WheelIcon';
import PeopleIcon from './PeopleIcon';
import MoreInfoButton from './MoreInfoButton';
import { isUserCarOwner } from '@/lib/actions/cars';
import EditCarButton from './EditCarButton';
import OpenCarPopupButton from './OpenCarPopupButton';
import TrashIcon from './TrashIcon';

const CarCard = async ({
  id,
  model,
  discountedPrice,
  make,
  type,
  fuelEfficiency,
  fuelEfficiencyUnit,
  price,
  imageUrl = '/assets/cars/koenigsegg.png',
  numberOfPeople,
  transmission,
}: {
  id: number;
  make: string;
  model: string;
  type: string;
  fuelEfficiency: Number;
  fuelEfficiencyUnit: string;
  price: Number;
  transmission?: string;
  imageUrl?: string;
  numberOfPeople?: Number;
  discountedPrice?: number | undefined;
}) => {
  const carSpecs = [
    {
      img: <GasIcon />,
      text: `${fuelEfficiency}${fuelEfficiencyUnit}`,
    },
    {
      img: <WheelIcon />,
      text: transmission?.toLocaleLowerCase(),
    },
    {
      img: <PeopleIcon />,
      text: `${numberOfPeople} People`,
    },
  ];

  const isCurrentUserOwner = await isUserCarOwner(id);
  return (
    <OpenCarPopupButton
      id={id}
      isCurrentUserOwner={isCurrentUserOwner || undefined}
    >
      <article className='group flex h-full min-w-[300px] shrink-0 flex-col justify-between rounded-[10px] border-2 bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-50 dark:bg-gray-850 dark:hover:shadow-blue-900'>
        {/* Top Section of the car */}
        <div className='mb-16 flex items-start justify-between'>
          <div className='flex flex-col gap-1 capitalize'>
            <h2 className='text-xl font-bold leading-[130%] text-gray-900 dark:text-white'>
              {make + ' ' + model}
            </h2>
            <h3 className='text-sm font-bold leading-normal text-gray-400'>
              {type}
            </h3>
          </div>
          {!isCurrentUserOwner ? (
            <HeartButton carId={id} />
          ) : (
            <TrashIcon carId={id} />
          )}
        </div>

        {/* Image */}
        <div className='relative h-[96px] w-full'>
          <Image
            src={imageUrl || '/assets/cars/koenigsegg.png'}
            fill
            className='object-contain transition-all duration-300 ease-in-out group-hover:scale-110'
            alt='Keonigssegg'
          />
          <div className='absolute bottom-0 w-full bg-gradient-to-t from-white from-5% to-transparent to-45% bg-size-200 bg-pos-100 py-6 transition-all duration-300 ease-in-out group-hover:bg-pos-0 dark:hidden'></div>
          <div className='hover: absolute bottom-0 hidden w-full bg-gradient-to-t from-gray-850 from-5% to-transparent to-45% bg-size-200 bg-pos-100 py-6 transition-all duration-300 ease-in-out group-hover:bg-pos-0 dark:block'></div>
        </div>

        {/* Specs */}
        <div className='mt-8 flex flex-row flex-wrap items-center justify-between gap-4'>
          {carSpecs.map((spec, index) => (
            <div
              key={index}
              className='flex items-center gap-[4px] text-xs font-semibold capitalize leading-normal text-gray-400'
            >
              <span className='shrink-0'>{spec.img}</span>
              <span className='shrink-0'> {spec.text}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className='mt-6 flex shrink-0 flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-col gap-1'>
            <h4 className='text-xl font-bold leading-normal text-gray-900 dark:text-white'>
              $
              {discountedPrice
                ? discountedPrice.toFixed(2).toString()
                : price.toFixed(2).toString()}
              /<span className='text-sm text-gray-400'>day</span>
            </h4>
            {!!discountedPrice && (
              <h5 className='text-sm font-bold leading-normal text-gray-400 line-through'>
                ${price.toFixed(2).toString()}
              </h5>
            )}
          </div>

          {!isCurrentUserOwner ? (
            <MoreInfoButton isCurrentUserOwner={isCurrentUserOwner} />
          ) : (
            <EditCarButton id={id} />
          )}
        </div>
      </article>
    </OpenCarPopupButton>
  );
};

export default CarCard;
