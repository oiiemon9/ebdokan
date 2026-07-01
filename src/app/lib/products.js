import { connect } from './dbConnect';

export async function getPopularProductsFromDB(category = 'all', page = 1) {
  const productCollections = await connect('products');
  const query = category === 'all' ? {} : { category: category.toLowerCase() };
  const skip = (page - 1) * 10;
  const products = await productCollections
    .find(query)
    .skip(skip)
    .limit(10)
    .toArray();

  const totalProducts = await productCollections.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / 10);

  return {
    products,
    currentPage: page,
    totalPages,
    hasMore: page < totalPages,
  };
}
