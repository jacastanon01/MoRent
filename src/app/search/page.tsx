import FilterSidebar from '@/components/SearchPage/FilterSidebar/FilterSidebar';
import SearchBar from '@/components/SearchPage/SearchBar';
import SearchCards from '@/components/SearchPage/SearchCards';
import SearchResults from '@/components/SearchPage/SearchResults';
import SearchResultsLoading from '@/components/SearchPage/SearchResultsLoading';
import { getFilteredCars } from '@/lib/actions/cars';
import { Car, CarTypes } from '@prisma/client';
import { Suspense } from 'react';

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const lat = Number(searchParams?.lat);
  const lng = Number(searchParams?.lng);
  const carTypes = searchParams?.types?.toUpperCase().split(',') as
    | CarTypes[]
    | undefined;
  const maxPrice = Number(searchParams?.maxPrice);
  const brand = searchParams?.brand?.toString();
  const capacity = searchParams?.capacity
    ?.split(',')
    .map((number) => Number(number));
  const page = Number(searchParams?.page);
  const fromDate = searchParams?.from && new Date(searchParams?.from);
  const toDate = searchParams?.to && new Date(searchParams?.to);

  const options = [
    lat,
    lng,
    carTypes,
    maxPrice,
    brand,
    capacity,
    page || 1,
    fromDate,
    toDate,
  ];

  const optionsFilters = [
    lat,
    lng,
    carTypes,
    maxPrice,
    brand,
    capacity,
    fromDate,
    toDate,
  ];

  const filtersCars: Car[] = await getFilteredCars(...(optionsFilters as any));
  return (
    <main className='flex flex-col  lg:container dark:bg-[#1E2430] md:flex-row'>
      <FilterSidebar cars={filtersCars} />
      <div className='p-8 md:w-3/4 xl:pr-0'>
        <SearchBar />
        <Suspense fallback={<SearchResultsLoading />} key={options.toString()}>
          <SearchResults options={options}>
            <SearchCards options={options} />
          </SearchResults>
        </Suspense>
      </div>
    </main>
  );
}
