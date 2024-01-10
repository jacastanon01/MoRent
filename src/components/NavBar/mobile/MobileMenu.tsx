'use client';
import React, { Dispatch, SetStateAction } from 'react';
import Logo from '../../shared/Logo';
import CloseIcon from './CloseIcon';
import { MainMenu } from '../MainMenu';
import MobileAuthButtons from './MobileAuthButtons';
import type { User } from '@prisma/client';

const MobileMenu = ({
  setIsOpenNav,
  profile,
}: {
  setIsOpenNav: Dispatch<SetStateAction<boolean>>;
  profile: User | null;
}) => {
  return (
    <div className='absolute top-0 z-20 h-full w-full bg-[#666666]/25 p-[13px] dark:bg-[#1A202C]/60 lg:hidden'>
      <div className='flex flex-col justify-between gap-5 rounded-[10px] bg-white-100 p-6 shadow-md shadow-gray-300 dark:bg-gray-850 dark:shadow-gray-850'>
        <div className='flex items-center justify-between'>
          <Logo className='text-2xl' />
          <button onClick={() => setIsOpenNav(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className='mt-6'>
          <MainMenu setIsOpenNav={setIsOpenNav} />
          <MobileAuthButtons setIsOpenNav={setIsOpenNav} profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
