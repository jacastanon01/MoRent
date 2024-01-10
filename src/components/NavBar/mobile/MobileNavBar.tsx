'use client';
import React, { useState } from 'react';
import ThemeSwitch from '../../ThemeSwitch/ThemeSwitch';
import Logo from '../../shared/Logo';
import HamburgerIcon from './HamburgerIcon';
import MobileMenu from './MobileMenu';
import { UserAvatar } from '@/components/shared';
import type { User } from '@prisma/client';

const MobileNavBar = ({ profile }: { profile: User | null }) => {
  const [isOpenNav, setIsOpenNav] = useState(false);

  const toggleMenu = () => {
    setIsOpenNav((prevState) => !prevState);
  };

  return (
    <>
      <nav className='flex h-[100px] items-center justify-between border-b border-blue-50 bg-white px-[24px] py-7 dark:border-gray-850 dark:bg-gray-900 lg:hidden'>
        <Logo className='text-2xl lg:text-[32px]' />
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-5'>
            <ThemeSwitch />
            {profile && (
              <div className='h-8 w-8'>
                {' '}
                <UserAvatar imgUrl={profile.image} name={profile.name} />
              </div>
            )}
            <button onClick={toggleMenu}>
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>
      {isOpenNav && (
        <MobileMenu profile={profile} setIsOpenNav={setIsOpenNav} />
      )}
    </>
  );
};

export default MobileNavBar;
