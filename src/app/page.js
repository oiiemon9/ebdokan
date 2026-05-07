import Image from 'next/image';
import SliderSection from '../Components/HomePageSection/SliderSection';
import PopularProductsSection from '../Components/HomePageSection/PopularProductsSection';
import BannerSection from '../Components/HomePageSection/BannerSection';
import AllProductsSection from '../Components/HomePageSection/AllProductsSection';

export default function Home() {
  return (
    <main>
      <SliderSection />
      <PopularProductsSection />
      <BannerSection />
      <AllProductsSection />
    </main>
  );
}
