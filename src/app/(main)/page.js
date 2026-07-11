import BannerSection from '@/Components/HomePageSection/BannerSection';
import CustomerReviewsMarquee from '@/Components/HomePageSection/CustomerReviewsMarquee';
import HeroSection from '@/Components/HomePageSection/HeroSection';
import NewArrivalsServer from '@/Components/HomePageSection/NewArrivalsServer';
import NewsletterSection from '@/Components/HomePageSection/NewsletterSection';
import PopularProductsSection from '@/Components/HomePageSection/PopularProductsSection';
import TrendingRightNow from '@/Components/HomePageSection/TrendingRightNow';
import WhyShopWithUs from '@/Components/HomePageSection/WhyShopWithUs';
import Image from 'next/image';

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
