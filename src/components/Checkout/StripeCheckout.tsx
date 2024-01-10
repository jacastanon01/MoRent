import React, { useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '../shared';
import Spinner from '../shared/Spinner/Spinner';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import getSymbolFromCurrency from 'currency-symbol-map';

export default function StripeCheckout({
  fullAmount,
  currency,
}: {
  fullAmount?: number;
  currency?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<null | string>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return;
      switch (paymentIntent.status) {
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/thank-you`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message ?? 'An unexpected error occurred.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const paymentElementOptions = {
    layout: 'tabs',
  } as StripePaymentElementOptions;

  return (
    <form
      id='payment-form'
      className='flex flex-col gap-6'
      onSubmit={handleSubmit}
    >
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      <Button
        className='h-14 font-bold'
        disabled={isLoading || !stripe || !elements}
        type='submit'
      >
        {isLoading ? (
          <div className='flex items-center justify-center gap-2'>
            <Spinner /> Loading...
          </div>
        ) : fullAmount && currency ? (
          `Pay now ${getSymbolFromCurrency(currency)}${fullAmount
            .toFixed(2)
            .toString()} `
        ) : (
          `There was a problem initializing the payment form.`
        )}
      </Button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
}
