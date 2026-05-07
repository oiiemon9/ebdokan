'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SliderSection = () => {
  return (
    <section className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-96 bg-blue-500 flex items-center justify-center text-white text-4xl">
            Slide 1
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-96 bg-green-500 flex items-center justify-center text-white text-4xl">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-96 bg-red-500 flex items-center justify-center text-white text-4xl">
            Slide 3
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SliderSection;
