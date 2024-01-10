'use client';

import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import React from 'react';
import UploadOutline from './UploadOutline';
import { SigninError } from '..';
import { NewCarFormType } from '@/validations/cars';

const UploadImage = ({
  handleImageUpload,
  handleRemoveUpload,
  files,
  formErrors,
}: {
  handleImageUpload: (files: ExtFile[]) => void;
  handleRemoveUpload: (id: number) => void;
  files: any;
  formErrors: Pick<NewCarFormType, 'form'>;
}) => (
  <section className='w-full sm:min-w-[600px]'>
    <Dropzone
      onChange={handleImageUpload}
      maxFiles={10}
      value={files}
      accept='image/*'
    >
      <div className='flex w-full flex-col items-center gap-4'>
        <UploadOutline />
        <div className='text-xl font-medium'>
          Drag and drop an image, or{' '}
          <span className='text-blue-500'>Browse</span>
        </div>
        <div className='flex w-full flex-wrap justify-center gap-4 p-4 sm:justify-start'>
          {files?.map((file: any) => (
            <FileMosaic
              key={file.id}
              preview
              {...file}
              info
              onDelete={() => handleRemoveUpload(file.id)}
            />
          ))}
        </div>
      </div>
    </Dropzone>
    {formErrors.form && <SigninError errorMessage={formErrors.form} />}
  </section>
);

export default UploadImage;
