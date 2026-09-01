'use client';

import { apiFetch } from '@/app/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// ── Main modal ────────────────────────────────────────────────────────────
export default function ReviewModal({ order, reviewItem }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      productId: order?.productId || '',
      orderId: order?.orderId || '',
      user: {
        userId: order?.userId || '',
        name: order?.userName || '',
        image: order?.userImage || '',
        role: order?.userRole || 'user',
      },
      rating: 0,
      comment: '',
      images: [], // Ekhon eta array
      likes: 0,
      replies: [],
    },
  });

  const rating = watch('rating');
  const selectedImages = watch('images') || []; // RHF theke current images track kora

  const [hoveredRating, setHoveredRating] = useState(0);
  const [imagePreviews, setImagePreviews] = useState([]); // Array of URLs
  const fileInputRef = useRef(null);

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
    setHoveredRating(0);
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

  const onFormSubmit = async (data) => {
    if (data.rating === 0) return;

    // Final payload
    //   const payload = {
    //     ...normalizedData,
    //     images: uploadedImages,
    //   };

    //   mutation.mutate(payload);

    const mutation = useMutation({
      mutationFn: (product) =>
        apiFetch('/api/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        }),

      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Product added successfully',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
        closeModal();
        resetForm();
      },

      onError: (error) => {
        alert(error.message);
      },
    });
  };

  const currentRating = hoveredRating || rating;

  return (
    <dialog id="review_modal" className="modal" onClose={resetForm}>
      <div className="modal-box max-w-md rounded-2xl p-0 overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <div>
            <h3 className="font-semibold text-base">Rate this product</h3>
            {reviewItem?.productId && (
              <p className="text-xs text-base-content/50 mt-0.5 font-mono">
                {reviewItem?.productId}
              </p>
            )}
            {order?.orderId && (
              <p className="text-xs text-base-content/50 mt-0.5 font-mono">
                Order Id : {order.orderId}
              </p>
            )}
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
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() =>
                    setValue('rating', star, { shouldValidate: true })
                  }
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <svg
                    className={`w-9 h-9 transition-colors ${
                      currentRating >= star ? 'text-amber-400' : 'text-base-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
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
            <textarea
              {...register('comment')}
              placeholder="Write your review here… (optional)"
              rows={3}
              className="textarea textarea-bordered w-full rounded-xl text-sm resize-none focus:outline-none focus:border-indigo-400"
            />

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
