'use client';
import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

const TextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [imageUploading, setImageUploading] = useState(false);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initQuill = async () => {
      const Quill = (await import('quill')).default;

      if (editorRef.current && !quillInstance.current) {
        const quill = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: 'Write product description here...',
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image', 'clean'],
              ],
              handlers: {
                image: imageHandler,
              },
            },
          },
        });

        quill.on('text-change', () => {
          onChange(quill.root.innerHTML);
        });

        quillInstance.current = quill;
      }
    };

    initQuill();
  }, []);

  // sync value
  useEffect(() => {
    if (
      quillInstance.current &&
      value !== quillInstance.current.root.innerHTML
    ) {
      quillInstance.current.root.innerHTML = value || '';
    }
  }, [value]);

  async function imageHandler() {
    if (typeof window === 'undefined') return;

    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) return;

      try {
        setImageUploading(true);

        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error('Upload failed');
        }

        const quill = quillInstance.current;

        const range = quill.getSelection(true) || {
          index: 0,
        };

        quill.insertEmbed(range.index, 'image', data.secure_url);

        quill.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);

        alert(error.message);
      } finally {
        setImageUploading(false);
      }
    };
  }

  if (imageUploading) {
    Swal.fire({
      title: 'Uploading image...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }

  return (
    <div className="rounded-md overflow-hidden bg-white">
      {' '}
      <style jsx global>{`
        .ql-toolbar,
        .ql-container {
          border: none !important;
        }
      `}</style>
      <div ref={editorRef} style={{ height: '300px' }} />
    </div>
  );
};

export default TextEditor;
