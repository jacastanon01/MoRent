import dynamic from 'next/dynamic';

const PopularCarsSection = dynamic(
  () => import('@/components/HomePage/PopularCarsSection/PopularCarsSection'),
);
const RecommendedCarsSection = dynamic(
  () =>
    import(
      '@/components/HomePage/RecommendedCarsSection/RecommendedCarsSection'
    ),
);
const TopSection = dynamic(
  () => import('@/components/HomePage/TopSection/TopSection'),
);
const HomeSearchBar = dynamic(
  () => import('@/components/HomePage/HomeSearch/HomeSearch'),
);

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
