'use client';
import { motion } from 'framer-motion';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Spinner from '../Spinner/Spinner';

function UserAvatar({
  imgUrl,
  name,
  isProfileAvatar,
}: {
  imgUrl?: string | null;
  name?: string | null;
  isProfileAvatar?: boolean;
}) {
  const imgSrc = imgUrl;

  const splitNames = name?.split(' ').slice(0, 2);
  const initials = splitNames
    ?.map((n) => n.charAt(0).toLocaleUpperCase())
    .join('');

  return (
    <motion.div
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 360 }}
      className='relative h-full w-full'
    >
      <Avatar className='relative h-full w-full shadow-md shadow-gray-300 dark:shadow-gray-600'>
        <div
          className={`absolute z-[1] flex h-full w-full items-center justify-center ${
            imgSrc && 'hidden'
          }`}
        >
          <Spinner />
        </div>
        <AvatarImage className='z-10' src={imgSrc || undefined} />
        <AvatarFallback
          delayMs={200}
          className={`z-10 rounded-full bg-blue-500 px-3 py-1 font-medium text-white ${
            isProfileAvatar
              ? 'text-3xl !font-bold sm:text-5xl'
              : 'text-base sm:text-xl'
          }`}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  );
}

export default UserAvatar;
