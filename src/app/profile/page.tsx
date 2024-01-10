import { notFound } from 'next/navigation';

import CarsListGrid from '@/components/shared/CarsListGrid';
import CoverPhoto from '@/components/Profile/CoverPhoto';
import { fetchProfile } from '@/lib/actions/user';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await fetchProfile();

  if (!user) return notFound();

  return (
    <main className='container pb-16 pt-9'>
      <div>
        <h2 className='text-2xl font-semibold leading-normal tracking-wide'>
          My Profile
        </h2>
        <CoverPhoto user={user} />
        <CarsListGrid
          title={'rented cars'}
          cars={user?.rentedCars.map((rental) => rental.car)}
        />
        <CarsListGrid title={'favorite cars'} cars={user?.favoritedCars} />
        <CarsListGrid title={'cars for rent'} cars={user.listedCars} />
      </div>
    </main>
  );
}
