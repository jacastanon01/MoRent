import PopularCarsSection from '@/components/HomePage/PopularCarsSection/PopularCarsSection';
import RecommendedCarsSection from '@/components/HomePage/RecommendedCarsSection/RecommendedCarsSection';
import TopSection from '@/components/HomePage/TopSection/TopSection';
import HomeSearchBar from '@/components/HomePage/HomeSearch/HomeSearch';

export default function HomePage() {
  return (
    <main className='container pb-16 pt-9'>
      <TopSection />
      <HomeSearchBar />
      <PopularCarsSection />
      <RecommendedCarsSection />
    </main>
  );
}
