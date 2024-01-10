import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import Logo from '../shared/Logo';

const SearchResultsLoading = () => {
  return (
    <section className='mt-[30px] grid w-full gap-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={uuidv4()}
          className='flex h-[400px] min-w-[300px] shrink-0 animate-pulse items-center justify-center rounded-[10px] border-2 bg-white-100 p-6 shadow-md dark:bg-blue-900/20 '
        >
          <Logo className='animate-pulse' />
        </div>
      ))}
    </section>
  );
};

export default SearchResultsLoading;
