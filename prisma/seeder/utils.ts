import {
  carMakesArray,
  CarMakes,
  carModelsByMake,
  carImages,
} from './constants';

export const getRandomFromArray = <T>(arr: T[]): T | undefined => {
  if (!arr) {
    console.log('invalid argument in getRandomFromArray function ', arr);
    return;
  }
  const randomIndex = ~~(Math.random() * arr.length);
  return arr[randomIndex];
};

export const getRandomCarMake = () => {
  return getRandomFromArray(carMakesArray);
};
// Helper function to get a random car model based on make
export const getRandomCarModel = (make: CarMakes) => {
  const models = carModelsByMake[make] || [];
  return getRandomFromArray(models);
};

export const getMakeModelAndImages = () => {
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

export const getRandomNumByInterval = (
  min: number,
  max: number,
  step: number,
) => {
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

export const getRandomThumbnail = (make: CarMakes): string[] | undefined => {
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
