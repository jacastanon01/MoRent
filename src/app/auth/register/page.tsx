import RegisterForm from '@/components/Auth/Register/RegisterForm';
import Logo from '@/components/shared/Logo';

export default async function RegisterPage() {
  return (
    <>
      <div className='mb-6 flex flex-wrap items-center justify-center gap-x-2 text-center leading-normal text-gray-500 md:text-xl xl:text-2xl'>
        Create a <Logo /> account
      </div>
      <RegisterForm />
    </>
  );
}
