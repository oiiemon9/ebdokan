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
      <div className="relative overflow-hidden h-[500px]">
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

        {/* Blur Circle */}
        <div className="absolute -left-20 top-20 w-72 h-72 rounded-full bg-[#A70000]/30 blur-[120px]" />
        <div className="absolute right-20 bottom-0 w-80 h-80 rounded-full bg-white/10 blur-[120px]" />

        {/* Content */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-10 flex items-center justify-between">
          {/* Left */}
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 text-white text-sm tracking-widest uppercase">
              Premium Wireless Headphones
            </span>

            <h1 className="mt-7 text-6xl font-extrabold leading-tight text-white">
              Apple
              <br />
              <span className="text-[#ff4545]">AirPods Max</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-200">
              Experience breathtaking sound with Active Noise Cancellation,
              Spatial Audio and an ultra-premium design.
            </p>

            <div className="mt-10 flex gap-5">
              <button className="rounded-xl bg-[#A70000] hover:bg-red-800 transition px-8 py-4 font-semibold text-white shadow-2xl">
                Shop Now
              </button>

              <button className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 text-white hover:bg-white/20 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Product */}
          <div className="relative hidden lg:flex items-center justify-center w-[520px] h-full">
            {/* Glass Card */}
            <div className="absolute w-[430px] h-[430px] rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.35)]" />

            {/* Product */}
            <div className="relative z-20 w-[330px] h-[330px]">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentImage}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
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
                    className="drop-shadow-[0_30px_40px_rgba(0,0,0,.45)]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decoration */}
            <div className="absolute top-20 right-0 w-28 h-28 rounded-full border border-white/20" />
            <div className="absolute bottom-16 left-10 w-5 h-5 rounded-full bg-[#A70000]" />
            <div className="absolute top-12 left-20 w-3 h-3 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
