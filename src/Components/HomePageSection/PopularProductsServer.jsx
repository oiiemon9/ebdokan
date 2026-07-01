import React from 'react';
import PopularProducts from './PopularProductsSection';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPopularProductsFromDB } from '@/app/lib/products';

export default async function PopularProductsServer() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', 'all'],

    queryFn: ({ pageParam = 1 }) => getPopularProductsFromDB('all', pageParam),

    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PopularProducts />
    </HydrationBoundary>
  );
}
