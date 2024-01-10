'use client';

import { Button } from '..';

const MoreInfoButton = ({
  isCurrentUserOwner,
}: {
  isCurrentUserOwner?: boolean | null;
}) => {
  return (
    <Button className='min-h-[44px] w-auto grow rounded-sm px-5'>
      {isCurrentUserOwner ? 'Edit' : 'More info'}
    </Button>
  );
};

export default MoreInfoButton;
