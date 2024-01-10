import type { Car } from '@prisma/client';
import HeartButtonClient from './HeartButtonClient';
import { getLikedCars } from '@/lib/actions/cars';

const HeartButton = async ({ carId }: { carId: number }) => {
  const favoritedCars = await getLikedCars();

  if (!favoritedCars) return null;

  async function checkIfCarIsLiked() {
    if (!favoritedCars?.favoritedCars) return false;

    return favoritedCars.favoritedCars.some((car: Car) => car.id === carId);
  }

  const isLiked = await checkIfCarIsLiked();

  return <HeartButtonClient key={carId} carId={carId} isLiked={isLiked} />;
};

export default HeartButton;
