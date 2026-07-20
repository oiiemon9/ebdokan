import { getProducts } from '@/app/lib/products';
import { MAXPRICE } from '@/Components/ProductsPage/FilterConstants';
import ProductsPage from '@/Components/ProductsPage/ProductsPage';
import React from 'react';

export default async function page({ searchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || '';

  const category = params.category || '';

  const subCategories = params.subCategory
    ? Array.isArray(params.subCategory)
      ? params.subCategory
      : [params.subCategory]
    : [];

  const sort = params.sort || 'latest';

  const minPrice =
    params.minPrice !== undefined ? Number(params.minPrice) : undefined;
  const maxPrice =
    params.maxPrice !== undefined ? Number(params.maxPrice) : undefined;

  const colors = params.color
    ? Array.isArray(params.color)
      ? params.color
      : [params.color]
    : [];
  const sizes = params.size
    ? Array.isArray(params.size)
      ? params.size
      : [params.size]
    : [];

  const rating = Number(params.minRating) || 0;

  const data = await getProducts({
    page,
    search,
    category,
    subCategories,
    minPrice,
    maxPrice,
    colors,
    sizes,
    rating,
    sort,
  });

  return (
    <ProductsPage
      products={data.products}
      totalCount={data.totalProducts}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      selectedCategory={category}
      availableColors={data.findColors}
      availableSizes={data.findSizes}
      search={search}
      category={category}
      subCategories={subCategories}
      minPrice={minPrice}
      maxPrice={maxPrice}
      colors={colors}
      sizes={sizes}
    />
  );
}
