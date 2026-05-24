import React, { useState } from 'react';

export default function ColorPicker({ value = [], onChange }) {
  // ─── Color Swatch Picker ────────────────────────────────────────────────────
  const PRESET_COLORS = [
    { label: 'Midnight', value: '#1a1a2e' },
    { label: 'Crimson', value: '#e63946' },
    { label: 'Ocean', value: '#0077b6' },
    { label: 'Forest', value: '#2d6a4f' },
    { label: 'Amber', value: '#f4a261' },
    { label: 'Lavender', value: '#9b72cf' },
    { label: 'Slate', value: '#64748b' },
    { label: 'Rose', value: '#f43f5e' },
    { label: 'Teal', value: '#14b8a6' },
    { label: 'Sand', value: '#d4a574' },
    { label: 'White', value: '#ffffff' },
    { label: 'Charcoal', value: '#374151' },
  ];
  const [customColor, setCustomColor] = useState('#000000');

  const toggle = (color) => {
    if (value.includes(color)) {
      onChange(value.filter((c) => c !== color));
    } else {
      onChange([...value, color]);
    }
  };

  const addCustom = () => {
    if (!value.includes(customColor)) {
      onChange([...value, customColor]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {PRESET_COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            title={c.label}
            onClick={() => toggle(c.value)}
            style={{ backgroundColor: c.value }}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-150 hover:scale-110 ${
              value.includes(c.value)
                ? 'border-blue-500 scale-110 ring-2 ring-blue-300'
                : 'border-base-300'
            } ${c.value === '#ffffff' ? 'border-gray-300' : ''}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-9 h-9 rounded cursor-pointer border border-base-300 bg-transparent p-0.5"
        />
        <button
          type="button"
          onClick={addCustom}
          className="text-xs px-3 py-1.5 rounded-lg border border-base-300 hover:bg-base-200 transition-colors"
        >
          + Add Custom
        </button>
        {value.length > 0 && (
          <span className="text-xs text-base-content/50 ml-1">
            {value.length} color{value.length > 1 ? 's' : ''} selected
          </span>
        )}
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {value.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-base-300 bg-base-100"
            >
              <span
                className="w-3 h-3 rounded-full border border-base-300 inline-block"
                style={{ backgroundColor: c }}
              />
              {c}
              <button
                type="button"
                onClick={() => toggle(c)}
                className="text-base-content/40 hover:text-error ml-0.5 font-bold leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
