import { cn } from '@/lib/utils';

const SunIcon = ({ ...props }: { [key: string]: any }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width || '20'}
      height={props.height || '20'}
      viewBox='0 0 20 20'
      fill='none'
      className='group transition-all duration-500'
    >
      <path
        d='M9 1C9 0.447754 9.44775 0 10 0C10.5522 0 11 0.447754 11 1V2C11 2.55225 10.5522 3 10 3C9.44775 3 9 2.55225 9 2V1Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M15 10C15 12.7615 12.7615 15 10 15C7.23853 15 5 12.7615 5 10C5 7.23853 7.23853 5 10 5C12.7615 5 15 7.23853 15 10Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M10 17C9.44775 17 9 17.4478 9 18V19C9 19.5522 9.44775 20 10 20C10.5522 20 11 19.5522 11 19V18C11 17.4478 10.5522 17 10 17Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M2.92896 4.34314C2.53833 3.95251 2.53833 3.31946 2.92896 2.92883C3.31946 2.53833 3.95264 2.53833 4.34314 2.92883L5.05017 3.63599C5.4408 4.02649 5.4408 4.65967 5.05017 5.05017C4.65967 5.44067 4.02649 5.44067 3.63599 5.05017L2.92896 4.34314Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M14.9497 14.9497C14.5592 15.3402 14.5592 15.9734 14.9497 16.3639L15.6569 17.071C16.0474 17.4615 16.6805 17.4615 17.071 17.071C17.4615 16.6805 17.4615 16.0474 17.071 15.6569L16.3639 14.9497C15.9734 14.5592 15.3402 14.5592 14.9497 14.9497Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M1 11C0.447754 11 0 10.5522 0 10C0 9.44775 0.447754 9 1 9H2C2.55225 9 3 9.44775 3 10C3 10.5522 2.55225 11 2 11H1Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M17 10C17 10.5522 17.4478 11 18 11H19C19.5522 11 20 10.5522 20 10C20 9.44775 19.5522 9 19 9H18C17.4478 9 17 9.44775 17 10Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M3.74829 16.551C3.32532 16.906 2.69446 16.8508 2.33948 16.4279C1.9845 16.0048 2.03967 15.374 2.46277 15.0189L3.22876 14.3762C3.65186 14.0212 4.28259 14.0764 4.6377 14.4994C4.99268 14.9225 4.9375 15.5532 4.5144 15.9083L3.74829 16.551Z'
        className={cn(
          'fill-blue duration-500 group-hover:fill-blue-400',
          props.className,
        )}
      />
      <path
        d='M15.3623 5.50037C15.7173 5.92346 16.348 5.97864 16.7711 5.62366L17.5371 4.98083C17.9602 4.62585 18.0154 3.99512 17.6604 3.57202C17.3054 3.14893 16.6747 3.09375 16.2516 3.44885L15.4855 4.09155C15.0625 4.44653 15.0073 5.07739 15.3623 5.50037Z'
        className={cn(
          'fill-blue transition-all group-hover:fill-blue-400',
          props.className,
        )}
      />
    </svg>
  );
};

export default SunIcon;
