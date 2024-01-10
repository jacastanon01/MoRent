import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

export default function ImageSlider({
  carImages,
}: {
  carImages: string[] | undefined;
}) {
  return carImages ? (
    <Tabs
      defaultValue={carImages[0]}
      className='flex h-full w-full flex-1 shrink-0 flex-col justify-between gap-y-6'
    >
      {carImages.slice(0, 3).map((carImage, i) => (
        <TabsContent key={carImage} value={carImage} className='h-full w-full'>
          <div className='relative h-full w-full overflow-hidden rounded-lg'>
            <Image
              src={carImage}
              alt={carImage}
              fill
              className={i === 0 ? 'object-contain' : 'object-cover'}
            />
          </div>
        </TabsContent>
      ))}

      <TabsList className='grid h-1/3 w-full grid-cols-3 gap-6 bg-transparent p-0'>
        {carImages.slice(0, 3).map((carImage, i) => (
          <TabsTrigger
            key={carImage}
            value={carImage}
            className='h-full cursor-pointer overflow-hidden rounded-lg border-blue p-0 data-[state=active]:border-2 data-[state=active]:p-2 dark:bg-gray-850'
          >
            <div className='relative h-full w-full overflow-hidden rounded-lg'>
              <Image
                src={carImage}
                alt={carImage}
                fill
                className={i === 0 ? 'object-contain' : 'object-cover'}
              />
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  ) : (
    <></>
  );
}
