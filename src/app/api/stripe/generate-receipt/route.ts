// This is your test secret API key.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentIntentId = searchParams.get('paymentIntentId');
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const latestChargeId = paymentIntent.latest_charge;

  const latestCharge = await stripe.charges.retrieve(latestChargeId);

  const receiptUrl = latestCharge.receipt_url;

  return Response.json({
    receiptUrl,
  });
}
