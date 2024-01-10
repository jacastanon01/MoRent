'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

const GenerateReceiptButton = () => {
  const searchParams = useSearchParams();

  const handleGenerateReceipt = async () => {
    try {
      const paymentIntentId = searchParams.get('payment_intent');
      const stripe = await stripePromise;

      if (!stripe) throw new Error('Stripe is not found');
      if (!paymentIntentId) {
        throw new Error('Payment intent is not found');
      }

      const response = await fetch(
        `/api/stripe/generate-receipt?paymentIntentId=${paymentIntentId}`,
      );
      const { receiptUrl } = await response.json();
      // Open the receipt URL in a new tab
      window.open(receiptUrl, '_blank');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className='text-gray-400' onClick={handleGenerateReceipt}>
      Generate Receipt
    </button>
  );
};

export default GenerateReceiptButton;
