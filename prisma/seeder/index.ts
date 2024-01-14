import { createCars } from './utils';

async function main() {
  try {
    await createCars();
    // clear the existing cars from DB
  } catch (error) {}
}

main();
