import React from 'react';
import { Button } from '..';
import Link from 'next/link';

const EditCarButton = ({ id }: { id: number }) => {
  return (
    <Button className='min-h-[44px] max-w-[116px] shrink-0 rounded-sm px-5'>
      <Link href={`/edit-car/${id}`}>Edit</Link>
    </Button>
  );
};

export default EditCarButton;
