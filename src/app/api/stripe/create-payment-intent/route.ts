import { getServerAuthSession } from '@/server/auth';

import { calculateOrderAmount } from '@/lib/actions/cars';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { items, user } = await req.json();
  const session = await getServerAuthSession();

  if (user.email !== session?.user.email)
    return Response.json(
      { error: 'There was an error creation the payment e-mail for this user' },
      { status: 403 },
    );

  // Check if a customer with the given email already exists
  const existingCustomers = await stripe.customers.list({
    email: user.email,
    limit: 1,
  });

  let customer;

  if (existingCustomers.data.length > 0) {
    // If the customer exists, retrieve it
    customer = existingCustomers.data[0];
  } else {
    // If the customer does not exist, create a new one
    customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      // add more customer details if needed
    });
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(items),
    currency: 'usd',
    setup_future_usage: 'off_session',
    customer: customer.id, // associate the PaymentIntent with the customer
    metadata: {
      carId: items.carId,
      fromDate: items.fromDate,
      toDate: items.toDate,
      pickupTime: items.pickupTime,
      dropoffTime: items.dropoffTime,
      userEmail: user.email,
      userName: user.name,
    },
  });
  return Response.json({
    clientSecret: paymentIntent.client_secret,
    fullAmount: paymentIntent.amount / 100,
    currency: paymentIntent.currency,
  });
}
