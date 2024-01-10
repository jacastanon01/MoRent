import Spinner from '@/components/shared/Spinner/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import QuoteIcon from './QuoteIcon';
import StarIcon from './StarIcon';

type TestimonialCardProps = {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  rating: number;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  authorName,
  authorTitle,
  authorImage,
  rating,
}) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <StarIcon
      key={index}
      className={index < rating ? 'fill-[#FDB913]' : 'fill-gray-300'}
    ></StarIcon>
  ));

  return (
    <div className='w-full rounded bg-white-100 p-6 dark:bg-gray-850 '>
      <div className='-mt-20 flex items-center justify-between'>
        <Avatar className='relative h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-white dark:border-gray-900'>
          <div className='absolute z-[1] flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
          <AvatarImage className='z-10' src={authorImage || undefined} />
          <AvatarFallback
            delayMs={200}
            className='z-10 rounded-full bg-blue-500 px-3 py-2 font-serif text-xl font-medium text-white'
          >
            {authorName[0]?.toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>

        <QuoteIcon />
      </div>
      <div className='mt-4'>
        <blockquote className='text-gray-900 dark:text-white'>
          &quot;{quote}&quot;
        </blockquote>
        <div className='flex flex-col gap-4'>
          <div className='mt-4 flex gap-1'>{stars}</div>
          <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold text-gray-900 dark:text-white'>
              {authorName}
            </div>
            <div className='text-base font-medium text-gray-700 dark:text-gray-400'>
              {authorTitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
