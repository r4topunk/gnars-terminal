'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';

// Dynamically import the Editor component to avoid SSR issues
const Editor = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

// Define the prop types for MarkdownEditor
interface MarkdownEditorProps {
  value: string;
  onChange: (markdown: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return (
    <Editor
      initialValue={value || ''}
      initialEditType='markdown'
      // onChange={(e) => console.log(e)}
    />
  );
};

export default MarkdownEditor;
