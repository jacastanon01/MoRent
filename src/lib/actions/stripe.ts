'use server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const checkIfChargeIsPaid = async (paymentIntentId?: string) => {
  if (!paymentIntentId) {
    throw new Error('Payment intent id is required');
  }
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== 'succeeded') {
    throw new Error('Payment intent is not succeeded');
  }
  const latestCharge = paymentIntent.latest_charge;
  const charge = await stripe.charges.retrieve(latestCharge);
  return charge.status === 'succeeded';
};
