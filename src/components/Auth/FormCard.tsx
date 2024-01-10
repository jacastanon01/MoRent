'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const FormCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      animate={{
        opacity: 1,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      exit={{ opacity: 0, transition: { duration: 2, ease: 'easeIn' } }}
      initial={{ opacity: 0 }}
      className={cn('w-full md:px-8 lg:px-24', className)}
    >
      <div className='mt-4 flex flex-col gap-4 text-black dark:bg-gray-850 dark:text-white-100 sm:gap-6'>
        {children}
      </div>
    </motion.div>
  );
};

export default FormCard;
