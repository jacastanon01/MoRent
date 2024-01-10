import { z } from 'zod';

export const searchSchema = z
  .object({
    location: z.string().min(1, { message: 'Required' }),
    from: z.date({ required_error: 'Required' }),
    to: z.date({ required_error: 'Required' }),
    lat: z.string({ required_error: 'Required' }),
    lng: z.string({ required_error: 'Required' }),
  })
  .refine((data) => data.from < data.to, {
    message: 'Start date must be before end date',
    path: ['from', 'to'],
  });
