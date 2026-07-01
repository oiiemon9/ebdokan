import { getPopularProductsFromDB } from '@/app/lib/products';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')?.toLowerCase() || 'all';
    const page = parseInt(searchParams.get('page') || 1);
    const products = await getPopularProductsFromDB(category, page);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Popular Products API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch popular products',
      },
      {
        status: 500,
      },
    );
  }
}
