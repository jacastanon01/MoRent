'use server';

import { db } from '@/server/db';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

import { Prisma, User } from '@prisma/client';
import { CredentialSchema, RegisterFormType } from '@/validations/registration';
import { getServerAuthSession } from '@/server/auth';

export const createNewUser = async (user: RegisterFormType) => {
  const ParsedCredentials = CredentialSchema.safeParse(user);

  if (!ParsedCredentials.success) {
    return { error: 'Name and password must have at least 3 characters' };
  }

  if (user.password) {
    const encryptedPassword = await bcrypt.hash(user.password, 10);

    try {
      const newUser = await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: encryptedPassword,
        },
      });
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return { error: 'Error creating account' };
        }
        return { error: 'Error creating account' };
      }
      throw error;
    }
  }
};

export const updateUser = async (updateUser: Partial<User>) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) return null;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: updateUser,
    });
    if (!updateUser.image) {
      revalidatePath('/profile/[id]/page');
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const fetchProfile = async () => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) return null;
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        listedCars: true,
        rentedCars: {
          include: {
            car: true,
          },
        },
        favoritedCars: true,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email: string) => {
  if (!email) {
    throw new Error('You must provide an email');
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const addCarToUserFavorites = async (carId: number) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const favoriteCar = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        favoritedCars: {
          connect: { id: carId },
        },
      },
      include: {
        favoritedCars: true,
      },
    });

    revalidatePath('/');
    return favoriteCar;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const removeCarFromFavorites = async (carId: number) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const removedCar = await db.user.update({
      where: { id: session.user.id },
      data: {
        favoritedCars: {
          disconnect: { id: carId },
        },
      },
    });

    revalidatePath('/profile');
    return removedCar;
  } catch (error: any) {
    throw Error(error.message);
  }
};
