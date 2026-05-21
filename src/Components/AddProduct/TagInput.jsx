import React, { useState } from 'react';

export default function TagInput({
  value = [],
  onChange,
  placeholder = 'Add tag...',
}) {
  const [input, setInput] = useState('');

  const add = () => {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput('');
  };

  const remove = (tag) => onChange(value.filter((t) => t !== tag));

  return (
    <div className="flex flex-wrap gap-2 p-3 border border-base-300 rounded-xl bg-base-100 min-h-[48px] focus-within:border-blue-400 transition-colors">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="hover:text-red-500 font-bold"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            add();
          }
          if (e.key === 'Backspace' && !input && value.length)
            remove(value[value.length - 1]);
        }}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[100px] outline-none bg-transparent text-sm"
      />
    </div>
  );
}
