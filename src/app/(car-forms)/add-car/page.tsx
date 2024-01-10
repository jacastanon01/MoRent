import CarForm from '@/components/shared/CarForm';
import React from 'react';

const AddCarPage = () => {
  return (
    <div>
      <p className=' text-2xl font-bold'>Add your car</p>
      <p className='text-sm text-gray-400'>Provide your car details</p>
      <p className='my-6 text-xl font-extrabold uppercase text-blue-500'>
        Car Info
      </p>
      <CarForm />
    </div>
  );
};

export default AddCarPage;
