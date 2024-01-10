'use server';

import { db } from '@/server/db';
import { unstable_cache as unstableCache } from 'next/cache';

export const getLocationById = unstableCache(
  async (id: number) => {
    try {
      const location = await db.location.findUnique({
        where: {
          id,
        },
      });
      return location;
    } catch (error: any) {
      throw Error(error.message);
    }
  },
  ['getLocationById'],
  { revalidate: 60 },
);
