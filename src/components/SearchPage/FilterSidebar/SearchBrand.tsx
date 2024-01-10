'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import SearchIcon from './SearchIcon';
import { addOrReplaceSearchParams, cn } from '@/lib/utils';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const FormSchema = z.object({
  brand: z.string().optional(),
});

const SearchBrand = ({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brand: searchParams.get('brand') || '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      try {
        addOrReplaceSearchParams(
          [{ brand: data.brand || '' }, { page: '1' }],
          router,
        );
      } catch (error: any) {
        // Handle errors
        toast({
          title: 'Error searching for brand!',
          description: `Error: ${error.message}`,
          variant: 'destructive',
          duration: 2000,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col w-full', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='brand'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Input
                    className='rounded-[10px] border-blue-50 py-6 pl-12 font-medium text-gray-700 placeholder:text-gray-700 focus:!ring-blue-500 dark:border-gray-800 dark:bg-gray-850 dark:text-blue-100 dark:placeholder:text-blue-100'
                    placeholder='Search by brand or title'
                    disabled={isPending}
                    {...field}
                  />
                  <SearchIcon className='absolute left-3 top-3.5 dark:stroke-blue-100' />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type='submit'></button>
      </form>
    </Form>
  );
};

export default SearchBrand;
