'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import TextEditor from '@/Components/TextEditor/TextEditor';

import React, { useState } from 'react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    sku: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const handleSave = () => {
    console.log('HTML to save to DB:', description);
    // This string contains <img src="https://res.cloudinary.com/...">
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div>
      <DashboardHeader
        title="Add New Product"
        description="Create and add a new product to your store"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* অন্যান্য ফিল্ডস... */}

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description
                    </span>
                  </label>
                  {/* text editor  */}
                  <TextEditor value={description} onChange={setDescription} />
                  {/* <TextEditor value={description} onChange={setDescription} /> */}
                  {/* <TextEditor value={description} onChange={setDescription} /> */}
                </div>

                <button
                  onClick={handleSave}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Post
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="lg:col-span-1">{/* তোমার আগের Tips কার্ড */}</div>
      </div>
    </div>
  );
}
