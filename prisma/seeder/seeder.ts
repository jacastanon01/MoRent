import { fakerEN_US as faker } from '@faker-js/faker';
import {
  fuelEfficiencyUnits as fuelUnits,
  mutableCarTypes,
  mutableTransmissionTypes,
} from '@/validations/cars/index.js';
import { colors, locationsArray } from './constants.js';
import {
  getMakeModelAndImages,
  getRandomFromArray,
  getRandomNumByInterval,
} from './utils.js';
import { CarTypes, FuelEfficiencyUnits, Transmission } from '@prisma/client';

for (let i = 0; i < 4; i++) {
  const carBase = getMakeModelAndImages();
  if (!carBase) {
    throw Error('Error getting base car', carBase);
  }
  const locationData = getRandomFromArray(locationsArray);
  const fuelEfficiencyUnits = locationData?.location.includes('USA')
    ? fuelUnits[0]
    : fuelUnits[1];

  // const locationId = await db.location.upsert({
  //   select: {
  //     id: true,
  //   },
  //   where: {
  //     address: locationData?.location,
  //   },
  //   create: {
  //     latitude: lat,
  //     longitude: lon,
  //     address: ParsedCarInfo.data.location,
  //   },
  //   update: {},
  // });

  const description = faker.lorem.paragraphs();

  const { make, model, images } = carBase;
  const newCar = {
    make,
    model,
    images,
    description,
    fuelEfficiency: faker.number.int({ min: 10, max: 40 })?.toString(),
    fuelEfficiencyUnits: fuelEfficiencyUnits as FuelEfficiencyUnits,
    rentPrice: getRandomNumByInterval(100, 1500, 50)?.toString(),
    capacity: faker.number.int({ min: 2, max: 6 })?.toString(),
    color: getRandomFromArray(colors),
    year: faker.number.int({ min: 2000, max: 2024 })?.toString(),
    transmission: faker.helpers.arrayElement<Transmission>(
      mutableTransmissionTypes,
    ),
    type: faker.helpers.arrayElement<CarTypes>(mutableCarTypes),
    location: locationData?.location,
    lat: locationData?.lat,
    lng: locationData?.lng,
  };

  console.log(newCar);
}

// clear DB

// seed DB using prisma.car.create
