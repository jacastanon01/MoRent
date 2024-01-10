'use server';

import { Car, CarTypes, FuelEfficiencyUnits, Prisma } from '@prisma/client';

import { db } from '@/server/db';
import { NewCarFormType, NewCarSchema } from '@/validations/cars';
import { getServerAuthSession } from '@/server/auth';
import { revalidatePath, unstable_cache as unstableCache } from 'next/cache';

export const addNewCar = async (
  carInfo: NewCarFormType,
  locale: string | null,
  lon: number,
  lat: number,
) => {
  const ParsedCarInfo = NewCarSchema.safeParse(carInfo);

  if (!ParsedCarInfo.success) {
    return { error: 'error validating car form' };
  }

  let units = '';
  if (locale === 'US') {
    units = 'M';
  } else {
    units = 'L';
  }

  try {
    const userSession = await getServerAuthSession();

    if (!userSession) throw Error('User not found');
    const user = await db.user.findUnique({
      where: {
        email: userSession?.user?.email ?? '',
      },
    });

    if (!user) return { error: 'user not found' };

    const locationId = await db.location.upsert({
      select: {
        id: true,
      },
      where: {
        address: ParsedCarInfo.data.location,
      },
      create: {
        latitude: lat,
        longitude: lon,
        address: ParsedCarInfo.data.location,
      },
      update: {},
    });

    const newCar = await db.car.create({
      data: {
        make: ParsedCarInfo.data.make,
        model: ParsedCarInfo.data.model,
        color: ParsedCarInfo.data.color,
        capacity: Number(ParsedCarInfo.data.capacity),
        description: ParsedCarInfo.data.description,
        transmission: ParsedCarInfo.data.transmission,
        fuelEfficiency: parseFloat(ParsedCarInfo.data.fuelEfficiency),
        fuelEfficiencyUnit: units as FuelEfficiencyUnits,
        rentPrice: parseFloat(ParsedCarInfo.data.rentPrice),
        year: Number(ParsedCarInfo.data.year),
        type: ParsedCarInfo.data.carType,
        images: ParsedCarInfo.data.images,
        addedById: user.id,
        locationId: locationId?.id ? locationId.id : 0,
      },
      include: {
        addedBy: true,
      },
    });
    revalidatePath('/');
    return newCar;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw Error(`Unique constraint ${error.message}`);
      }
      throw Error('Error adding car');
    }
    throw Error(error.message);
  }
};

export const editCar = async (carId: number, carInfo: NewCarFormType) => {
  const ParsedCarInfo = NewCarSchema.safeParse(carInfo);

  if (!ParsedCarInfo.success) {
    return { error: 'error validating car form' };
  }

  try {
    const userSession = await getServerAuthSession();

    if (!userSession?.user) throw Error('User not found');
    const user = await db.user.findUnique({
      where: {
        id: userSession.user.id,
      },
    });

    if (!user) return { error: 'user not found' };

    const updatedCar = await db.car.update({
      where: {
        id: carId,
      },
      data: {
        make: ParsedCarInfo.data.make,
        model: ParsedCarInfo.data.model,
        color: ParsedCarInfo.data.color,
        capacity: Number(ParsedCarInfo.data.capacity),
        description: ParsedCarInfo.data.description,
        transmission: ParsedCarInfo.data.transmission,
        fuelEfficiency: parseFloat(ParsedCarInfo.data.fuelEfficiency),
        rentPrice: parseFloat(ParsedCarInfo.data.rentPrice),
        year: Number(ParsedCarInfo.data.year),
        type: ParsedCarInfo.data.carType,
        images: ParsedCarInfo.data.images,
        addedById: user.id,
      },
      include: {
        addedBy: true,
      },
    });
    revalidatePath('/');
    return updatedCar;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw Error(`Unique constraint ${error.message}`);
      }
      throw Error('Error adding car');
    }
  }
};

export const removeCarById = async (id: number) => {
  try {
    const removedCar = await db.car.delete({
      where: {
        id,
      },
    });
    revalidatePath('page');
    return removedCar;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const removeImageFromCar = async (id: number, imgUrl: string) => {
  try {
    const car = await getCarById(id);
    if (!car) throw Error('car not found');
    const updatedImages = car.images.filter((img) => img !== imgUrl);
    const removedImg = await db.car.update({
      where: { id },
      data: {
        images: updatedImages,
      },
    });

    if (!removedImg) throw Error('error removing image');
    revalidatePath('/');
    return true;
  } catch (error: any) {
    throw Error(error.message);
  }
};

// GET ALL CARS WITH FILTERS

export const _getFilteredCars = async (
  lat?: number,
  lng?: number,
  types?: CarTypes[],
  maxPrice?: number,
  brand?: string,
  capacity?: number[],
  page?: number,
  fromDate?: Date,
  toDate?: Date,
  numberOfResult: number = 6,
) => {
  try {
    const cars: Car[] = await db.car.findMany({
      where: {
        ...(lat &&
          lng && {
            location: {
              latitude: { gt: lat - 0.5, lt: lat + 0.5 },
              longitude: { gt: lng - 0.5, lt: lng + 0.5 },
            },
          }),
        ...(brand && { make: { contains: brand, mode: 'insensitive' } }),
        ...(maxPrice && { rentPrice: { lte: maxPrice } }),
        ...(types?.length && { type: { in: types } }),
        ...(capacity?.length && {
          capacity: {
            gte: capacity.reduce((a, b) => Math.max(a, b), -Infinity),
          },
        }),
        ...(fromDate &&
          toDate && {
            rentalHistory: {
              none: {
                AND: [
                  { startDate: { lte: toDate } },
                  { endDate: { gte: fromDate } },
                ],
              },
            },
          }),
      },
      ...(page && { skip: page * numberOfResult - numberOfResult }),
      ...(page && { take: numberOfResult }),
    });

    return cars;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw Error(`Unique constraint ${error.message}`);
      }
      throw Error('Error searching cars');
    }
    throw Error(error.message);
  }
};

export const getFilteredCars = unstableCache(
  _getFilteredCars,
  ['getFilteredCars'],
  { revalidate: 30 },
);

export const getAllCars = unstableCache(
  async () => {
    try {
      const cars = await db.car.findMany();
      return cars;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
  ['getAllCars'],
  { revalidate: 60 },
);

export const getCarById = unstableCache(
  async (id: number) => {
    try {
      const car = await db.car.findUnique({
        where: {
          id,
        },
        include: {
          location: true,
        },
      });
      return car;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
  ['getCarById'],
  { revalidate: 60 },
);

type ItemType = {
  carId: string;
  fromDate: string;
  toDate: string;
  pickupTime: string;
  dropoffTime: string;
};
export const calculateOrderAmount = async (items: ItemType) => {
  const { carId, fromDate, toDate, pickupTime, dropoffTime } = items;
  if (!carId || !fromDate || !toDate || !pickupTime || !dropoffTime)
    throw new Error('Missing required fields');

  const car = await getCarById(Number(carId));
  if (!car) throw new Error('Car not found');

  const fromDateObj = new Date(fromDate);
  const toDateObj = new Date(toDate);
  const pickupTimeObj = new Date(pickupTime);
  const dropoffTimeObj = new Date(dropoffTime);

  // Calculate the difference in days
  let diffInDays = Math.ceil(
    (toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 3600 * 24),
  );

  // Check if dropoffTime is greater than pickupTime
  if (dropoffTimeObj > pickupTimeObj) {
    // Add one day to the difference
    diffInDays += 1;
  }

  // Calculate the order amount based on the car's price per day
  const orderAmount = diffInDays * car?.rentPrice * 100;

  return orderAmount;
};

export async function isCarAvailable(
  carId: number,
  fromDate: Date,
  toDate: Date,
) {
  // Fetch the car with its rental history
  const car = await db.car.findUnique({
    where: {
      id: carId,
      ...(fromDate &&
        toDate && {
          rentalHistory: {
            none: {
              AND: [
                { startDate: { lte: toDate } },
                { endDate: { gte: fromDate } },
              ],
            },
          },
        }),
    },
  });

  // If the car does not exist, return false
  if (!car) return false;

  // If none of the rentals overlap with the given period, the car is available
  return true;
}

export const _getPopularCars = async (
  lat?: number,
  lng?: number,
  numberOfResult: number = 4,
) => {
  try {
    if (typeof numberOfResult !== 'number')
      throw Error('Invalid number of results');

    if (lat && lng) {
      if (typeof lat !== 'number' || typeof lng !== 'number')
        throw Error('Invalid coordinates');

      const popularCars: any[] = await db.$queryRaw`
      SELECT "Location".*, "Car".*, CAST(COUNT("Rental"."id") AS VARCHAR) AS "rentalCount",
          (
            111.045 * sqrt(
              pow(${lat} - "Location"."latitude", 2) +
              pow(${lng} - "Location"."longitude", 2) * cos(${lat} / 57.2958)
            )
          ) AS distance
        FROM "public"."Location"
        JOIN "public"."Car" ON "Car"."locationId" = "Location"."id"
        LEFT JOIN "public"."Rental" ON "Car"."id" = "Rental"."carId"
        GROUP BY "Location"."id", "Car"."id"
        ORDER BY distance, "rentalCount" DESC
        LIMIT ${numberOfResult}`;

      return popularCars;
    }
    const popularCars: any[] = await db.$queryRaw`
    SELECT * FROM (
      SELECT "Location".*, "Car".*, CAST(COUNT("Rental"."id") AS VARCHAR) AS "rentalCount"
      FROM "public"."Location"
      JOIN "public"."Car" ON "Car"."locationId" = "Location"."id"
      LEFT JOIN "public"."Rental" ON "Car"."id" = "Rental"."carId"
      GROUP BY "Location"."id", "Car"."id"
    ) AS rental_table
    ORDER BY "rentalCount" DESC
    LIMIT ${numberOfResult}`;

    return popularCars;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw Error(error.message);
    }
    throw Error(error.message);
  }
};

export const getPopularCars = unstableCache(
  _getPopularCars,
  ['getPopularCars'],
  { revalidate: 30 },
);

export const getCarRentalHistory = async (carId: number) => {
  try {
    const rentalHistory = await db.rental.findMany({
      where: {
        carId,
      },
    });

    return rentalHistory;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getLikedCars = async () => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const findFavoriteCars = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        favoritedCars: true,
      },
    });

    return findFavoriteCars;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const _getRecommendedCars = async (
  lat?: number,
  lng?: number,
  numberOfResult: number = 8,
) => {
  try {
    if (typeof numberOfResult !== 'number')
      throw Error('Invalid number of results');

    if (lat && lng) {
      if (typeof lat !== 'number' || typeof lng !== 'number')
        throw Error('Invalid coordinates');

      const carsNearMe: any[] = await db.$queryRaw`
      SELECT "Location".*, "Car".*, 
          (
            111.045 * sqrt(
              pow(${lat} - "Location"."latitude", 2) +
              pow(${lng} - "Location"."longitude", 2) * cos(${lat} / 57.2958)
            )
          ) AS distance
        FROM "public"."Location"
        JOIN "public"."Car" ON "Car"."locationId" = "Location"."id"
        ORDER BY "Car"."rentPrice", distance
        LIMIT ${numberOfResult}`;

      return carsNearMe;
    } else {
      const cars = await db.car.findMany({
        orderBy: {
          rentPrice: 'asc',
        },
        take: numberOfResult,
      });

      return cars;
    }
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw Error(error.message);
    }
    throw Error(error.message);
  }
};

export const getRecomendedCars = unstableCache(
  _getRecommendedCars,
  ['getRecomendedCars'],
  { revalidate: 30 },
);

export const isUserCarOwner = async (carId: number) => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const currentCar = await db.car.findUnique({
    where: {
      id: carId,
    },
    include: {
      addedBy: true,
    },
  });

  return currentCar?.addedBy?.id === session.user.id;
};

export const getRentedCars = async () => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const userWithRentedCars = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        rentedCars: {
          include: {
            car: true,
          },
        },
      },
    });

    return userWithRentedCars?.rentedCars;
  } catch (error: any) {
    throw Error(error.message);
  }
};
