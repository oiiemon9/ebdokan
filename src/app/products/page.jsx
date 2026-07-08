import ProductsPage from '@/Components/ProductsPage/ProductsPage';
import React from 'react';
import { getProducts } from '../lib/api';

export default async function page() {
  const products = await getProducts();

  return (
    <ProductsPage
      products={products}
      totalCount={127}
      searchQuery="Jacket & Coats"
      currentPage={1}
      totalPages={15}
    />
  );
}
