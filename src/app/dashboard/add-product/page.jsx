'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import RichTextEditor from '@/Components/RichTextEditor/RichTextEditor';
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

  const handleDescriptionChange = (html) => {
    setFormData((prev) => ({
      ...prev,
      description: html,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting Product:', formData);
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description
                    </span>
                  </label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter product description"
                  />
                </div>
                <button type="submit">Add Product</button>
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
