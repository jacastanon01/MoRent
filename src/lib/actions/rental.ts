import { db } from '@/server/db';
import { NewRentalSchema } from '@/validations/rental';
import { Prisma, Rental } from '@prisma/client';

export const addNewRental = async (rentalInfo: Partial<Rental>) => {
  try {
    const ParsedRentalInfo = NewRentalSchema.safeParse(rentalInfo);

    if (!ParsedRentalInfo.success) {
      throw new Error('error validating car form');
    }
    const newRental = await db.rental.create({
      data: {
        ...ParsedRentalInfo.data,
      },
    });

    return newRental;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw Error(`Unique constraint ${error.message}`);
      }
      throw Error('Error adding rental');
    }
    throw Error(error.message);
  }
};
