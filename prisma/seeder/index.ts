import { createCars } from './utils';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error, log it, or exit the process as needed
});

async function main() {
  try {
    await createCars();
    console.log('Seeder function executed successfully.');
  } catch (error) {
    console.error('Error in seeder function:', error);
  }
}

main();
