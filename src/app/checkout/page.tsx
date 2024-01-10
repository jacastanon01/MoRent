import CheckoutForm from '@/components/Checkout/CheckoutForm';
import Summary from '@/components/Checkout/Summary';
import { getServerAuthSession } from '@/server/auth';
const CheckoutPage = async () => {
  const session = await getServerAuthSession();
  return (
    <main className='container flex flex-col items-start justify-center gap-8 px-2 py-5 md:flex-row md:py-10'>
      <CheckoutForm session={session} />
      <Summary />
    </main>
  );
};

export default CheckoutPage;
