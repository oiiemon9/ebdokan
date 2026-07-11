import { getProducts } from '@/app/lib/api';
import ProductsPage from '@/Components/ProductsPage/ProductsPage';
import React from 'react';

export default async function page() {
  const products = await getProducts();

  return (
    <ProductsPage
      products={products}
      totalCount={127}
      searchQuery="Jacket & Coats"
      currentPage={3}
      totalPages={15}
    />
  );
}
