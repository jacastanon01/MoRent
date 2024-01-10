'use client';
import TestimonialCard from './TestimonialCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>();
  useEffect(() => {
    const testimonials = Array.from({ length: 15 }, () => ({
      quote: faker.lorem.sentences(3),
      authorName: faker.person.fullName(),
      authorTitle: faker.person.jobTitle(),
      authorImage: faker.internet.avatar(),
      rating: 5,
    }));
    setTestimonials(testimonials);
  }, []);
  return (
    <section className='bg-white dark:border-b dark:border-gray-850 dark:bg-gray-900'>
      <div className='container py-[100px]'>
        <div className='flex flex-col items-center gap-[10px]'>
          <h2 className='text-lg font-normal uppercase leading-[200%] tracking-widest text-gray-700 dark:text-gray-400 '>
            Testimonials
          </h2>
          <h3 className='text-4xl font-bold leading-[120%] text-gray-900 dark:text-white'>
            Heartwarming Reviews from Our Community
          </h3>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className='mx-auto mt-20 w-10/12'
        >
          <CarouselContent className='-ml-12'>
            {testimonials &&
              testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={testimonial.authorName + index}
                  className='py-14 pl-12 md:basis-1/2'
                >
                  <TestimonialCard {...testimonial} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
