'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import React, { FormEvent, useState } from 'react';

import { SelectCity } from '../../shared/SearchFields/SelectCity';
import { addOrReplaceSearchParams } from '@/lib/utils';
import { Button } from '../../shared';
import Availability from '../../shared/SearchFields/Availability';

import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { searchSchema } from '@/validations/search';
import { z } from 'zod';

type SearchParams = {
  location: string;
  from: string;
  to: string;
  lat: string;
  lng: string;
};

const HomeSearchBar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const [formErrors, setFormErrors] = useState<Partial<SearchParams>>({});
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [lat, setLat] = useState(searchParams.get('lat') || '');
  const [lng, setLng] = useState(searchParams.get('lng') || '');
  const [date, setDate] = React.useState<DateRange | undefined>(
    searchParams.get('from') && searchParams.get('to')
      ? {
          from: new Date(searchParams.get('from')!),
          to: new Date(searchParams.get('to')!),
        }
      : undefined,
  );

  const handleLocationChange = (location: string, lat: number, lng: number) => {
    setFormErrors((prevState) => ({
      ...prevState,
      location: undefined,
      lat: undefined,
      lng: undefined,
    }));
    setLocation(location);
    setLat(lat.toString());
    setLng(lng.toString());
  };

  const handleDateChange = (date: DateRange | undefined) => {
    setFormErrors((prevState) => ({
      ...prevState,
      from: undefined,
      to: undefined,
    }));
    setDate(date);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // construct the search params from states
      const params = {
        location,
        from: date?.from,
        to: date?.to,
        lat,
        lng,
      };

      // Validate the search params
      const parsedParams = searchSchema.parse(params);

      setFormErrors({});
      addOrReplaceSearchParams(
        [
          { location: parsedParams.location },
          { from: format(parsedParams.from, 'yyyy-MM-dd') },
          { to: format(parsedParams.to, 'yyyy-MM-dd') },
          { lat: parsedParams.lat },
          { lng: parsedParams.lng },
        ],
        router,
        '/search',
      );
    } catch (error: any) {
      // Handle zod errors
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);

        return;
      }

      // Handle other errors
      toast({
        title: 'Error searching for availabilities!',
        description: `Error: ${error.message}`,
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 flex flex-col items-end justify-between gap-4 rounded-[10px] bg-white px-[30px] py-6 shadow-md dark:bg-gray-850 md:flex-row'
    >
      <div className='w-full'>
        <SelectCity
          handleLocationChange={handleLocationChange}
          location={location}
          errorMessage={formErrors.location || formErrors.lat || formErrors.lng}
        />
      </div>
      <Availability
        type='from'
        errorMessage={formErrors.from}
        date={date}
        setDate={handleDateChange}
      />
      <Availability
        type='to'
        errorMessage={formErrors.to}
        date={date}
        setDate={handleDateChange}
      />
      <Button.Search
        className='h-[56px] w-full shrink-0 md:w-[60px] lg:w-[160px]'
        type='submit'
      >
        <span className='md:hidden lg:block'>Search</span>
      </Button.Search>
    </form>
  );
};

export default HomeSearchBar;
