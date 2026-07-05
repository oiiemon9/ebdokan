'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const BannerSection = () => {
  const images = [
    'https://res.cloudinary.com/dzfrakxek/image/upload/v1782888381/Untitled_-_July_01_2026_at_12.41.37_b0lcue.png',
    'https://res.cloudinary.com/dzfrakxek/image/upload/v1782888380/Untitled_-_July_01_2026_at_12.44.51_hhor0g.png',
    'https://res.cloudinary.com/dzfrakxek/image/upload/v1782888380/Untitled_-_July_01_2026_at_12.43.06_atj84m.png',
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // প্রতি ৩ সেকেন্ডে image change হবে

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full">
      <div className="relative overflow-hidden min-h-[700px] lg:h-[500px]">
        {/* Background */}
        <Image
          src="https://res.cloudinary.com/dzfrakxek/image/upload/v1782888489/ChatGPT_Image_Jul_1_2026_12_35_30_PM_xlyq1z.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07141d]/90 via-[#07141d]/60 to-transparent" />

        {/* Blur */}
        <div className="absolute -left-20 top-20 w-72 h-72 rounded-full bg-[#A70000]/30 blur-[120px]" />
        <div className="absolute right-20 bottom-0 w-80 h-80 rounded-full bg-white/10 blur-[120px]" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-0 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:h-full">
          {/* Left Content */}
          <div className="max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white text-xs sm:text-sm tracking-widest uppercase">
              Premium Wireless Headphones
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Apple
              <br />
              <span className="text-[#ff4545]">AirPods Max</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base lg:text-lg leading-7 text-gray-200">
              Experience breathtaking sound with Active Noise Cancellation,
              Spatial Audio and an ultra-premium design.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="rounded-xl bg-[#A70000] hover:bg-red-800 transition px-7 py-3 font-semibold text-white shadow-2xl">
                Shop Now
              </button>

              <button className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-7 py-3 text-white hover:bg-white/20 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Product */}
          <div className="relative flex items-center justify-center w-full lg:w-[520px] h-[320px] sm:h-[380px] lg:h-full">
            {/* Glass Card */}
            <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[430px] lg:h-[430px] rounded-[30px] lg:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.35)]" />

            {/* Product */}
            <div className="relative z-20 w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] lg:w-[330px] lg:h-[330px]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={images[currentImage]}
                    alt="Apple AirPods Max"
                    width={330}
                    height={330}
                    className="w-full h-auto drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorations */}
            <div className="absolute top-10 right-5 lg:right-0 w-16 h-16 lg:w-28 lg:h-28 rounded-full border border-white/20" />
            <div className="absolute bottom-8 left-5 lg:left-10 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#A70000]" />
            <div className="absolute top-6 left-10 lg:left-20 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
