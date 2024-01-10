'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { ZodError } from 'zod';

import { createNewUser } from '@/lib/actions/user';
import { Button, FormInput, SigninError } from '../../shared';
import { CredentialSchema, RegisterFormType } from '@/validations/registration';

const Form = () => {
  const [formState, setFormState] = useState<RegisterFormType>({});
  const [formErrors, setFormErrors] = useState<RegisterFormType>({});
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
      });
      if (res?.error) {
        setFormErrors((prev) => ({ ...prev, form: 'Registration error' }));
        return;
      }
      if (res?.ok) {
        router.push('/');
        router.refresh();
      }
    }
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
      >
        Register
      </Button>
    </form>
  );
};

export default Form;
