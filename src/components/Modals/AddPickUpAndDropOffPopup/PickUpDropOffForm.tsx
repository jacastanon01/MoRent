'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import React, { FormEvent, useEffect, useState } from 'react';

import { SelectCity } from '../../shared/SearchFields/SelectCity';
import { addOrReplaceSearchParams } from '@/lib/utils';
import { Button } from '../../shared';
import Availability from '../../shared/SearchFields/Availability';

import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

import { z } from 'zod';
import { TimeSelect } from '@/components/shared/SearchFields/TimeSelect';
import { pickupDropOffSchema } from '@/validations/pickupdropoff';
import { usePopupContext } from '@/context/PopupProvider';
import dayjs from 'dayjs';

type SearchParams = {
  location: string;
  from: string;
  to: string;
  pickuptime: string;
  dropofftime: string;
};

const PickUpDropOffForm = () => {
  const { setPopup } = usePopupContext();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  const [formErrors, setFormErrors] = useState<Partial<SearchParams>>({});
  const [location, setLocation] = useState(
    searchParams.get('selectedCarLocationAddress') || '',
  );
  const [pickupTime, setPickupTime] = useState(
    searchParams.get('pickuptime') || '',
  );
  const [dropOffTime, setDropOffTime] = useState(
    searchParams.get('dropofftime') || '',
  );
  const [date, setDate] = React.useState<DateRange | undefined>(
    searchParams.get('from') && searchParams.get('to')
      ? {
          from: dayjs(searchParams.get('from')!).toDate(),
          to: dayjs(searchParams.get('to')!).toDate(),
        }
      : undefined,
  );

  useEffect(() => {
    setLocation(searchParams.get('selectedCarLocationAddress') || '');
    setPickupTime(searchParams.get('pickuptime') || '');
    setDropOffTime(searchParams.get('dropofftime') || '');
    setDate(
      searchParams.get('from') && searchParams.get('to')
        ? {
            from: dayjs(searchParams.get('from')!).toDate(),
            to: dayjs(searchParams.get('to')!).toDate(),
          }
        : undefined,
    );
  }, [searchParams]);

  const handleLocationChange = (location: string) => {
    setFormErrors((prevState) => ({ ...prevState, location: undefined }));
    setLocation(location);
  };

  const handlePickupTimeChange = (pickuptime: string) => {
    setFormErrors((prevState) => ({ ...prevState, pickuptime: undefined }));
    setPickupTime(pickuptime);
  };
  const handleDropOffTimeChange = (dropofftime: string) => {
    setFormErrors((prevState) => ({ ...prevState, dropofftime: undefined }));
    setDropOffTime(dropofftime);
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
        pickuptime: pickupTime,
        dropofftime: dropOffTime,
      };

      // Validate the search params
      const parsedParams = pickupDropOffSchema.parse(params);

      setFormErrors({});
      setPopup(null);
      addOrReplaceSearchParams(
        [
          { location: parsedParams.location },
          { from: format(parsedParams.from, 'yyyy-MM-dd') },
          { to: format(parsedParams.to, 'yyyy-MM-dd') },
          { pickuptime: parsedParams.pickuptime },
          { dropofftime: parsedParams.dropofftime },
        ],
        router,
        '/checkout',
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
    <form onSubmit={handleSubmit} className='mt-6 grid grid-cols-2 gap-4'>
      <SelectCity
        handleLocationChange={handleLocationChange}
        location={location}
        disabled={true}
        errorMessage={formErrors.location}
        className='col-span-2'
      />
      <Availability
        type='from'
        label='Pick-up date'
        errorMessage={formErrors.from}
        date={date}
        setDate={handleDateChange}
        carId={carId || undefined}
      />
      <TimeSelect
        handleTimeChange={handlePickupTimeChange}
        time={pickupTime}
        errorMessage={formErrors.pickuptime}
      />
      <Availability
        type='to'
        label='Drop-off date'
        errorMessage={formErrors.to}
        date={date}
        setDate={handleDateChange}
        carId={carId || undefined}
      />
      <TimeSelect
        type={'Drop-Off'}
        handleTimeChange={handleDropOffTimeChange}
        time={dropOffTime}
        errorMessage={formErrors.dropofftime}
      />
      <Button className='col-span-2 flex h-[56px] w-full' type='submit'>
        Rent Now
      </Button>
    </form>
  );
};

export default PickUpDropOffForm;
