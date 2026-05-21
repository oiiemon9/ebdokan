import React, { useRef } from 'react';

export default function ProductImageUpload({ value = [], onChange }) {
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    onChange([...value, ...newPreviews]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const remove = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-base-300 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/5 transition-all duration-200 group"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <svg
              className="w-7 h-7 text-base-content/40 group-hover:text-blue-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm text-base-content">
              Drop images here or <span className="text-blue-500">browse</span>
            </p>
            <p className="text-xs text-base-content/40 mt-0.5">
              PNG, JPG, WEBP up to 10MB each
            </p>
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {value.map((img, i) => (
            <div
              key={i}
              className="relative group aspect-square rounded-xl overflow-hidden border border-base-300 bg-base-200"
            >
              <img
                src={img.url}
                alt={img.name}
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-600 text-white">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold hover:bg-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
