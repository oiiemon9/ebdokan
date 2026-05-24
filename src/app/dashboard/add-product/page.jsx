'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';
import TextEditor from '@/Components/TextEditor/TextEditor';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import ColorPicker from '@/Components/Dashboard/AddProduct/ColorPicker';
import ProductImageUpload from '@/Components/Dashboard/AddProduct/ProductImageUpload';
import TagInput from '@/Components/Dashboard/AddProduct/TagInput';
import Swal from 'sweetalert2';

// ─── Field Wrapper ──────────────────────────────────────────────────────────
function Field({ label, required, error, hint, children }) {
  return (
    <div className="form-control space-y-1.5">
      <label className="label py-0">
        <span className="label-text font-semibold text-sm tracking-wide">
          {label} {required && <span className="text-red-400">*</span>}
        </span>
        {hint && (
          <span className="label-text-alt text-base-content/40">{hint}</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      productName: '',
      shortDescription: '',
      description: '',
      category: '',
      subCategory: '',
      brand: '',
      price: '',
      comparePrice: '',
      discountPercentage: '',
      costPerItem: '',
      stock: '',
      sku: '',
      barcode: '',
      weight: '',
      weightUnit: 'kg',
      status: 'draft',
      colors: [],
      sizes: [],
      tags: [],
      images: [],
      isFeatured: false,
    },
  });

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const mutation = useMutation({
    mutationFn: async (product) => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error('Failed to save product');
      return res.json();
    },

    onSuccess: (data) => {
      alert('Product added successfully');
      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
      reset();
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const price = watch('price');
  const comparePrice = watch('comparePrice');
  const discount =
    comparePrice && price
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : null;

  const onSubmit = async (data) => {
    try {
      const uploadedImages = await Promise.all(
        data.images.map(async (img) => {
          const formData = new FormData();

          formData.append('file', img.file);
          formData.append('upload_preset', UPLOAD_PRESET);

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
              method: 'POST',
              body: formData,
            },
          );

          const uploadedImage = await res.json();

          return uploadedImage.secure_url;
        }),
      );

      // Final payload
      const payload = {
        ...data,
        discountPercentage: discount,
        images: uploadedImages,
      };

      mutation.mutate(payload);
    } catch (error) {
      alert('Image upload failed:', error);
    }
  };

  const inputClass =
    'input input-bordered w-full focus:border-blue-400 focus:outline-none transition-colors rounded-xl text-sm';
  const selectClass =
    'select select-bordered w-full focus:border-blue-400 focus:outline-none transition-colors rounded-xl text-sm';
  return (
    <div className="min-h-screen bg-base-200/40">
      <DashboardHeader
        title="Add New Product"
        description="Create and publish a new product to your store"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-blue-500" />
                  <h2 className="font-bold text-base">Basic Information</h2>
                </div>

                <Field
                  label="Product Name"
                  required
                  error={errors.productName?.message}
                >
                  <input
                    {...register('productName', {
                      required: 'Product name is required',
                    })}
                    placeholder="e.g. Premium Wireless Headphones"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Short Description"
                  hint="Max 160 chars"
                  error={errors.shortDescription?.message}
                >
                  <textarea
                    {...register('shortDescription', {
                      maxLength: { value: 160, message: 'Max 160 characters' },
                    })}
                    placeholder="A brief, compelling summary shown in product listings..."
                    className="textarea textarea-bordered w-full resize-none rounded-xl text-sm focus:border-blue-400 focus:outline-none transition-colors"
                    rows={3}
                  />
                </Field>

                <Field label="Full Description">
                  <div className="border border-base-300 rounded-xl overflow-hidden focus-within:border-blue-400 transition-colors">
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextEditor
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </Field>
              </div>
            </section>

            {/* Images */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-violet-500" />
                  <h2 className="font-bold text-base">Product Images</h2>
                </div>
                <Field label="Upload Images" hint="First image is the cover">
                  <Controller
                    name="images"
                    control={control}
                    render={({ field }) => (
                      <ProductImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Field>
              </div>
            </section>

            {/* Pricing */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-emerald-500" />
                  <h2 className="font-bold text-base">Pricing</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Price" required error={errors.price?.message}>
                    <label className="input input-bordered flex items-center gap-2 rounded-xl focus-within:border-blue-400 transition-colors">
                      <span className="text-base-content/50 font-semibold text-sm">
                        $
                      </span>
                      <input
                        {...register('price', {
                          required: 'Price is required',
                          min: { value: 0, message: 'Must be positive' },
                        })}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="grow text-sm outline-none bg-transparent"
                      />
                    </label>
                  </Field>

                  <Field label="Compare at Price" hint="Original price">
                    <label className="input input-bordered flex items-center gap-2 rounded-xl focus-within:border-blue-400 transition-colors">
                      <span className="text-base-content/50 font-semibold text-sm">
                        $
                      </span>
                      <input
                        {...register('comparePrice')}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="grow text-sm outline-none bg-transparent"
                      />
                    </label>
                  </Field>

                  <Field label="Cost per Item" hint="For profit calc">
                    <label className="input input-bordered flex items-center gap-2 rounded-xl focus-within:border-blue-400 transition-colors">
                      <span className="text-base-content/50 font-semibold text-sm">
                        $
                      </span>
                      <input
                        {...register('costPerItem')}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="grow text-sm outline-none bg-transparent"
                      />
                    </label>
                  </Field>
                </div>

                {discount !== null && discount > 0 && (
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    {discount}% discount applied
                  </div>
                )}
              </div>
            </section>

            {/* Variants */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-pink-500" />
                  <h2 className="font-bold text-base">Variants</h2>
                </div>

                <Field label="Colors">
                  <Controller
                    name="colors"
                    control={control}
                    render={({ field }) => (
                      <ColorPicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Field>

                <Field label="Sizes" hint="Press Enter or comma to add">
                  <Controller
                    name="sizes"
                    control={control}
                    render={({ field }) => (
                      <TagInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="S, M, L, XL..."
                      />
                    )}
                  />
                </Field>
              </div>
            </section>

            {/* Inventory */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-orange-500" />
                    <h2 className="font-bold text-base">Inventory</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Stock Quantity" error={errors.stock?.message}>
                    <input
                      {...register('stock', {
                        min: { value: 0, message: 'Must be positive' },
                      })}
                      type="number"
                      placeholder="0"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="SKU" hint="Stock Keeping Unit">
                    <input
                      {...register('sku')}
                      placeholder="e.g. WH-PRO-BLK-001"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Barcode" hint="ISBN, UPC, GTIN…">
                    <input
                      {...register('barcode')}
                      placeholder="e.g. 012345678905"
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-cyan-500" />
                  <h2 className="font-bold text-base">Shipping</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Weight">
                    <label className="input input-bordered flex items-center gap-2 rounded-xl focus-within:border-blue-400 transition-colors">
                      <input
                        {...register('weight')}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="grow text-sm outline-none bg-transparent"
                      />
                      <select
                        {...register('weightUnit')}
                        className="text-sm bg-transparent outline-none border-l border-base-300 pl-2 cursor-pointer"
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="lb">lb</option>
                        <option value="oz">oz</option>
                      </select>
                    </label>
                  </Field>
                  <Field label="Tags" hint="Press Enter to add">
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <TagInput
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="wireless, audio..."
                        />
                      )}
                    />
                  </Field>
                </div>
              </div>
            </section>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Organization */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-violet-500" />
                  <h2 className="font-bold text-base">Organization</h2>
                </div>

                <Field
                  label="Category"
                  required
                  error={errors.category?.message}
                >
                  <select
                    {...register('category', {
                      required: 'Category is required',
                    })}
                    className={selectClass}
                  >
                    <option value="">Select category…</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing & Apparel</option>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="home">Home & Living</option>
                    <option value="beauty">Beauty & Health</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="books">Books & Media</option>
                    <option value="toys">Toys & Games</option>
                    <option value="food">Food & Grocery</option>
                  </select>
                </Field>

                <Field label="Sub-category">
                  <input
                    {...register('subCategory')}
                    placeholder="e.g. Headphones"
                    className={inputClass}
                  />
                </Field>

                <Field label="Brand">
                  <input
                    {...register('brand')}
                    placeholder="e.g. Sony, Nike…"
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>

            {/* Publish */}
            <section className="card bg-base-100 shadow-sm border border-base-300 rounded-2xl">
              <div className="card-body space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-5 rounded-full bg-blue-500" />
                  <h2 className="font-bold text-base">Publish</h2>
                </div>

                <Field label="Status">
                  <select {...register('status')} className={selectClass}>
                    <option value="draft">📝 Draft</option>
                    <option value="active">✅ Active</option>
                    <option value="archived">📦 Archived</option>
                  </select>
                </Field>

                <label className="flex items-center justify-between p-3 rounded-xl border border-base-300 cursor-pointer hover:bg-base-200/50 transition-colors">
                  <div>
                    <p className="text-sm font-semibold">Featured Product</p>
                    <p className="text-xs text-base-content/50">
                      Show on homepage
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    {...register('isFeatured')}
                    className="toggle toggle-sm toggle-primary"
                  />
                </label>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || mutation.isPending}
                    className="btn btn-primary w-full rounded-xl font-semibold text-sm"
                  >
                    {mutation.isPending || isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="loading loading-spinner loading-xs" />
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Save Product
                      </span>
                    )}
                  </button>
                </div>

                {mutation.isError && (
                  <div className="alert alert-error text-sm rounded-xl py-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {mutation.error?.message || 'Something went wrong'}
                  </div>
                )}
              </div>
            </section>

            {/* Tips */}
            <section className="card bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl">
              <div className="card-body space-y-3">
                <h3 className="font-bold text-sm text-blue-700 flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Pro Tips
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'Use a white background for product images — it converts better.',
                    'Write descriptions for search engines, not just customers.',
                    'Add variants upfront to avoid inventory confusion later.',
                    'Compare price creates urgency — use it for real discounts only.',
                  ].map((tip, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-xs text-blue-800/70 leading-relaxed"
                    >
                      <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold flex-shrink-0 text-[10px] mt-0.5">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}
