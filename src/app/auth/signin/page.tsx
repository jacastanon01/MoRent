import React from 'react';
import SigninForm from '@/components/Auth/Signin/SigninForm';
import Logo from '@/components/shared/Logo';

export default async function SigninPage() {
  return (
    <>
      <div className='mb-6 flex flex-wrap items-center justify-center gap-x-2 text-center leading-normal text-gray-500 md:text-xl xl:text-2xl'>
        Rent more with <Logo />
      </div>
      <SigninForm />
    </>
  );
}
