'use client';

import AddPickUpAndDropOffPopup from '../Modals/AddPickUpAndDropOffPopup/AddPickUpAndDropOffPopup';
import { usePopupContext } from '@/context/PopupProvider';
import { addOrReplaceSearchParams } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '../shared';
import { Prisma } from '@prisma/client';

type CarWithLocation = Prisma.CarGetPayload<{
  include: { location: true };
}>;

const RentNowButton = ({ car }: { car: CarWithLocation }) => {
  const router = useRouter();
  const { setPopup } = usePopupContext();
  const rentNow = async () => {
    addOrReplaceSearchParams(
      [
        { carId: car.id.toString() },
        { selectedCarLocationId: car.id.toString() },
        { selectedCarLocationId: car.locationId.toString() },
        { selectedCarLocationAddress: car.location.address },
      ],
      router,
    );
    setPopup(<AddPickUpAndDropOffPopup />);
  };
  return (
    <Button onClick={rentNow} className='h-14 w-[140px] bg-blue text-white'>
      Rent Now
    </Button>
  );
};

export default RentNowButton;
