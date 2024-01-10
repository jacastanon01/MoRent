'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

import { mainMenu } from '@/constants/mainmenu';
import { cn } from '@/lib/utils';

export function MainMenu({
  setIsOpenNav,
}: {
  setIsOpenNav?: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className='hidden items-center gap-[30px] lg:flex'>
        {mainMenu.map((link) => (
          <Link
            className={
              pathname === link.url
                ? 'font-semibold text-blue-500'
                : 'font-medium text-gray-700 transition-all duration-300 hover:text-blue-500 dark:text-white'
            }
            href={link.url}
            key={link.title}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className='flex flex-col lg:hidden'>
        {mainMenu.map((link) => (
          <Link
            onClick={() => setIsOpenNav && setIsOpenNav(false)}
            className={cn(
              pathname === link.url
                ? 'bg-blue-500 font-semibold text-white'
                : 'font-medium text-gray-700 transition-all duration-300 hover:text-blue-500 dark:text-white',
              'flex items-center gap-3 mt-2 p-3 group rounded-sm hover:bg-blue-500 hover:font-semibold hover:text-white transition-all',
            )}
            href={link.url}
            key={link.title}
          >
            {
              <link.icon
                className={
                  pathname === link.url
                    ? 'fill-white'
                    : 'fill-gray-700 group-hover:fill-white dark:fill-white'
                }
              />
            }
            {link.title}
          </Link>
        ))}
      </div>
    </>
  );
}
