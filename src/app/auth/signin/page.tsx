import React from 'react';
import { redirect } from 'next/navigation';
import SigninForm from '@/components/Auth/Signin/SigninForm';
import { getServerAuthSession } from '@/server/auth';
import FormCard from '@/components/Auth/FormCard';
import Logo from '@/components/shared/Logo';

export default async function SigninPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect('/');
  }

  return (
    <FormCard className='p-4 md:p-8'>
      <div className='mb-6 flex flex-wrap items-center justify-center gap-x-2 text-center leading-normal text-gray-500 md:text-xl xl:text-2xl'>
        Rent more with <Logo />
      </div>
      <SigninForm />
    </FormCard>
  );
}
