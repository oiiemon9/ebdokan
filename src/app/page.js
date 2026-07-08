import Image from 'next/image';

import PopularProductsSection from '../Components/HomePageSection/PopularProductsSection';
import BannerSection from '../Components/HomePageSection/BannerSection';
import { Suspense } from 'react';
import HotDealsLoader from '@/Components/Loader/HotDealsLoader';
import HeroSection from '@/Components/HomePageSection/HeroSection';
import NewArrivalsServer from '@/Components/HomePageSection/NewArrivalsServer';
import TrendingRightNow from '@/Components/HomePageSection/TrendingRightNow';
import WhyShopWithUs from '@/Components/HomePageSection/WhyShopWithUs';
import CustomerReviewsMarquee from '@/Components/HomePageSection/CustomerReviewsMarquee';
import NewsletterSection from '@/Components/HomePageSection/NewsletterSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PopularProductsSection />
      <BannerSection />
      <NewArrivalsServer />
      <TrendingRightNow />
      <WhyShopWithUs />
      <CustomerReviewsMarquee />
      <NewsletterSection />
    </main>
  );
}
