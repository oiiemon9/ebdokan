import Image from 'next/image';

import PopularProductsSection from '../Components/HomePageSection/PopularProductsSection';
import BannerSection from '../Components/HomePageSection/BannerSection';
import HotDeals from '@/Components/HomePageSection/HotDeals';
import { Suspense } from 'react';
import HotDealsLoader from '@/Components/Loader/HotDealsLoader';
import HeroSection from '@/Components/HomePageSection/HeroSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PopularProductsSection />
      <BannerSection />
      <Suspense fallback={<HotDealsLoader />}>
        <HotDeals></HotDeals>
      </Suspense>
    </main>
  );
}
