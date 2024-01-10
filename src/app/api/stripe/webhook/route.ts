import { getCarById } from '@/lib/actions/cars';
import { addNewRental } from '@/lib/actions/rental';
import { getUserByEmail } from '@/lib/actions/user';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const dynamic = 'force-dynamic';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');

  const body = await req.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle the event
    switch (event?.type) {
      case 'charge.succeeded': {
        const chargeSucceeded = event.data.object;

        const { carId, fromDate, toDate, pickupTime, dropoffTime, userEmail } =
          chargeSucceeded.metadata;

        const car = await getCarById(Number(carId));
        const user = await getUserByEmail(userEmail);

        if (!car || !user) {
          console.log('Car or user not found');
          return NextResponse.json({ status: 200 });
        }

        await addNewRental({
          carId: car.id,
          total: chargeSucceeded.amount / 100,
          locationId: car.locationId,
          status: 'BOOKED',
          startDate: new Date(`${fromDate}T${pickupTime}:00.000Z`),
          endDate: new Date(`${toDate}T${dropoffTime}:00.000Z`),
          pickUpTime: new Date(`${fromDate}T${pickupTime}:00.000Z`),
          dropOffTime: new Date(`${toDate}T${dropoffTime}:00.000Z`),
          userId: user.id,
        });

        break;
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event?.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return NextResponse.json({ status: 200 });
  } catch (err: any) {
    console.log(err?.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err?.message}` },
      { status: 400 },
    );
  }
}
