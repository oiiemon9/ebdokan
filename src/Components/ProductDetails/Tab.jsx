'use client';
import React, { useState } from 'react';

function StarIcon({ filled, half }) {
  return (
    <svg
      className={`w-4 h-4 ${filled || half ? 'text-amber-400' : 'text-gray-200'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function StarRating({ rating, size = 'sm' }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          filled={star <= Math.floor(rating)}
          half={star === Math.ceil(rating) && rating % 1 !== 0}
        />
      ))}
    </div>
  );
}

export default function Tab({ data: product }) {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviewSort, setReviewSort] = useState('latest');
  const reviews = [
    {
      id: 1,
      name: 'James Gouse',
      avatar: 'JG',
      rating: 5,
      date: 'May 20, 2026',
      comment:
        "Exceptional quality and the finish is absolutely stunning. Worth every penny — I've been using it daily and it's held up perfectly.",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      name: 'Guy Hawkins',
      avatar: 'GH',
      rating: 4,
      date: 'May 15, 2026',
      comment:
        'Great product overall. The color is exactly as shown. Fit is generous, which I actually prefer for a relaxed look.',
      helpful: 7,
      verified: true,
    },
    {
      id: 3,
      name: 'Sarah Lin',
      avatar: 'SL',
      rating: 5,
      date: 'May 10, 2026',
      comment:
        'Absolutely love it! The material feels luxurious and the craftsmanship is evident. Would definitely buy again.',
      helpful: 19,
      verified: true,
    },
    {
      id: 4,
      name: 'Marcus Reid',
      avatar: 'MR',
      rating: 3,
      date: 'Apr 28, 2026',
      comment:
        "Good product but shipping took longer than expected. Quality is decent, though I've seen better for the price.",
      helpful: 4,
      verified: false,
    },
    {
      id: 5,
      name: 'Priya Sharma',
      avatar: 'PS',
      rating: 5,
      date: 'Apr 20, 2026',
      comment:
        'Perfect in every way! The design is so unique and it pairs well with everything in my wardrobe.',
      helpful: 23,
      verified: true,
    },
  ];
  const ratingBreakdown = { 5: 184, 4: 63, 3: 29, 2: 7, 1: 2 };
  const totalReviews = Object.values(ratingBreakdown).reduce(
    (a, b) => a + b,
    0,
  );

  const avgRating = (
    Object.entries(ratingBreakdown).reduce(
      (sum, [star, count]) => sum + Number(star) * count,
      0,
    ) / totalReviews
  ).toFixed(1);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (reviewSort === 'highest') return b.rating - a.rating;
    if (reviewSort === 'lowest') return a.rating - b.rating;
    if (reviewSort === 'helpful') return b.helpful - a.helpful;
    return b.id - a.id;
  });
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200 mb-6 mt-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-4">
              Product Description
            </h2>
            <>
              <style>{`
                      .rich-content p {
                        margin-bottom: 0.9rem;
                        line-height: 1.8;
                        color: #4b5563;
                      }

                  
                      .rich-content ol,
                      .rich-content ul {
                        padding-left: 1.5rem;
                        margin-bottom: 1rem;
                      }

                      .rich-content li[data-list="ordered"] {
                        list-style-type: decimal;
                        display: list-item;
                        line-height: 1.9;
                        color: #374151;
                        font-size: 0.95rem;
                        padding-left: 0.3rem;
                      }

                      .rich-content li[data-list="bullet"] {
                        list-style-type: disc;
                        display: list-item;
                        line-height: 1.9;
                        color: #374151;
                      }

                    
                      .rich-content .ql-ui {
                        display: none;
                      }

                    
                      .rich-content img {
                        max-width: 100%;
                        border-radius: 12px;
                        margin-top: 1.2rem;
                        display: block;
                      }

                  
                      .rich-content strong {
                        font-weight: 600;
                        color: #111827;
                      }
                    `}</style>

              <div
                className="rich-content text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </>
          </div>

          <div className="sticky top-6 h-fit">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Fraunces']">
              Specifications
            </h3>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {[
                ['SKU', product.sku],
                ['Barcode', product.barcode],
                ['Weight', `${product.weight} ${product.weightUnit}`],
                ['Category', product.category],
                ['Sub-category', product.subCategory],
                ['Brand', product.brand],
                ['Status', product.status],
                ['Stock', `${product.stock} units`],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex justify-between items-start py-3 px-4 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-gray-800 font-semibold text-right max-w-[60%] break-words capitalize">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 mt-6 border-b border-gray-200 "></div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-6">
              Customer Reviews
            </h2>

            <select
              value={reviewSort}
              onChange={(e) => setReviewSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-7xl font-['Fraunces'] font-semibold text-[#1a1a2e]">
                    {avgRating}
                  </div>
                  <div className="flex justify-center mt-2 mb-1">
                    <StarRating rating={parseFloat(avgRating)} />
                  </div>
                  <div className="text-sm text-gray-400">
                    {totalReviews} reviews
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingBreakdown[star];
                    const pct = Math.round((count / totalReviews) * 100);
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 w-3 text-right">
                          {star}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 text-amber-400 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-6 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <button className="mt-6 w-full h-10 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#2d2d4e] transition-colors">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Review List */}

            <div className="lg:col-span-2">
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {review.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-800 text-sm">
                              {review.name}
                            </span>
                            {review.verified && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRating rating={review.rating} />
                            <span className="text-xs text-gray-400">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {review.comment}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        Helpful ({review.helpful})
                      </button>
                      <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors font-medium">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Discussion Tab */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 mt-6 border-b border-gray-200"></div>
        <div className="max-w-2xl mb-6">
          <h2 className="text-2xl font-['Fraunces'] font-semibold text-[#1a1a2e] mb-6">
            Community Discussion
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Ask a Question
            </h3>
            <textarea
              placeholder="What would you like to know about this product?"
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] resize-none"
            />
            <button className="mt-3 px-6 py-2.5 bg-[#1a1a2e] text-white rounded-xl text-sm font-semibold hover:bg-[#2d2d4e] transition-colors">
              Post Question
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'Is this suitable for beginners?',
                a: "Yes, it's designed to be accessible for all skill levels. The included guide makes it easy to get started.",
                user: 'Alex T.',
                aUser: 'Store Team',
              },
              {
                q: 'What is the return policy?',
                a: "We offer a full 30-day return policy. Just contact support and we'll arrange a free pickup.",
                user: 'Sam K.',
                aUser: 'Store Team',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0 mt-0.5">
                    Q
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.q}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Asked by {item.user}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 ml-4 pl-4 border-l-2 border-[#e8b86d]">
                  <div className="w-7 h-7 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                    A
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.a}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      — {item.aUser}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
