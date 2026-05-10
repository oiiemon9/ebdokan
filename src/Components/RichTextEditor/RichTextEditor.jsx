'use client';

import { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';

let Quill;

export default function RichTextEditor({ onChange, placeholder }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!Quill) {
      Quill = require('quill').default;
    }

    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: placeholder || 'Start typing...',

        // ✅ Toolbar add করা হলো
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'], // 👈 image icon add
              ['clean'],
            ],
            handlers: {
              image: imageHandler, // 👈 custom handler
            },
          },
        },
      });

      // ✅ content change
      quillRef.current.on('text-change', () => {
        const html = quillRef.current.root.innerHTML;
        // console.log('Quill Editor Content:', html);
        if (onChange) onChange(html);
      });

      setReady(true);
    }

    // ✅ image upload function
    function imageHandler() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];

        if (!file) return;

        // 👉 option 1: Base64 (easy)
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result;

          const range = quillRef.current.getSelection();
          quillRef.current.insertEmbed(range.index, 'image', base64);
        };
        reader.readAsDataURL(file);

        // 👉 option 2 (pro): server e upload kore URL use korba
      };
    }
  }, [onChange, placeholder]);

  return (
    <div ref={editorRef} style={{ minHeight: '200px', background: '#fff' }} />
  );
}
