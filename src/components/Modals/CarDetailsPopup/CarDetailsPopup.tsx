import Button from '@/components/shared/Button';

import { usePopupContext } from '@/context/PopupProvider';
import Reviews from '../../shared/Reviews/Reviews';
import ImageSlider from './ImageSlider';
import AddPickUpAndDropOffPopup from '../AddPickUpAndDropOffPopup/AddPickUpAndDropOffPopup';
import Modal from '../Modal';

import { Car, Location } from '@prisma/client';
import { MapPin } from 'lucide-react';

type CarWithLocationType = Car & { location: Location };

export default function CarDetailsPopup({
  car,
}: {
  car?: Partial<CarWithLocationType> | null;
}) {
  const { setPopup } = usePopupContext();

  return (
    car && (
      <Modal>
        <div className='grid auto-rows-fr grid-cols-1 gap-8  p-4 md:grid-cols-2'>
          <ImageSlider carImages={car.images} />
          <div className='flex flex-col gap-[18px] lg:gap-8 lg:p-6'>
            <section className='flex flex-col gap-2'>
              <h2 className='text-xl font-bold capitalize text-gray-900 dark:text-white md:text-[32px]'>
                {car.make + ' ' + car.model}
              </h2>
              <Reviews rating={4.5} numberOfReviews={400} />
            </section>

            <section className='flex gap-2'>
              <MapPin /> {car.location?.address}
            </section>

            <section className='text-xs font-normal leading-[200%] text-gray-700 dark:text-white-200 lg:text-xl'>
              {car.description}
            </section>

            <section className='grid grid-cols-2 gap-x-11 gap-y-4 text-xs tracking-tight text-gray-700 dark:text-white-200 lg:text-xl'>
              <div className='flex justify-between '>
                <div className='font-normal dark:text-gray-400'>Type Car</div>
                <div className='font-semibold'>{car.type}</div>
              </div>
              <div className='flex justify-between '>
                <div className='font-normal dark:text-gray-400'>Capacity</div>
                <div className='font-semibold'>{car.capacity}</div>
              </div>
              <div className='flex justify-between '>
                <div className='font-normal dark:text-gray-400'>Transm.</div>
                <div className='font-semibold'>{car.transmission}</div>
              </div>
              <div className='flex justify-between '>
                <div className='font-normal dark:text-gray-400'>Gasoline</div>
                <div className='font-semibold'>
                  {car.fuelEfficiency} {car.fuelEfficiencyUnit}
                </div>
              </div>
            </section>

            <section>
              {/* Price */}
              <div className='mt-[6px] flex shrink-0 items-center justify-between gap-6 lg:mt-9'>
                <div className='flex flex-col'>
                  <h4 className='text-xl font-bold leading-normal text-gray-900 dark:text-white lg:text-[28px]'>
                    ${car.rentPrice?.toFixed(2).toString()}/
                    <span className='text-xs text-gray-400 lg:text-base'>
                      day
                    </span>
                  </h4>
                  {car.rentPrice && (
                    <h5 className='text-xs font-bold leading-normal text-gray-400 line-through lg:text-base'>
                      ${(car.rentPrice / 1.5).toFixed(2).toString()}
                    </h5>
                  )}
                </div>
                <div>
                  <Button
                    onClick={() => setPopup(<AddPickUpAndDropOffPopup />)}
                    className='h-14 w-[140px] bg-blue text-white'
                  >
                    Rent Now
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Modal>
    )
  );
}
