'use client';
import { useRouter } from 'next/navigation';
export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      className='mt-2 flex h-14 w-full items-center justify-center rounded-[10px] bg-blue font-bold text-white'
      type='button'
      onClick={() => router.back()}
    >
      Try Again
    </button>
  );
}
