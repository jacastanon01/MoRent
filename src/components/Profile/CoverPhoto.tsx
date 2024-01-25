'use client';

import React, { useRef, useTransition } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import type { User } from '@prisma/client';

import { Button, UserAvatar } from '../shared';
import Spinner from '../shared/Spinner/Spinner';
import { updateUser } from '@/lib/actions/user';
import { usePopupContext } from '@/context/PopupProvider';
import EditProfilePopup from '../Modals/EditProfilePopup/EditProfilePopup';

const CoverPhoto = ({ user }: { user: User }) => {
  const coverImgRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const { setPopup } = usePopupContext();

  async function handleCoverImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !coverImgRef.current?.files) return;
    const targetFiles = coverImgRef.current.files[0];

    if (!targetFiles) return null;
    startTransition(async () => {
      const formData = new FormData();
      formData.append('file', targetFiles);
      const res = await fetch(
        `/api/image?filename=${targetFiles.name}&from=cover`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const uploadUrl = await res.json();

      await updateUser({ coverImage: uploadUrl.url });
    });
  }

  return (
    <section className='mt-6 bg-white pb-12 dark:bg-gray-850'>
      {/* COVER IMAGE */}
      <motion.div
        whileHover={{ scale: 0.98 }}
        className='relative h-48 w-full rounded-t-xl bg-gray-200'
      >
        {isPending ? (
          <div className='flex h-full w-full items-center justify-center bg-transparent/10'>
            <Spinner />
          </div>
        ) : (
          <>
            <Image
              quality={100}
              src={user.coverImage ?? '/assets/cover.png'}
              alt='background'
              className='rounded-t-xl object-cover'
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
              priority
            />
            <label
              htmlFor='fileUploadCover'
              className='absolute bottom-3 right-3 rounded-md bg-gray-900 px-3 py-1 font-bold text-white opacity-60 hover:cursor-pointer'
            >
              <input
                ref={coverImgRef}
                id='fileUploadCover'
                accept='image/*'
                type='file'
                className='hidden'
                onChange={handleCoverImgUpload}
              />
              Edit Cover
            </label>
          </>
        )}
      </motion.div>

      {/* USER INFO */}
      <div className='flex w-full justify-between'>
        <div className='flex flex-col items-center sm:flex-row'>
          <div className='z-10 mx-4 mt-[-20px] h-20 w-20 rounded-full border-2 border-white bg-white/70 backdrop-blur-md dark:border-gray-600 sm:mt-[-50px] sm:h-36 sm:w-36'>
            <UserAvatar
              imgUrl={user.image}
              name={user.name}
              isProfileAvatar={true}
            />
          </div>
          <div className='my-auto pl-2 text-base font-bold capitalize leading-normal sm:text-2xl'>
            {user.name}
          </div>
        </div>
        <div className='self-end px-3'>
          <Button onClick={() => setPopup(<EditProfilePopup user={user} />)}>
            Edit Profile
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoverPhoto;
