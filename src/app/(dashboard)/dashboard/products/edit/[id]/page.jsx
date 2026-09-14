import ProductForm from '@/Components/Dashboard/ProductForm/ProductForm';
import { getProduct } from '@/app/lib/api';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }
  return <ProductForm product={product} />;
}
