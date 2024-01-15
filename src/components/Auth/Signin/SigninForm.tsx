'use client';

import { signIn } from 'next-auth/react';
import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

import { Button, FormInput, SigninError } from '../../shared';
import GoogleLogo from './GoogleLogo';
import { LoginSchema, SigninFormType } from '@/validations/login';

const SigninForm = () => {
  const [formState, setFormState] = useState<SigninFormType>({});
  const [isPending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<SigninFormType>({});
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    const validatedInput = LoginSchema.safeParse({
      email: formState.email?.toLocaleLowerCase(),
      password: formState.password,
    });

    if (!validatedInput.success) {
      if (validatedInput.error instanceof ZodError) {
        const flattenedErrors = validatedInput.error.flatten().fieldErrors;
        setFormErrors(flattenedErrors as SigninFormType);
      }
      return;
    }

    startTransition(async () => {
      const res = await signIn('credentials', {
        redirect: false,
        email: validatedInput.data.email,
        password: validatedInput.data.password,
        callbackUrl: '/',
      });

      if (res?.error) {
        setFormErrors({
          form: res.error,
        });
      }

      router.refresh();
    });
  }

  async function handleProvider() {
    startTransition(async () => {
      try {
        await signIn('google', { callbackUrl: '/' });
      } catch (e: any) {
        setFormErrors((prevState) => ({
          ...prevState,
          form: 'Unable to login with Google at the moment',
        }));
        console.log(e);
      }
    });
  }

  const stateProps = { formState, setFormState, formErrors, setFormErrors };

  return (
    <>
      <form className='flex w-full flex-col gap-[25px]' onSubmit={handleSubmit}>
        {formErrors.form && <SigninError errorMessage={formErrors.form} />}
        {['email', 'password'].map((item) => (
          <FormInput key={item} formKey={item} {...stateProps} />
        ))}
        <Button
          disabled={isPending}
          className='mt-4 border-gray-300 font-medium shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
          type='submit'
        >
          Login
        </Button>
      </form>
      <div className='relative flex items-center py-5'>
        <div className='grow border-t-[0.4px] border-gray-400'></div>
        <span className='shrink font-medium dark:text-neutral-200'>OR</span>
        <div className='grow border-t-[0.4px] border-gray-400'></div>
      </div>

      <Button
        disabled={isPending}
        className='flex items-center rounded-lg border bg-white px-6 py-2 font-medium text-gray-800 shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-white'
        onClick={handleProvider}
      >
        <GoogleLogo />
        <span className=' leading-normal'>Continue with Google</span>
      </Button>

      <section className='text-sm md:self-end'>
        Don&#39;t have an account?
        <span className='ml-1 text-blue-500 hover:text-blue-400'>
          <Link href={'/auth/register'}>Create one</Link>
        </span>
      </section>
    </>
  );
};

export default SigninForm;
