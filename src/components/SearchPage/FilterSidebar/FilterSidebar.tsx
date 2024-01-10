import { Car } from '@prisma/client';
import { FilterDisplay } from './FilterDisplay';
import SearchBrand from './SearchBrand';

const FilterSidebar = ({ cars }: { cars: Partial<Car>[] }) => {
  return (
    <aside className='flex flex-col gap-[52px] bg-white px-8 py-10 shadow-md dark:bg-gray-900 md:w-1/4'>
      <div className='flex flex-col'>
        <div className='mb-7 text-xs font-semibold uppercase leading-[150%] tracking-wider text-blue-100'>
          Search
        </div>
        <div className='flex gap-8 md:flex-col'>
          <SearchBrand />
          <FilterDisplay cars={cars} />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
