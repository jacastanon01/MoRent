'use client';

import type { User } from '@prisma/client';
import React, { useState, useTransition } from 'react';

import { Button, UserAvatar } from '@/components/shared';
import Spinner from '@/components/shared/Spinner/Spinner';
import { Input } from '@/components/ui/input';
import { usePopupContext } from '@/context/PopupProvider';
import { updateUser } from '@/lib/actions/user';

const EditProfileForm = ({ user }: { user: User }) => {
  const [name, setName] = useState(user.name ?? '');
  const [isPending, startTransition] = useTransition();
  const { setPopup } = usePopupContext();

  async function handleImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const targetFiles = e.target.files[0];

    if (!targetFiles) return null;
    startTransition(async () => {
      const formData = new FormData();
      formData.append('file', targetFiles);
      const res = await fetch(`/api/image?from=avatar`, {
        method: 'POST',
        body: formData,
      });
      const uploadUrl = await res.json();

      try {
        await updateUser({ image: uploadUrl.url });

        user.image = uploadUrl.url;
      } catch (error: any) {
        throw new Error(error.message);
      }
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateUser({ name });
    setPopup(null);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <>
      <div className='my-12 flex items-center gap-4'>
        <div className='h-16 w-16 sm:h-28 sm:w-28'>
          {isPending ? (
            <Spinner />
          ) : (
            <UserAvatar imgUrl={user.image} name={user.name} />
          )}
        </div>
        <div>
          <label
            htmlFor='fileUpload'
            className='rounded-md bg-gray-100 px-4 py-3 font-semibold text-blue-500 hover:cursor-pointer'
          >
            <input
              id='fileUpload'
              accept='image/*'
              type='file'
              className='hidden'
              onChange={handleImgUpload}
            />
            Upload new picture
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='mt-6 flex-col'>
        <label className='text-xl font-bold tracking-wide'>Full Name</label>
        <Input
          onChange={handleNameChange}
          value={name}
          className='mt-4 w-full rounded-md border-none bg-white-200 px-6 py-2 text-lg font-medium leading-tight focus:outline-none dark:bg-gray-800'
        />
        <Button className='mt-12 p-3 text-xl font-bold tracking-wide'>
          Update Profile
        </Button>
      </form>
    </>
  );
};

export default EditProfileForm;
