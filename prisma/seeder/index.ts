import { seedCarData } from './utils';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

async function main() {
  try {
    await seedCarData();
    console.log('Seeder function executed successfully.');
  } catch (error) {
    console.error('Error in seeder function:', error);
  }
}

main();
