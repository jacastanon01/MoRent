'use client';

import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import MarkIcon from './MarkIcon';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TimeSelect({
  time,
  className,
  type = 'Pick-Up',
  errorMessage,
  handleTimeChange,
}: {
  time: string;
  type?: string;
  className?: string;
  errorMessage?: string;
  handleTimeChange: (time: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const availableTime = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn('flex w-full flex-col', className)}>
        <div className='mb-3 flex items-center gap-2 text-sm font-semibold leading-normal'>
          <MarkIcon />
          {type} Time
          {errorMessage && (
            <span className='rounded-lg bg-red-50 px-3 text-red-500'>
              {errorMessage}
            </span>
          )}
        </div>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            role='combobox'
            aria-expanded={open}
            className={cn(
              'h-[56px] w-full dark:!bg-gray-800 dark:!text-white-200 justify-between rounded-[6px] !bg-white-200 font-normal !text-gray-400',
              errorMessage &&
                '!border !border-red-500 !bg-red-50 font-bold !text-red-500',
            )}
          >
            {(time &&
              availableTime.find(
                (timeText) => timeText.toLowerCase() === time,
              )) ||
              'Select your time'}
            <ChevronDown className='ml-2 h-4 w-4 shrink-0 text-gray-900 dark:!text-white-200 ' />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className='w-[300px] p-0 '>
        <Command className='dark:!bg-gray-900'>
          <CommandInput placeholder='Find a time...' />
          <CommandEmpty>No time found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className='h-[200px] w-[350px]'>
              {availableTime.map((timeText) => (
                <CommandItem
                  key={timeText}
                  value={timeText}
                  onSelect={(currentValue) => {
                    handleTimeChange(currentValue === time ? '' : currentValue);
                    setOpen(false);
                  }}
                  className='cursor-pointer'
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      time === timeText.toLowerCase()
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {timeText}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
