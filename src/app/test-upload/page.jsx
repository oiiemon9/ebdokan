'use client';

import { useState } from 'react';
import RichTextEditor from '../../../Components/RichTextEditor/RichTextEditor';

export default function TestPage() {
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    console.log('Description HTML:', description);
    alert('Check console for HTML content');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Image Upload</h1>

      <RichTextEditor
        onChange={setDescription}
        placeholder="Add product description with images..."
      />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test Submit
      </button>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Current HTML:</h2>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
          {description}
        </pre>
      </div>
    </div>
  );
}
