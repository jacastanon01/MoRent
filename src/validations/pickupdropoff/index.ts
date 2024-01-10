import { z } from 'zod';

export const pickupDropOffSchema = z
  .object({
    location: z.string().min(1, { message: 'Required' }),
    from: z.date({ required_error: 'Required' }),
    to: z.date({ required_error: 'Required' }),
    pickuptime: z.string().min(1, { message: 'Required' }),
    dropofftime: z.string().min(1, { message: 'Required' }),
    lat: z.string().optional(),
    lng: z.string().optional(),
  })
  .refine((data) => data.from < data.to, {
    message: 'Start date must be before end date',
    path: ['from', 'to'],
  });
