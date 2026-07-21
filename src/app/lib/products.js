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

export async function getProducts({
  page = 1,
  search = '',
  limit = 20,
  category = '',
  subCategories,
  minPrice,
  maxPrice,
  colors = [],
  sizes = [],
  rating = 0,
  brands = [],
  sort = 'latest',
}) {
  const collection = await connect('products');
  const query = {};

  if (search) {
    query.$or = [
      {
        productName: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        brand: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        category: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        subCategory: {
          $regex: search,
          $options: 'i',
        },
      },

      {
        shortDescription: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        shortDescription: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        tags: {
          $regex: search,
          $options: 'i',
        },
      },
    ];
  }

  if (category) {
    query.category = category;
  }
  if (subCategories.length > 0) {
    query.subCategory = {
      $in: subCategories,
    };
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) {
      query.price.$gte = minPrice;
    }
    if (maxPrice !== undefined) {
      query.price.$lte = maxPrice;
    }
  }

  if (colors.length > 0) {
    query.colors = {
      $in: colors,
    };
  }
  if (sizes.length > 0) {
    query.sizes = {
      $in: sizes,
    };
  }
  if (rating > 0) {
    query.rating = {
      $gte: rating,
    };
  }
  if (brands.length > 0) {
    query.brand = {
      $in: brands,
    };
  }

  let sortQuery = {};

  switch (sort) {
    case 'price-asc':
      sortQuery = { price: 1 };
      break;

    case 'price-desc':
      sortQuery = { price: -1 };
      break;

    case 'latest':
    default:
      sortQuery = { createdAt: -1 };
  }

  const skip = (page - 1) * limit;

  const colorQuery = { ...query };
  delete colorQuery.colors;

  const sizeQuery = { ...query };
  delete sizeQuery.sizes;

  const brandQuery = { ...query };
  delete brandQuery.brand;

  const availableColors = await collection
    .aggregate([
      { $match: colorQuery },
      { $unwind: '$colors' },
      { $group: { _id: '$colors' } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  const findColors = availableColors.map((item) => item._id);

  const availableSizes = await collection
    .aggregate([
      { $match: sizeQuery },
      { $unwind: '$sizes' },
      { $group: { _id: '$sizes' } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  const findSizes = availableSizes.map((item) => item._id);

  const availableBrands = await collection
    .aggregate([
      { $match: brandQuery },
      {
        $match: {
          brand: {
            $exists: true,
            $nin: ['', null],
          },
        },
      },
      { $group: { _id: '$brand' } },
      { $sort: { _id: 1 } },
    ])
    .toArray();

  const findBrands = availableBrands.map((item) => item._id);

  const products = await collection
    .find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .toArray();

  const serializedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  const totalProducts = await collection.countDocuments(query);

  return {
    products: serializedProducts,
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    findColors,
    findSizes,
    findBrands,
  };
}
