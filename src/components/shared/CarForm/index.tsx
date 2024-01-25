'use client';

import type { ExtFile } from '@files-ui/react';
import { useRouter } from 'next/navigation';
import { ZodError, z } from 'zod';
import React, { useEffect, useState, useTransition } from 'react';
import { motion } from 'framer-motion';

import {
  NewCarFormType,
  NewCarSchema,
  mutableCarTypes,
  mutableTransmissionTypes,
} from '@/validations/cars';
import { Button, FormInput } from '..';
import { SelectCity } from '../SearchFields/SelectCity';
import Spinner from '../Spinner/Spinner';
import { editCar, addNewCar } from '@/lib/actions/cars';
import UploadImage from './UploadImage';

const CarForm = ({ carData }: { carData?: any }) => {
  const action = carData ? 'Update' : 'Add';
  const [formState, setFormState] = useState<NewCarFormType>({
    ...carData,
    carType: carData?.carType,
    year: carData?.year.toString(),
    fuelEfficiency: carData?.fuelEfficiency.toString(),
    capacity: carData?.capacity.toString(),
    rentPrice: carData?.rentPrice.toString(),
  });
  const [formErrors, setFormErrors] = useState<NewCarFormType>({});
  const [files, setFiles] = useState<ExtFile[]>([]);
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [region, setRegion] = useState('');
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const locale = new Intl.Locale(navigator.language).region ?? '';
    setRegion(locale);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 150, left: 0, behavior: 'smooth' });
  }, [formErrors.form]);

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    startTransition(async () => {
      e.preventDefault();

      let errors: NewCarFormType = {};
      const uploadURLs: string[] = carData?.images || [];

      if (files?.length) {
        if (files.length + uploadURLs.length >= 10) {
          errors.form = 'Must have less than 10 images of car';
        } else {
          try {
            for (const uploadedFile of files) {
              const formData = new FormData();
              formData.append('file', uploadedFile.file as File);
              if (uploadedFile) {
                const res = await fetch(`/api/image?from=car`, {
                  method: 'POST',
                  body: formData,
                });
                const uploadUrl = await res.json();
                if (uploadUrl.message) {
                  errors.form = uploadUrl.message;
                }
                uploadURLs.push(uploadUrl.url);
              } else {
                errors.form = 'No file to upload!';
              }
            }
          } catch (err) {
            console.log(err);
            errors.form = 'error uploading file';
          }
        }
      } else {
        if (!uploadURLs?.length) {
          errors.form = 'Please provide at least one photo to list car';
        }
      }

      if (errors.form) {
        setFormErrors((prevState) => ({
          ...prevState,
          form: errors.form,
        }));
      }

      const validatedInput = NewCarSchema.safeParse({
        make: formState.make,
        model: formState.model,
        color: formState.color,
        images: uploadURLs,
        rentPrice: formState.rentPrice,
        capacity: formState.capacity,
        transmission: formState.transmission,
        carType: formState.carType,
        fuelEfficiency: formState.fuelEfficiency,
        location,
        lat,
        lng,
        description: formState.description,
        year: formState.year,
      });

      if (!validatedInput.success) {
        if (validatedInput.error instanceof ZodError) {
          const flattenedErrors = validatedInput.error.flatten()
            .fieldErrors as NewCarFormType;
          errors = {
            ...errors,
            ...flattenedErrors,
            form:
              flattenedErrors.images?.[0] ??
              'Please verify all fields are correct',
          };
        }
        setFormErrors(errors);
        return;
      }

      try {
        let newCar;
        if (!carData) {
          newCar = await addNewCar(
            validatedInput.data,
            region,
            Number(lng),
            Number(lat),
          );
        } else {
          newCar = editCar(carData.id, validatedInput.data);
        }

        if (newCar) {
          setFormState({
            transmission: mutableTransmissionTypes[0],
            carType: mutableCarTypes[0],
          });
        }

        route.push('/profile');
      } catch (error: any) {
        // Handle zod errors
        if (error instanceof z.ZodError) {
          setFormErrors(error.flatten().fieldErrors);

          return;
        }
        setFormErrors((prevState) => ({
          ...prevState,
          form: error.message,
        }));
        throw Error('Error adding car to form');
      }
    });
  }

  async function handleImageUpload(incomingFiles: ExtFile[]) {
    if (!incomingFiles || !incomingFiles?.length) return;
    setFiles(incomingFiles || []);
    setFormErrors((prevState) => ({ ...prevState, form: undefined }));
  }

  function handleRemoveUpload(id: number) {
    setFiles(files.filter(({ id: fileId }) => fileId !== id));
  }
  const handleLocationChange = (location: string, lat: number, lng: number) => {
    setFormErrors((prevState) => ({
      ...prevState,
      location: undefined,
      lat: undefined,
      lng: undefined,
    }));
    console.log(location, lat, lng);
    setLocation(location);
    setLat(lat.toString());
    setLng(lng.toString());
  };

  const stateProps = { formState, setFormState, formErrors, setFormErrors };
  return (
    <motion.form
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      className='flex w-full flex-wrap gap-6 sm:min-w-[760px]'
      onSubmit={handleSubmit}
    >
      <section className='grid w-full gap-[25px] sm:grid-cols-2'>
        {/* DESCRIPTION */}
        <div className='sm:col-span-2'>
          <FormInput
            formKey='description'
            placeholder='Enter a short description of the car (max 250 characters...)'
            {...stateProps}
          />
        </div>
        {/* REST OF FIELDS */}
        <FormInput formKey='make' placeholder='Toyota' {...stateProps} />
        <FormInput formKey='model' placeholder='Corolla' {...stateProps} />
        <FormInput formKey='color' placeholder='Color' {...stateProps} />
        <FormInput
          formKey='year'
          placeholder='No older than 2000'
          {...stateProps}
        />
        <FormInput
          formKey='carType'
          fieldType='select'
          selectOptions={mutableCarTypes}
          {...stateProps}
        />
        <FormInput
          formKey='rentPrice'
          label='Daily Rent Price (in $)'
          placeholder={'100'}
          {...stateProps}
        />
        {!carData && (
          <SelectCity
            handleLocationChange={handleLocationChange}
            location={location}
            errorMessage={
              formErrors.location || formErrors.lat || formErrors.lng
            }
            className='md:col-span-2 xl:col-span-1'
          />
        )}

        <FormInput
          label={`Fuel Efficiency (in ${region === 'US' ? 'mpg' : 'L/100km'})`}
          formKey='fuelEfficiency'
          placeholder={`25`}
          {...stateProps}
        />
        <FormInput
          formKey='transmission'
          fieldType='select'
          selectOptions={mutableTransmissionTypes}
          {...stateProps}
        />
        <FormInput
          formKey='capacity'
          placeholder='Capacity in persons'
          {...stateProps}
        />
      </section>
      {/* IMG UPLOAD */}
      {(carData?.images?.length < 9 || action === 'Add') && (
        <UploadImage
          handleImageUpload={handleImageUpload}
          handleRemoveUpload={handleRemoveUpload}
          files={files}
          formErrors={formErrors}
        />
      )}

      <div className='ml-auto mt-4 sm:mt-8'>
        <Button
          disabled={isPending}
          type='submit'
          className={isPending ? 'animate-pulse' : ''}
        >
          {isPending && <Spinner />}{' '}
          {isPending ? `${action}ing Car...` : `${action} Car`}
        </Button>
      </div>
    </motion.form>
  );
};

export default CarForm;
