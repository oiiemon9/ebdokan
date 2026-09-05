'use client';

import { apiFetch } from '@/app/lib/api';
import { Rating } from '@smastrom/react-rating';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '@smastrom/react-rating/style.css';
import Swal from 'sweetalert2';

// ── Main modal ────────────────────────────────────────────────────────────
export default function ReviewModal({ order, item }) {
  // console.log('ReviewModal rendered with order:', order, item);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      productId: item?.productId || '',
      orderId: order?.orderId || '',
      user: {
        userId: order?.userId || '',
        // name: order?.name || '',
        // image: order?.userImage || '',
        // role: order?.userRole || 'user',
      },
      rating: 0,
      comment: '',
      images: [], // Ekhon eta array
      likes: 0,
      replies: [],
    },
  });

  useEffect(() => {
    if (!item || !order) return;

    reset({
      productId: item.productId || '',
      orderId: order.orderId || '',
      user: {
        userId: order.userId || '',
      },
      rating: 0,
      comment: '',
      images: [],
      likes: [],
      replies: [],
    });
  }, [item, order, reset]);

  const selectedImages = watch('images') || []; // RHF theke current images track kora

  const [hoveredRating, setHoveredRating] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]); // Array of URLs
  const fileInputRef = useRef(null);
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const ratingLabels = {
    1: 'Poor 😞',
    2: 'Fair 😐',
    3: 'Average 🙂',
    4: 'Good 😃',
    5: 'Excellent 🤩',
  };

  const closeModal = () => {
    document.getElementById('review_modal')?.close();
  };

  const resetForm = () => {
    reset();
    setRating(0);
    // Memory leak thekanor jonno shob object URL revoke kora
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Component unmount hole memory clear kora
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Handle Image Selection (Multiple)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentTotal = selectedImages.length;
    const spaceLeft = 4 - currentTotal;

    if (spaceLeft === 0) {
      alert('You can only upload a maximum of 4 images.');
      return;
    }

    // Jodi user 4 tar beshi select kore fele, tahole extra gulo baad deya
    const filesToAdd = files.slice(0, spaceLeft);
    if (files.length > spaceLeft) {
      alert(`Only the first ${spaceLeft} image(s) were added. Maximum is 4.`);
    }

    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));

    setValue('images', [...selectedImages, ...filesToAdd]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    // Input clear kora jate same file abar select kora jay remove korar por
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Kono nirdishto image remove kora
  const removeImage = (indexToRemove) => {
    const updatedImages = selectedImages.filter((_, i) => i !== indexToRemove);
    setValue('images', updatedImages);

    const updatedPreviews = imagePreviews.filter((url, i) => {
      if (i === indexToRemove) URL.revokeObjectURL(url);
      return i !== indexToRemove;
    });
    setImagePreviews(updatedPreviews);
  };

  const mutation = useMutation({
    mutationFn: (product) =>
      apiFetch('/api/review-and-rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      }),

    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Review submitted successfully',
        icon: 'success',
        confirmButtonText: 'Cool',
      });
      // myOrder query আবার fetch করবে
      queryClient.invalidateQueries({
        queryKey: ['myOrder', order?.orderId],
      });

      closeModal();
      resetForm();
    },

    onError: (error) => {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit review',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      closeModal();
    },
  });

  const onFormSubmit = async (data) => {
    if (rating === 0) return;
    const normalizedData = {
      ...data,
    };

    console.log('Form submitted with data:', data);
    const uploadedImages = await Promise.all(
      normalizedData.images.map(async (img) => {
        const formData = new FormData();

        formData.append('file', img);
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

    const payload = {
      ...normalizedData,

      rating,
      images: uploadedImages,
    };

    mutation.mutate(payload);
  };

  const currentRating = hoveredRating || rating;

  const suggestedComments = [
    'Good product',
    'Very good quality',
    'Product is as described',
    'Highly recommended',
    'Good value for money',
  ];

  return (
    <dialog id="review_modal" className="modal" onClose={resetForm}>
      <div className="modal-box max-w-md rounded-2xl p-0 overflow-y-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div className="">
            <h3 className="font-semibold text-base">Rate this product</h3>
            {/* Product Info */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Product Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-base-300 bg-base-200 shrink-0">
                {item?.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    📦
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-base-content truncate">
                  {item?.product?.name || 'Product'}
                </h3>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                  <span className="text-sm font-bold text-indigo-600">
                    ৳{Number(item?.product?.price || 0).toLocaleString()}
                  </span>

                  <span className="text-xs text-base-content/50">
                    Qty: {item?.quantity || 0}
                  </span>
                </div>

                {/* Product ID */}
                <p className="text-[10px] text-base-content/40 font-mono mt-1 truncate">
                  Product ID: {item?.productId}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="btn btn-sm btn-ghost btn-circle"
            type="button"
          >
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
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="px-5 py-5">
            <p className="text-sm text-base-content/60 mb-3 text-center">
              How was your experience with this order?
            </p>

            {/* Star rating */}
            <div className="flex justify-center gap-2 mb-2">
              <Rating
                style={{ maxWidth: 180 }}
                value={rating}
                onChange={setRating}
              />
            </div>

            {/* Rating Number Display */}
            <div className="h-6 text-center mb-5">
              {currentRating > 0 && (
                <span className="text-sm font-bold text-amber-500">
                  {currentRating}/5 -{' '}
                  <span className="font-medium text-base-content/70">
                    {ratingLabels[currentRating]}
                  </span>
                </span>
              )}
            </div>
            {/* Comment */}
            <div className="relative">
              <textarea
                {...register('comment')}
                placeholder="Write your review here…"
                rows={3}
                className="textarea textarea-bordered w-full rounded-xl text-sm resize-none focus:outline-none focus:border-indigo-400 pb-14"
              />

              {/* Quick Comments — absolute inside textarea, wraps naturally, no scroll */}
              {!watch('comment')?.trim() && (
                <div className="absolute bottom-3 left-1 right-1">
                  <div className="flex flex-wrap gap-1">
                    {suggestedComments.map((comment) => (
                      <button
                        key={comment}
                        type="button"
                        onClick={() => setValue('comment', comment)}
                        className="px-2 py-1 rounded-full text-[11px] font-medium
              text-base-content/60 bg-base-200/70 border border-base-300/60
              hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200
              active:scale-95 transition-all duration-200"
                      >
                        {comment}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Image Upload Section (Max 4) */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Image Previews Map */}
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative inline-block group shrink-0"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-base-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Remove image"
                  >
                    <svg
                      className="w-3.5 h-3.5"
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
                  </button>
                </div>
              ))}

              {/* Add Photo Button - Shudhu tokhoni dekhabe jodi 4 tar kom chobi thake */}
              {imagePreviews.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50/50 w-16 h-16 sm:w-20 sm:h-20 rounded-xl hover:bg-indigo-100 transition-colors border border-dashed border-indigo-200 shrink-0"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Photo
                </button>
              )}

              {/* Hidden file input modified to allow multiple selection */}
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            {/* Helper text */}
            <p className="text-[10px] text-base-content/40 mt-2">
              {imagePreviews.length}/4 images selected
            </p>
          </div>

          {/* ── Footer ── */}
          <div className="flex gap-2.5 px-5 py-4 border-t border-base-200">
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm flex-1 rounded-xl font-semibold btn-ghost border border-base-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className="btn btn-sm flex-1 rounded-xl font-semibold text-white border-none bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={resetForm}>close</button>
      </form>
    </dialog>
  );
}
