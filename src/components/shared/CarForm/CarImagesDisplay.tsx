'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '..';
import { removeImageFromCar } from '@/lib/actions/cars';
import Spinner from '../Spinner/Spinner';

const CarImagesDisplay = ({ carImages }: { carImages: string[] }) => {
  const pathname = usePathname();
  const id = +pathname.slice(10);
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState(carImages);

  function handleRemoveImage(imgUrl: string) {
    startTransition(async () => {
      const data = await removeImageFromCar(id, imgUrl);

      if (data) {
        setImages((prev) => prev.filter((img) => img !== imgUrl));
      }
    });
  }

  return images ? (
    <Tabs
      key={images[0]}
      defaultValue={images[0]}
      className='mt-4 flex h-full w-full shrink-0 flex-col justify-between gap-y-6 border-2 border-dotted p-2 dark:border-gray-400'
    >
      <>
        {!isPending ? (
          <>
            {images.map((carImage) => (
              <TabsContent
                key={carImage}
                value={carImage}
                className='relative h-full w-full items-start justify-between'
              >
                <Button.Remove
                  onClick={() => handleRemoveImage(carImage)}
                  disabled={isPending}
                  className='absolute z-10 mt-[-5px] w-fit bg-red-500'
                >
                  {' '}
                </Button.Remove>

                <div className='relative h-full w-full overflow-hidden rounded-lg'>
                  <Image
                    src={carImage}
                    alt={carImage}
                    fill
                    className='object-contain'
                  />
                </div>
              </TabsContent>
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </>

      <TabsList className='grid h-full w-full grid-flow-row grid-cols-3 gap-6 bg-transparent p-0'>
        {images.map((carImage) => (
          <TabsTrigger
            key={carImage}
            value={carImage}
            className='h-full cursor-pointer overflow-hidden rounded-lg border-blue p-0 data-[state=active]:border-2 dark:bg-gray-850'
          >
            <div className='relative h-full w-full overflow-hidden rounded-lg'>
              <Image
                src={carImage}
                alt={carImage}
                fill
                className='object-contain'
              />
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  ) : (
    <></>
  );
};

export default CarImagesDisplay;
