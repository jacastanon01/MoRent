import React from 'react';

import { cn } from '@/lib/utils';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const FormItem = <T extends Record<string, any>>({
  formKey,
  formState,
  setFormState,
  formErrors,
  label,
  setFormErrors,
  fieldType = 'text',
  selectOptions,
  placeholder,
  className,
}: {
  formKey: string;
  formState: T;
  label?: string | React.ReactNode;
  setFormState: React.Dispatch<React.SetStateAction<T>>;
  formErrors: T;
  setFormErrors: React.Dispatch<React.SetStateAction<T>>;
  fieldType?: 'text' | 'email' | 'password' | 'select';
  selectOptions?: string[];
  placeholder?: string;
  className?: string;
}) => {
  const spacedOutLabel = (title: string) => title.replace(/([A-Z])/g, ' $1');

  function resetFieldError(fieldName: string) {
    setFormErrors((prevState) => ({
      ...prevState,
      [fieldName]: undefined,
    }));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
  ) {
    resetFieldError(formKey);
    if (typeof e === 'string') {
      return setFormState((prevState) => ({
        ...prevState,
        [formKey]: e,
      }));
    }
    setFormState((prevState) => ({
      ...prevState,
      [formKey]: e.target.value,
    }));
  }

  return (
    <div className={cn('flex w-full flex-col text-sm sm:text-base', className)}>
      <div className='flex flex-col gap-[10px] sm:gap-4'>
        <label
          htmlFor={formKey}
          className='text-base font-bold capitalize tracking-wide'
        >
          {label || spacedOutLabel(formKey)}
        </label>
        <div className='relative flex flex-col'>
          {formErrors[formKey] && (
            <p className='absolute right-0 top-[-30px] rounded-lg text-red-500'>
              {formErrors[formKey]}
            </p>
          )}

          {fieldType === 'select' ? (
            <Select
              defaultValue={formState[formKey] ?? ''}
              onValueChange={handleChange}
              name={formKey}
            >
              <SelectTrigger
                className={cn(
                  `w-full rounded-md bg-white-200 px-6 leading-tight focus:outline-none border-none text-sm dark:bg-gray-800`,
                  formErrors[formKey] &&
                    '!border !border-red-500 !bg-red-50 font-bold !text-red-500',
                )}
              >
                <SelectValue placeholder='Select a car type' />
              </SelectTrigger>
              <SelectContent>
                {selectOptions &&
                  selectOptions.map((option) => (
                    <SelectItem
                      key={option}
                      value={option}
                      className='cursor-pointer uppercase'
                    >
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              className={cn(
                `w-full rounded-md text-sm bg-white-200 border-none px-6  leading-tight focus:outline-none dark:bg-gray-800`,
                formErrors[formKey] &&
                  '!border !border-red-500 !bg-red-50 font-bold !text-red-500',
              )}
              type={
                formKey === 'email'
                  ? 'email'
                  : formKey === 'password'
                    ? 'password'
                    : 'text'
              }
              name={formKey}
              value={formState[formKey] ?? ''}
              placeholder={placeholder || formKey}
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormItem;
