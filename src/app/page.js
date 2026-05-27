import Image from 'next/image';
import SliderSection from '../Components/HomePageSection/SliderSection';
import PopularProductsSection from '../Components/HomePageSection/PopularProductsSection';
import BannerSection from '../Components/HomePageSection/BannerSection';
import HotDeals from '@/Components/HomePageSection/HotDeals';
import { Suspense } from 'react';
import HotDealsLoader from '@/Components/Loader/HotDealsLoader';

export default function Home() {
  return (
    <main>
      <SliderSection />
      <PopularProductsSection />
      <BannerSection />
      <Suspense fallback={<HotDealsLoader />}>
        <HotDeals></HotDeals>
      </Suspense>
    </main>
  );
}
