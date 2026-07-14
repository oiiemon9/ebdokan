import { getProducts } from '@/app/lib/products';
import ProductsPage from '@/Components/ProductsPage/ProductsPage';
import React from 'react';

export default async function page({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const category = params.category || '';
  const subCategories = params.subCategory
    ? Array.isArray(params.subCategory)
      ? params.subCategory
      : [params.subCategory]
    : [];

  const sort = params.sort || 'latest';
  const data = await getProducts({
    page,
    category,
    subCategories,
    sort,
  });

  return (
    <ProductsPage
      products={data.products}
      totalCount={data.totalProducts}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      selectedCategory={category}
    />
  );
}
