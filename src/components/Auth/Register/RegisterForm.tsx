'use client';

// import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState, useTransition } from 'react';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { createNewUser } from '@/lib/actions/user';
import { Button, FormInput, SigninError } from '../../shared';
import { CredentialSchema, RegisterFormType } from '@/validations/registration';

const Form = () => {
  const [formState, setFormState] = useState<RegisterFormType>({});
  const [formErrors, setFormErrors] = useState<RegisterFormType>({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, password } = formState;

    const validatedInput = CredentialSchema.safeParse({
      name,
      email: email?.toLocaleLowerCase(),
      password,
    });

    if (!validatedInput.success) {
      if (validatedInput.error instanceof ZodError) {
        const flattenedErrors = validatedInput.error.flatten().fieldErrors;
        setFormErrors(flattenedErrors as RegisterFormType);
      }
      return;
    }

    startTransition(async () => {
      const newUser = await createNewUser(validatedInput.data);
      if (newUser) {
        if ('error' in newUser) {
          const { error } = newUser;
          setFormErrors((prevState) => ({
            ...prevState,
            form: error,
          }));
          return;
        }

        const res = await signIn('credentials', {
          email: email?.toLocaleLowerCase(),
          password,
          callbackUrl: '/',
        });
        if (res?.error) {
          setFormErrors((prev) => ({ ...prev, form: 'Registration error' }));
        }

        router.refresh();
      }
    });
  }

  const stateProps = { formState, setFormState, formErrors, setFormErrors };

  return (
    <form className='flex w-full flex-col gap-[25px]' onSubmit={handleSubmit}>
      {formErrors.form && <SigninError errorMessage={formErrors.form} />}
      {['name', 'email', 'password'].map((item) => (
        <FormInput key={item} formKey={item} {...stateProps} />
      ))}
      <Button
        className='my-4 border-gray-300 font-medium shadow-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
        type='submit'
        disabled={isPending}
      >
        Register
      </Button>
      <section className='text-sm md:self-end'>
        Already have an account?
        <span className='ml-1 text-blue-500 hover:text-blue-400'>
          <Link href={'/auth/signin'}>Sign in here</Link>
        </span>
      </section>
    </form>
  );
};

export default Form;
