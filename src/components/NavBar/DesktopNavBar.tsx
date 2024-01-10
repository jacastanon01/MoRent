import Link from 'next/link';

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import Logo from '../shared/Logo';
import AuthButtons from './AuthButtons';
import { MainMenu } from './MainMenu';
import type { User } from '@prisma/client';

const DesktopNavBar = ({ profile }: { profile: User | null }) => {
  return (
    <nav className='hidden h-[100px] border-b border-[rgba(195,212,233,0.40)] bg-white px-[60px] py-7 dark:border-gray-850 dark:bg-gray-900 lg:flex'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Logo />
        </Link>
        <div className='flex items-center gap-8'>
          <MainMenu />
          <div className='flex items-center gap-5'>
            {<AuthButtons profile={profile} />}
            <div className='h-9 border-r border-blue-50 dark:border-gray-850'></div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavBar;
