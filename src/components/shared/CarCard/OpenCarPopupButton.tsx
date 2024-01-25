'use client';

import CarDetailsPopup from '@/components/Modals/CarDetailsPopup/CarDetailsPopup';
import { usePopupContext } from '@/context/PopupProvider';
import { addOrReplaceSearchParams } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { getCarById } from '@/lib/actions/cars';
import { useToast } from '@/components/ui/use-toast';
import { ReactElement } from 'react';

const OpenCarPopupButton = ({
  id,
  isCurrentUserOwner,
  children,
}: {
  id: number;
  isCurrentUserOwner?: boolean;
  children: ReactElement;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setPopup } = usePopupContext();
  const handleOpenCarDetails = async () => {
    const car = await getCarById(Number(id));
    if (car) {
      addOrReplaceSearchParams(
        [
          { carId: id.toString() },
          { selectedCarLocationId: car?.locationId?.toString() || '' },
          { selectedCarLocationAddress: car?.location?.address || '' },
        ],
        router,
      );
      setPopup(<CarDetailsPopup car={car} />);
    } else {
      toast({
        title: "The car doesn't exist",
        description: `Sorry the car you're looking for does not exist on the databse`,
        variant: 'destructive',
        duration: 3000,
      });
    }
  };
  const handleEditPopup = async () => {
    router.push(`/edit-car/${id}`);
  };
  return (
    <div
      className='cursor-pointer'
      onClick={isCurrentUserOwner ? handleEditPopup : handleOpenCarDetails}
    >
      {children}
    </div>
  );
};

export default OpenCarPopupButton;
