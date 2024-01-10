'use client';

import { motion } from 'framer-motion';
import CarBackgroundImage from '../HowItWorksPage/HeroSection/CarBackgroundImage';
import Image from 'next/image';

const LeftBackgroundImage = () => (
  <motion.div
    initial={{ opacity: 0, x: 500 }}
    animate={{
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        duration: 0.3,
      },
    }}
    className='relative hidden flex-1 lg:block'
  >
    <CarBackgroundImage />
    <Image
      className='w-full object-contain'
      src='/assets/cars/jaguar.png'
      fill
      alt='Jaguar car'
    />
  </motion.div>
);

export default LeftBackgroundImage;
