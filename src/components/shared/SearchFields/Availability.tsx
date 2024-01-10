'use client';

import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn, convertUTCToLocal } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from './CalendarIcon';
import { ChevronDown } from 'lucide-react';
import React, { useEffect } from 'react';
import { getCarRentalHistory } from '@/lib/actions/cars';

export default function Availability({
  className,
  type,
  errorMessage,
  date,
  label,
  setDate,
  carId,
}: {
  className?: string;
  type: 'from' | 'to';
  label?: string;
  errorMessage?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  carId?: string;
}) {
  const [disabledDays, setDisabledDays] = React.useState<Date[] | undefined>();

  useEffect(() => {
    async function fetchDisabledDays() {
      if (!carId) return;
      const res = await getCarRentalHistory(Number(carId));
      const days: Date[] = [];
      res.forEach((date) => {
        let startDate = new Date(date.startDate);
        const endDate = new Date(date.endDate);
        while (startDate <= endDate) {
          days.push(convertUTCToLocal(new Date(startDate)));
          startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        }
      });

      setDisabledDays(days);
    }

    fetchDisabledDays();
  }, [carId]);

  const displayDate = () => {
    if (!date?.to && type === 'to') {
      return <span>Pick an end date</span>;
    }
    if (!date?.from && type === 'from') {
      return <span>Pick a start date</span>;
    }

    if (date) {
      return date[type] && format(date[type]!, 'LLL dd, y');
    }
  };

  return (
    <div className={cn('flex w-full gap-2', className)}>
      <Popover>
        <div className='flex w-full flex-col'>
          <div className='mb-3 flex items-center gap-2 text-sm font-semibold leading-normal'>
            <CalendarIcon />
            {label || `Availability ${type}`}
            {errorMessage && (
              <span className='rounded-lg bg-red-50 px-3 text-red-500'>
                {errorMessage}
              </span>
            )}
          </div>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'h-[56px] w-full dark:!bg-gray-800 rounded-[6px] dark:!text-white-200 !bg-white-200  !text-gray-400 text-left justify-between flex font-normal border-0',
                !date && 'text-muted-foreground',
                errorMessage &&
                  ' !bg-red-50 font-bold !text-red-500 !border !border-red-500',
              )}
            >
              {displayDate()}

              <ChevronDown
                className={cn(
                  'ml-2 h-4 w-4 shrink-0 dark:!text-white-200 text-gray-900',
                  errorMessage && 'text-red-500',
                )}
              />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className='w-auto p-0 dark:bg-gray-900' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) =>
              date < new Date(new Date().setDate(new Date().getDate() - 1)) ||
              disabledDays?.some((d) => {
                const dDateOnly = new Date(
                  d.getFullYear(),
                  d.getMonth(),
                  d.getDate(),
                );
                const dateOnly = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                );
                return dDateOnly.getTime() === dateOnly.getTime();
              }) ||
              false
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
