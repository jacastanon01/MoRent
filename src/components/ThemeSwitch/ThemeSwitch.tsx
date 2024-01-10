'use client';
import SunIcon from './SunIcon';
import { useThemeContext } from '../../context/ThemeProvider';
import { setCookie } from 'cookies-next';
import MoonIcon from './MoonIcon';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ComputerIcon from './ComputerIcon';

// import { motion } from 'framer-motion';

const ThemeSwitch = () => {
  const { mode, setMode } = useThemeContext();

  const setTheme = (theme: string) => {
    setCookie('theme', theme);
    setMode(theme);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {mode === 'light' && <SunIcon />}
        {mode === 'dark' && <MoonIcon />}
        {mode === 'system' && <ComputerIcon />}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className='absolute -right-2 top-4 border-blue-50 bg-white-200 text-sm font-semibold dark:border-gray-800 dark:bg-gray-850'
      >
        <DropdownMenuItem
          className='group flex cursor-pointer items-center gap-1'
          onClick={() => setTheme('light')}
        >
          <SunIcon
            width={16}
            height={16}
            className={
              mode === 'light'
                ? 'fill-blue-500'
                : 'fill-gray-400 group-hover:fill-blue-500'
            }
          />
          <span
            className={
              mode === 'light'
                ? 'text-blue-500'
                : 'text-gray-400 group-hover:text-blue-500'
            }
          >
            Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='group flex cursor-pointer items-center gap-1'
          onClick={() => setTheme('dark')}
        >
          <MoonIcon
            width={13}
            height={13}
            className={
              mode === 'dark'
                ? 'fill-blue-500'
                : 'fill-gray-400 group-hover:fill-blue-500'
            }
          />
          <span
            className={
              mode === 'dark'
                ? 'text-blue-500'
                : 'text-gray-400 group-hover:text-blue-500'
            }
          >
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='group flex cursor-pointer items-center gap-1'
          onClick={() => setTheme('system')}
        >
          <ComputerIcon
            width={13}
            height={13}
            className={
              mode === 'system'
                ? 'fill-blue-500'
                : 'fill-gray-400 group-hover:fill-blue-500'
            }
          />
          <span
            className={
              mode === 'system'
                ? 'text-blue-500'
                : 'text-gray-400 group-hover:text-blue'
            }
          >
            System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
