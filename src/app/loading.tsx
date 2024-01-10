import Logo from '@/components/shared/Logo';

const Loading = () => {
  return (
    <div className='z-10 flex h-[calc(100vh-100px)] w-full animate-pulse items-center justify-center bg-blue-200/25 dark:bg-blue-900/25'>
      <Logo className='text-8xl' />
    </div>
  );
};

export default Loading;
