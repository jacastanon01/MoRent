import Image from 'next/image';

const NotFoundRightColumn = () => {
  return (
    <div className='mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0'>
      <div className='ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80'>
        <div className='relative'>
          <Image
            width={200}
            height={300}
            src='https://byntfusd4ovvdowf.public.blob.vercel-storage.com/bentley-T3G3MU8U7YcftRsnRmDuaO4S055PzX.jpeg'
            alt=''
            className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
          />
          <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
        </div>
      </div>
      <div className='mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36'>
        <div className='relative'>
          <Image
            src='https://byntfusd4ovvdowf.public.blob.vercel-storage.com/bugattiveyroninteriorjpg-n8zUv9CAeKpYjE3c7yut2iyRJXQNY2.jpeg'
            alt=''
            width={200}
            height={300}
            className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
          />
          <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
        </div>
        <div className='relative'>
          <Image
            src='https://byntfusd4ovvdowf.public.blob.vercel-storage.com/chevrolet-corvette-z06-2023-021651613015688-d9iFbwDFkgRZAMvhxGEALR8FMi3uu6.jpg'
            alt=''
            width={200}
            height={300}
            className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
          />
          <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
        </div>
      </div>
      <div className='w-44 flex-none space-y-8 pt-32 sm:pt-0'>
        <div className='relative'>
          <Image
            src='https://byntfusd4ovvdowf.public.blob.vercel-storage.com/21c_interior_1920p-mfcTOJZCYD00mQjIYbQxNJgVEFm7xK.jpg'
            width={200}
            height={300}
            alt=''
            className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
          />
          <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
        </div>
        <div className='relative'>
          <Image
            src='https://byntfusd4ovvdowf.public.blob.vercel-storage.com/f8tributof8tributorightfrontthreequarter-HC6LSLq8aWLtWLWJxjUgDvuLZpXsQl.jpeg'
            alt=''
            width={200}
            height={300}
            className='aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
          />
          <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10' />
        </div>
      </div>
    </div>
  );
};

export default NotFoundRightColumn;
