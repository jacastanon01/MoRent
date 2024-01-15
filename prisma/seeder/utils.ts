import { fakerEN_US as faker } from '@faker-js/faker';
import {
  fuelEfficiencyUnits as fuelUnits,
  mutableCarTypes,
  mutableTransmissionTypes,
} from '@/validations/cars';
import {
  CarMakes,
  carImages,
  carMakesArray,
  carModelsByMake,
  colors,
  locationsArray,
} from './constants';
import {
  CarTypes,
  FuelEfficiencyUnits,
  Transmission,
  User,
} from '@prisma/client';
import { db } from '@/server/db';

const getRandomFromArray = <T>(arr: T[]): T | undefined => {
  if (!arr) {
    console.log('invalid argument in getRandomFromArray function ', arr);
    return;
  }
  const randomIndex = ~~(Math.random() * arr.length);
  return arr[randomIndex];
};

const getRandomCarMake = () => {
  return getRandomFromArray(carMakesArray);
};
// Helper function to get a random car model based on make
const getRandomCarModel = (make: CarMakes) => {
  const models = carModelsByMake[make] || [];
  return getRandomFromArray(models);
};

const getMakeModelAndImages = () => {
  const make = getRandomCarMake();
  if (!make) {
    console.log('Error getting random make', make);
    return;
  }
  const model = getRandomCarModel(make);
  const images = getRandomThumbnail(make);

  if (!model || !images) {
    console.log('Error getting images and model', model, images);
    return;
  }

  return {
    make,
    model,
    images,
  };
};

const getRandomNumByInterval = (min: number, max: number, step: number) => {
  if (min >= max) {
    console.log(`Incorrect arguments! ${min} must be less than ${max}`);
    return;
  }

  const divisibleNums = [];
  for (let i = min; i <= max; i += step) {
    divisibleNums.push(i);
  }

  const randomIndex = ~~(Math.random() * divisibleNums.length);
  return divisibleNums[randomIndex];
};

const getRandomThumbnail = (make: CarMakes): string[] | undefined => {
  if (carMakesArray.slice(-4).includes(make)) {
    return carImages.reverse();
  }

  if (carMakesArray.slice(3, -4).includes(make)) {
    const firstElement = carImages.shift();
    if (firstElement) {
      carImages.push(firstElement);
    } else {
      console.log('error handling car image array');
      return;
    }
  }

  return carImages || [];
};

export const createCars = async () => {
  try {
    await db.car.deleteMany();
    const users: Pick<User, 'id'>[] = await db.user.findMany({
      select: { id: true },
    });
    if (!users?.length) throw Error('No users!');

    for (const { id } of users.slice(0, 10)) {
      for (let i = 0; i < 5; i++) {
        try {
          const carBase = getMakeModelAndImages();
          if (!carBase) {
            throw Error('Error getting base car', carBase);
          }
          const locationData = getRandomFromArray(locationsArray);
          const fuelEfficiencyUnits = locationData?.location.includes('USA')
            ? fuelUnits[0]
            : fuelUnits[1];

          const description = faker.lorem.paragraphs();

          const { make, model, images } = carBase;

          const locationId = await db.location.upsert({
            select: {
              id: true,
            },
            where: {
              address: locationData?.location,
            },
            create: {
              latitude: Number(locationData?.lat),
              longitude: Number(locationData?.lng),
              address: locationData?.location!,
            },
            update: {},
          });
          if (!locationId)
            throw Error('Error creating location data ', locationId);

          const newCar = {
            make,
            model,
            images,
            description,
            fuelEfficiency: faker.number.int({ min: 10, max: 40 }),
            fuelEfficiencyUnits: fuelEfficiencyUnits as FuelEfficiencyUnits,
            rentPrice: getRandomNumByInterval(100, 1500, 50) ?? 500,
            capacity: faker.number.int({ min: 2, max: 6 }),
            color: String(getRandomFromArray(colors)),
            year: faker.number.int({ min: 2000, max: 2024 }),
            transmission: faker.helpers.arrayElement<Transmission>(
              mutableTransmissionTypes,
            ),
            type: faker.helpers.arrayElement<CarTypes>(mutableCarTypes),
            locationId: locationId.id,
          };
          if (!newCar) throw Error('Error constructing car ', newCar);

          await db.car.create({
            data: { ...newCar, addedById: id },
          });
        } catch (error: any) {
          console.error('Error during iteration', error);
          throw Error('Error during iteration', error.message);
        }
      }
    }
  } catch (error: any) {
    console.error('Top level error', error);
    throw Error(error.message);
  }
};
