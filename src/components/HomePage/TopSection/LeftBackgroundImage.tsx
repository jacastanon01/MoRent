import { cn } from '@/lib/utils';
import React from 'react';

const LeftBackgroundImage = ({ className }: { className?: string }) => {
  return (
    <svg
      width='628'
      height='360'
      viewBox='0 0 628 360'
      fill='none'
      className={cn(className, 'absolute left-0 bottom-0')}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='230'
        cy='305'
        r='75'
        stroke='white'
        strokeOpacity='0.06'
        strokeWidth='20'
      />
      <circle
        cx='230.5'
        cy='304.5'
        r='137.5'
        stroke='white'
        strokeOpacity='0.06'
        strokeWidth='20'
      />
      <circle
        cx='230'
        cy='305'
        r='200'
        stroke='white'
        strokeOpacity='0.06'
        strokeWidth='20'
      />
      <circle
        cx='230.5'
        cy='304.5'
        r='262.5'
        stroke='white'
        strokeOpacity='0.06'
        strokeWidth='20'
      />
      <circle
        cx='230'
        cy='305'
        r='325'
        stroke='white'
        strokeOpacity='0.06'
        strokeWidth='20'
      />
      <circle
        cx='230.5'
        cy='304.5'
        r='387.5'
        stroke='white'
        strokeOpacity='0.06'
        strokeWidth='20'
      />
    </svg>
  );
};

export default LeftBackgroundImage;
