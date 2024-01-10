import React from 'react';

export default function CarFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex justify-center px-0 py-12 md:px-6'>
      <div className='max-w-[869px] rounded-lg bg-white p-6 shadow-md dark:bg-gray-850'>
        {children}
      </div>
    </main>
  );
}
