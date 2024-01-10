'use client';
import PaymentProcessing from '@/components/Checkout/PaymentProcessing';
import PaymentSuccessful from '@/components/Checkout/PaymentSuccessful';
import PaymentUnsuccessful from '@/components/Checkout/PaymentUnsuccessful';
import { checkIfChargeIsPaid } from '@/lib/actions/stripe';
import React, { useEffect, useState } from 'react';

const ThankYouPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const redirectStatus = searchParams?.redirect_status;
  const paymentIntentId = searchParams?.payment_intent;

  const [chargeIsPaid, setChargeIsPaid] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    const checkPayment = async () => {
      if (redirectStatus === 'succeeded') {
        const chargePaid = await checkIfChargeIsPaid(paymentIntentId);
        setChargeIsPaid(chargePaid);
        if (!chargePaid) {
          timeoutId = window.setTimeout(checkPayment, 500);
        }
      }
    };
    checkPayment();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [redirectStatus, paymentIntentId]);

  return (
    <main className='container flex items-center justify-center px-2 py-10 md:py-20'>
      <div className='flex w-full max-w-[520px] flex-col items-center justify-center gap-[32px] rounded-[10px] bg-white px-4 py-10 shadow-lg dark:bg-gray-850 md:p-[50px]'>
        {redirectStatus === 'succeeded' ? (
          chargeIsPaid ? (
            <PaymentSuccessful />
          ) : (
            <PaymentProcessing />
          )
        ) : (
          <PaymentUnsuccessful />
        )}
      </div>
    </main>
  );
};

export default ThankYouPage;
