import Hero from '@/components/HowItWorksPage/HeroSection/Hero';
import LogoSection from '@/components/HowItWorksPage/LogoSection/LogoSection';
import TestimonialsSection from '@/components/HowItWorksPage/TestimonialsSection/TestimonialsSection';
import ThreeStepsSection from '@/components/HowItWorksPage/ThreeStepsSection/ThreeStepsSection';
import WhyChooseUsSection from '@/components/HowItWorksPage/WhyChooseUsSection/WhyChooseUsSection';
import PopularCarsSection from '@/components/HowItWorksPage/PopularCarsSection/PopularCarsSection';

const HowItWorksPage = () => {
  return (
    <main className='bg-white-100 dark:border-b dark:border-gray-850 dark:bg-gray-900'>
      <Hero />

      <LogoSection />

      <ThreeStepsSection />

      <WhyChooseUsSection />

      <TestimonialsSection />

      <PopularCarsSection />
    </main>
  );
};

export default HowItWorksPage;
