import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import SettingsIcon from './SettingsIcon';
import { CapacityFilter } from './CapacityFilter';
import MaxPriceSlider from './MaxPriceSlider';
import { TypeFilter } from './TypeFilter';
import { Car } from '@prisma/client';
import { getAllCars } from '@/lib/actions/cars';

const Filters = ({
  cars,
  filteredCars,
}: {
  cars: Partial<Car>[];
  filteredCars: Partial<Car>[];
}) => (
  <>
    <TypeFilter cars={cars} filteredCars={filteredCars} />
    <CapacityFilter cars={cars} filteredCars={filteredCars} />
    <MaxPriceSlider cars={cars} />
  </>
);

export async function FilterDisplay({ cars }: { cars: Partial<Car>[] }) {
  const allCars = await getAllCars();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='h-full bg-transparent p-3 focus:border-blue-500 dark:border-gray-800 md:hidden'
        >
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <div className='hidden flex-col gap-[52px] md:flex'>
        <Filters cars={allCars} filteredCars={cars} />
      </div>
      <DialogContent className='flex max-h-full max-w-[400px] flex-col gap-12 overflow-y-auto rounded-lg'>
        <Filters cars={allCars} filteredCars={cars} />
      </DialogContent>
    </Dialog>
  );
}
