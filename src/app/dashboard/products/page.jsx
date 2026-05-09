'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$29.99',
      stock: 45,
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$49.99',
      stock: 32,
      category: 'Clothing',
    },
    { id: 3, name: 'Product 3', price: '$19.99', stock: 78, category: 'Books' },
  ];

  return (
    <div>
      <DashboardHeader
        title="Products"
        description="Manage all your store products"
      />

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>#{product.id}</td>
                    <td className="font-semibold">{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <span className="badge badge-primary">
                        {product.stock}
                      </span>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <button className="btn btn-xs btn-ghost">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
