// import { CarTypes } from '.prisma/client';
import { z } from 'zod';

export const carTypes = [
  'SUV',
  'SPORT',
  'SEDAN',
  'COMPACT',
  'COUPE',
  'HATCHBACK',
  'TRUCK',
  'VAN',
] as const;
export const transmissionTypes = ['MANUAL', 'AUTOMATIC'] as const;
export const fuelEfficiencyUnits = ['M', 'L'] as const;
export const mutableCarTypes = [...carTypes];
export const mutableTransmissionTypes = [...transmissionTypes];

export const NewCarSchema = z.object({
  make: z.string({ required_error: 'Please enter the car make' }).trim().min(1),
  model: z
    .string({ required_error: 'Please enter the car model' })
    .trim()
    .min(1),
  color: z.string().trim().min(1),
  url: z.string().optional(),
  images: z
    .array(z.string())
    .nonempty({ message: 'Please provide at least one photo to list car' })
    .max(9, { message: 'Must have less than 10 images of car' }),
  year: z.string().refine(
    (v) => {
      const n = Number(v);
      return n >= 2000 && n <= new Date(Date.now()).getFullYear() + 1;
    },
    {
      message: 'Must be a 21st century car',
    },
  ),
  rentPrice: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && n >= 0 && n <= 10000;
    },
    { message: 'Rental price must be between 0-10,000' },
  ),
  capacity: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && n >= 1 && n <= 8;
    },
    { message: 'No more than 8 passengers' },
  ),
  transmission: z.enum(transmissionTypes),
  carType: z.enum(carTypes),
  fuelEfficiency: z.string().refine(
    (v) => {
      const n = Number(v);
      return !isNaN(n) && n >= 5 && n <= 100;
    },
    { message: 'Enter a number between 5 and 100' },
  ),
  location: z.string(),
  lat: z.string(),
  lng: z.string(),
  description: z
    .string()
    .trim()
    .min(1)
    .max(250, { message: 'Description cannot exceed 250 characters' }),
});

export type NewCarType = z.infer<typeof NewCarSchema>;
export interface NewCarFormType extends Partial<NewCarType> {
  form?: string | undefined;
}
export type TransmissionEnum = z.infer<typeof NewCarSchema>['transmission'];
export type CarTypesEnum = z.infer<typeof NewCarSchema>['carType'];
