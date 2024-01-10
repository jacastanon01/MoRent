'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Button, UserAvatar } from '../shared';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import type { User } from '@prisma/client';

const AuthButtons = ({ profile }: { profile?: User | null }) => {
  const router = useRouter();

  async function handleLogout() {
    const data = await signOut({
      redirect: false,
      callbackUrl: '/how-it-works',
    });
    router.push(data.url);
    router.refresh();
  }

  function handleProfileClick() {
    if (profile) {
      router.push(`/profile`);
    }
  }
  return (
    <>
      {!profile ? (
        <Link href={'/auth/signin'}>
          <Button.DesktopLogin>Login</Button.DesktopLogin>
        </Link>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <button className='h-12 w-12'>
              <UserAvatar imgUrl={profile?.image} name={profile?.name} />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverClose className='w-full' asChild>
              <Button.MobileLogin onClick={handleProfileClick}>
                My profile
              </Button.MobileLogin>
            </PopoverClose>
            <PopoverClose className='w-full' asChild>
              <Button.MobileLogin
                className='!bg-red-500 !text-white'
                onClick={handleLogout}
              >
                Logout
              </Button.MobileLogin>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default AuthButtons;
