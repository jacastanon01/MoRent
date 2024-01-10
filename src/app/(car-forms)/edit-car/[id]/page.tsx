import { notFound } from 'next/navigation';

import CarForm from '@/components/shared/CarForm';
import CarImagesDisplay from '@/components/shared/CarForm/CarImagesDisplay';
import { getCarById, isUserCarOwner } from '@/lib/actions/cars';

export const dynamic = 'force-dynamic';

export default async function EditCarPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const isCurrentUserOwner = await isUserCarOwner(Number(id));
  if (!isCurrentUserOwner) {
    return <div>You are not authorized to edit this car</div>;
  }

  const carToEdit = await getCarById(Number(id));
  if (!carToEdit) return notFound();

  return (
    <div>
      <p className=' text-2xl font-bold'>Edit your car</p>
      <p className='text-sm text-gray-400'>Edit your car details</p>
      <div className='h-96'>
        <CarImagesDisplay carImages={carToEdit.images} />
      </div>
      <p className='my-6 text-xl font-extrabold uppercase text-blue-500'>
        Car Info
      </p>{' '}
      <CarForm carData={carToEdit} />
    </div>
  );
}
