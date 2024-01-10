'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button, UserAvatar } from '../../shared';
import type { User } from '@prisma/client';

const MobileAuthButtons = ({
  profile,
  setIsOpenNav,
}: {
  profile: User | null;
  setIsOpenNav?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  async function handleLogout() {
    const data = await signOut({
      redirect: false,
      callbackUrl: '/how-it-works',
    });
    router.push(data.url);
  }

  function handleProfileClick() {
    if (profile) {
      setIsOpenNav && setIsOpenNav(false);
      router.push(`/profile`);
    }
  }
  return (
    <>
      {!profile ? (
        <Link href={'/auth/signin'}>
          <Button.MobileLogin>Login</Button.MobileLogin>
        </Link>
      ) : (
        <>
          <Button.MobileLogin onClick={handleProfileClick}>
            <div className='h-8 w-8'>
              <UserAvatar imgUrl={profile.image} name={profile.name} />
            </div>
            <span>My Profile</span>
          </Button.MobileLogin>
          <Button.MobileLogin
            className='bg-red-500 text-white'
            onClick={handleLogout}
          >
            Logout
          </Button.MobileLogin>
        </>
      )}
    </>
  );
};

export default MobileAuthButtons;
