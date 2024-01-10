import FormCard from '@/components/Auth/FormCard';
import RegisterForm from '@/components/Auth/Register/RegisterForm';
import Logo from '@/components/shared/Logo';
import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect('/');
  }

  return (
    <FormCard className='p-4 md:p-8'>
      <div className='mb-6 flex flex-wrap items-center justify-center gap-x-2 text-center leading-normal text-gray-500 md:text-xl xl:text-2xl'>
        Create a <Logo /> account
      </div>
      <RegisterForm />
    </FormCard>
  );
}
