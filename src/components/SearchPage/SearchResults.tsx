'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { Car } from '@prisma/client';
import NextPageButton from '../shared/NextPageButton/NextPageButton';
import { getFilteredCars } from '@/lib/actions/cars';
import { cars } from '@/constants/exampleCars';

const SearchResults = ({
  options,
  children,
}: {
  options: any[];
  children: React.ReactNode;
}) => {
  const [searchResult, setSearchResult] = useState<Partial<Car>[]>([]);
  const params = useSearchParams();
  const page = Number(params.get('page'));

  useEffect(() => {
    const getCars = async () => {
      const cars: Car[] = await getFilteredCars(...(options as any));
      if (page && page > 1) {
        return setSearchResult([...searchResult, ...cars]);
      }
      setSearchResult(cars);
    };

    getCars();
  }, [cars, page, options]);

  return (
    <section className='mt-[30px] w-full'>
      {children}
      {searchResult.length > 0 && searchResult.length % 6 === 0 && (
        <div className='mb-6 mt-16 flex items-center justify-center'>
          <NextPageButton />
        </div>
      )}
    </section>
  );
};

export default SearchResults;
