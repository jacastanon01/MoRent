import { z } from 'zod';

export const AvailabilityStatus = [
  'AVAILABLE',
  'BOOKED',
  'UNAVAILABLE',
] as const;

export const NewRentalSchema = z.object({
  carId: z.number({ required_error: 'CarId Required' }),
  total: z.number({ required_error: 'Total Amount Required' }),
  locationId: z.number({ required_error: 'LocationId Required' }),
  status: z.enum(AvailabilityStatus),
  startDate: z.date({ required_error: 'Start Date Required' }),
  endDate: z.date({ required_error: 'End Date Required' }),
  pickUpTime: z.date({ required_error: 'Pickup Time Required' }),
  dropOffTime: z.date({ required_error: 'Dropoff Time Required' }),
  userId: z.string({ required_error: 'UserId Required to create rental' }),
});
