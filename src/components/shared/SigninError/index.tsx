'use client';

import { motion } from 'framer-motion';
import React from 'react';

const SigninError = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeIn',
        },
      }}
      className='mt-4 w-full bg-red-50 p-4 text-center font-bold text-red-500'
    >
      {errorMessage}
    </motion.div>
  );
};

export default SigninError;
