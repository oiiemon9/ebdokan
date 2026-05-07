const AllProductsSection = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
    { id: 4, name: 'Product 4', price: '$40' },
    { id: 5, name: 'Product 5', price: '$50' },
    { id: 6, name: 'Product 6', price: '$60' },
    { id: 7, name: 'Product 7', price: '$70' },
    { id: 8, name: 'Product 8', price: '$80' },
  ];

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProductsSection;
