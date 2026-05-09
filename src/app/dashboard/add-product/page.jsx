'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import React, { useState } from 'react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: '',
    sku: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate form
      if (
        !formData.productName ||
        !formData.price ||
        !formData.category ||
        !formData.stock
      ) {
        setMessage({
          type: 'error',
          text: 'Please fill in all required fields',
        });
        setLoading(false);
        return;
      }

      setMessage({
        type: 'success',
        text: 'Product added successfully!',
      });

      // Reset form
      setFormData({
        productName: '',
        description: '',
        category: '',
        price: '',
        stock: '',
        image: '',
        sku: '',
      });

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error adding product. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader
        title="Add New Product"
        description="Create and add a new product to your store"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              {message.text && (
                <div
                  className={`alert alert-${message.type === 'success' ? 'success' : 'error'} mb-4`}
                >
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Product Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    className="textarea textarea-bordered w-full h-24"
                  />
                </div>

                {/* Category */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Category <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Price and Stock Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Price ($) <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Stock */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Stock <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* SKU and Image Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* SKU */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">SKU</span>
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      placeholder="Product SKU"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Image URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding...
                      </>
                    ) : (
                      '➕ Add Product'
                    )}
                  </button>
                  <button type="reset" className="btn btn-ghost flex-1">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Tips</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-primary mb-1">
                    📝 Product Name
                  </p>
                  <p className="text-base-content/70">
                    Use clear, descriptive names for better search results
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">💰 Pricing</p>
                  <p className="text-base-content/70">
                    Set competitive prices based on market research
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">📦 Stock</p>
                  <p className="text-base-content/70">
                    Keep accurate inventory to avoid overselling
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">🖼️ Images</p>
                  <p className="text-base-content/70">
                    Use high-quality product images for better conversions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
