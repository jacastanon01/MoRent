'use client';

import { addOrReplaceSearchParams } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const NextPageButton = () => {
  const router = useRouter();
  const params = useSearchParams();
  const page = Number(params.get('page'));
  return (
    <button
      className='flex h-14 w-[228px] items-center justify-center rounded-lg bg-blue-500 text-base font-bold text-white hover:bg-blue-700'
      onClick={() =>
        addOrReplaceSearchParams(
          [{ page: ((page || 1) + 1).toString() }],
          router,
        )
      }
    >
      Show more cars
    </button>
  );
};

export default NextPageButton;
