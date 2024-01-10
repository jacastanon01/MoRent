'use client';

import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';

import {
  addCarToUserFavorites,
  removeCarFromFavorites,
} from '@/lib/actions/user';
import { v4 as uuidv4 } from 'uuid';

const HeartButtonClient = ({
  carId,
  isLiked,
}: {
  carId: number;
  isLiked?: boolean;
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [isPending, startTransition] = useTransition();

  async function handleLike(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    if (!liked) {
      startTransition(async () => {
        await addCarToUserFavorites(carId);
      });
    } else {
      startTransition(async () => {
        await removeCarFromFavorites(carId);
      });
    }
    setLiked((prev) => !prev);
  }

  return (
    <motion.button
      disabled={isPending}
      key={uuidv4()}
      className={`${!isPending && 'cursor-pointer'}`}
      onClick={!isPending ? handleLike : undefined}
      whileTap={
        !isPending
          ? {
              scale: 0.8,
              transition: { duration: 0.2 },
            }
          : undefined
      }
    >
      {liked ? (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M16.44 3.10001C14.63 3.10001 13.01 3.98001 12 5.33001C10.99 3.98001 9.37 3.10001 7.56 3.10001C4.49 3.10001 2 5.60001 2 8.69001C2 9.88001 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.88001 22 8.69001C22 5.60001 19.51 3.10001 16.44 3.10001Z'
            fill='#ED3F3F'
          />
        </svg>
      ) : (
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z'
            stroke='#90A3BF'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </motion.button>
  );
};

export default HeartButtonClient;
