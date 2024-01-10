'use client';

import React from 'react';
import type { User } from '@prisma/client';
import EditProfileForm from './EditProfileForm';
import Modal from '../Modal';

const EditProfilePopup = ({ user }: { user: User }) => {
  return (
    <Modal className='!max-w-[500px]'>
      <div className='p-4'>
        <div>
          <p className='text-xl font-bold leading-relaxed tracking-wide'>
            Edit Profile
          </p>
          <p className='mt-1 text-sm leading-normal text-gray-400'>
            Please enter your info
          </p>
        </div>
        <EditProfileForm user={user} />
      </div>
    </Modal>
  );
};

export default EditProfilePopup;
