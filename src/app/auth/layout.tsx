import React from 'react';
import LeftBackgroundImage from '@/components/Auth/Left';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=''>
      <div className='container h-full px-6 py-24 '>
        <div className='flex flex-col flex-wrap justify-center gap-4 md:flex-row'>
          <LeftBackgroundImage />

          {/* Right container with forms */}
          <section className='h-full flex-1'>
            <div className='flex justify-center rounded-b-lg bg-white p-6 shadow-md dark:bg-gray-850 md:rounded-lg'>
              {children}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
