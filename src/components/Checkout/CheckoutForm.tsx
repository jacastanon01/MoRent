'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from './StripeCheckout';
import { useSearchParams } from 'next/navigation';
import { Session } from 'next-auth';
import { isCarAvailable } from '@/lib/actions/cars';
import Link from 'next/link';
import { useThemeContext } from '@/context/ThemeProvider';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

const CheckoutForm = ({ session }: { session: Session | null }) => {
  const { mode } = useThemeContext();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (
      mode === 'dark' ||
      (mode === 'system' && document.documentElement.classList.contains('dark'))
    ) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [mode]);

  const [isPending, startTransition] = useTransition();
  const [carAvailable, setCarAvailable] = useState<boolean | null | undefined>(
    true,
  );
  const [clientSecret, setClientSecret] = useState('');
  const [fullAmount, setFullAmount] = useState();
  const [currency, setCurrency] = useState();

  const searchParams = useSearchParams();
  const pickupTime = searchParams.get('pickuptime');
  const dropoffTime = searchParams.get('dropofftime');
  const fromDate = searchParams.get('from');
  const toDate = searchParams.get('to');
  const carId = searchParams.get('carId');

  useEffect(() => {
    startTransition(() => {
      if (!carId || !fromDate || !toDate || !session?.user) return;
      const carIsAvailable = async () => {
        const res = await isCarAvailable(
          Number(carId),
          new Date(fromDate as string),
          new Date(toDate as string),
        );
        return res;
      };

      carIsAvailable().then((res) => {
        if (res) {
          setCarAvailable(true);
        } else {
          setCarAvailable(false);
        }
      });

      if (!carAvailable) return;

      // Create PaymentIntent as soon as the page loads
      fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: {
            carId,
            fromDate,
            toDate,
            pickupTime,
            dropoffTime,
          },
          user: session?.user,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
          setFullAmount(data.fullAmount);
          setCurrency(data.currency);
        });
    });
  }, [
    carAvailable,
    carId,
    dropoffTime,
    fromDate,
    pickupTime,
    session?.user,
    toDate,
  ]);

  const appearance = {
    theme: 'flat',
    variables: {
      colorBackground: isDark ? '#424B5C' : '#f6f7f9',
      colorText: isDark ? '#ffffff' : '#1A202C',
      fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
      fontSizeBase: '14px',
      borderRadius: '10px',
    },
    rules: {
      '.Label': {
        fontWeight: '600',
        marginBottom: '10px',
        marginTop: '10px',
        fontSize: '14px',
        letterSpacing: '0.4px',
        lineHeight: '20px',
        textTransform: 'Capitalize',
      },
      '.Input': {
        paddingLeft: '24px',
        fontSize: '14px',
        paddingTop: '18px',
        paddingBottom: '18px',
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

  return isPending || !clientSecret ? (
    <div className='order-2 flex w-full shrink-0 flex-col rounded-[10px] bg-white px-4 py-10 shadow-lg dark:bg-gray-850 md:order-1 md:max-w-[520px] md:p-[50px]'>
      <Skeleton className='h-[16px] w-[100px] rounded-lg bg-blue' />
      <div className='mt-8 flex flex-col gap-2'>
        <Skeleton className='mt-8 h-[14px] w-[80px] rounded-lg bg-gray-400 dark:bg-white-200' />
        <Skeleton className='h-[57px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
      </div>
      <div className='flex flex-row gap-2'>
        <div className='flex w-1/2 flex-col gap-2'>
          <Skeleton className='mt-8 h-[14px] w-[80px] rounded-lg bg-gray-400 dark:bg-white-200' />
          <Skeleton className='h-[57px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
        </div>
        <div className='flex w-1/2 flex-col gap-2'>
          <Skeleton className='mt-8 h-[14px] w-[80px] rounded-lg bg-gray-400 dark:bg-white-200' />
          <Skeleton className='h-[57px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='mt-8 h-[14px] w-[80px] rounded-lg bg-gray-400 dark:bg-white-200' />
        <Skeleton className='h-[57px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='mt-8 h-[14px] w-[80px] rounded-lg bg-gray-400 dark:bg-white-200' />
        <Skeleton className='h-[57px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
      </div>
      <div className='mt-3 flex flex-col gap-2'>
        <Skeleton className='h-[8px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
        <Skeleton className='h-[8px] w-full rounded-lg bg-white-200 dark:bg-gray-800' />
      </div>
      <div className='mt-8 flex flex-col gap-2'>
        <Skeleton className='h-[56px] w-full rounded-lg bg-blue' />
      </div>
    </div>
  ) : (
    <div className='order-2 flex w-full shrink-0 flex-col gap-[34px] rounded-[10px] bg-white px-4 py-10 shadow-lg dark:bg-gray-850 md:order-1 md:max-w-[520px] md:p-[50px]'>
      {carAvailable ? (
        <>
          {clientSecret && (
            <>
              <h1 className='text-lg font-extrabold text-blue'>Card Details</h1>

              <Elements options={options} stripe={stripePromise}>
                <StripeCheckout fullAmount={fullAmount} currency={currency} />
              </Elements>
            </>
          )}
        </>
      ) : (
        <>
          <h1 className='text-lg font-extrabold text-red-500'>
            Sorry but the car has been already booked
          </h1>
          <p className='text-gray'>
            The car you are looking for has been rented at the date you have
            choosen, please{' '}
            <Link href='/search' className='text-blue underline'>
              find another one
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
