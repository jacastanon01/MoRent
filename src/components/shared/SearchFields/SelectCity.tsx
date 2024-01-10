'use client';

import { cn } from '@/lib/utils';

import ReactGoogleAutocomplete from 'react-google-autocomplete';
import MarkIcon from './MarkIcon';

export function SelectCity({
  location,
  className,
  disabled,
  errorMessage,
  handleLocationChange,
}: {
  location: string;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  handleLocationChange: (location: string, lat: number, lng: number) => void;
}) {
  return (
    <div
      className={cn('flex  w-full flex-col text-sm sm:text-base', className)}
    >
      <div className='flex flex-col gap-[10px] sm:gap-3'>
        <label className='flex items-center gap-2 text-sm font-medium capitalize tracking-wide'>
          <MarkIcon />
          Location:
        </label>
        <div className='relative flex flex-col'>
          {errorMessage && (
            <p className='absolute right-0 top-[-30px] rounded-lg text-red-500'>
              {errorMessage}
            </p>
          )}
          <ReactGoogleAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              if (place?.formatted_address) {
                handleLocationChange(
                  place.formatted_address,
                  place.geometry.location.lat(),
                  place.geometry.location.lng(),
                );
              }
            }}
            disabled={disabled}
            defaultValue={location}
            inputAutocompleteValue={location}
            className={cn(
              `w-full rounded-md bg-white-200 text-sm h-[46px] sm:h-14 px-6 leading-tight focus:outline-none dark:bg-gray-800`,
              errorMessage &&
                '!border !border-red-500 !bg-red-50 font-bold !text-red-500',
            )}
            placeholder='Choose a location'
          />
        </div>
      </div>
    </div>
  );
}
