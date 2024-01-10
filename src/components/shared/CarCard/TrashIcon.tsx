import { isUserCarOwner } from '@/lib/actions/cars';
import TrashIconClient from './TrashIconClient';

const TrashIcon = async ({ carId }: { carId: number }) => {
  const isCurrentOwner = await isUserCarOwner(carId);
  if (!isCurrentOwner) return null;

  return <TrashIconClient carId={carId} />;
};

export default TrashIcon;
