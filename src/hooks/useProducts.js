'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

export function usePopularProducts(category) {
  return useInfiniteQuery({
    queryKey: ['products', category.toLowerCase()],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `/api/products/popular-products?category=${category}&page=${pageParam}`,
      );

      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }

      return res.json();
    },

    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
    },

    staleTime: 1000 * 60 * 5,
  });
}
