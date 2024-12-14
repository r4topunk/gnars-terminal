import React, { useRef } from "react";
import dynamic from 'next/dynamic';

const ToastEditor = dynamic(() => import("@toast-ui/react-editor").then(mod => mod.Editor), { ssr: false });

export default function Editor() {
    const editorRef = useRef<typeof ToastEditor>(null);

    return (
        <ToastEditor
            ref={editorRef}
            initialValue="Write your proposal details here..."
            previewStyle="vertical"
            height="800px"
            initialEditType="markdown"
            useCommandShortcut={true}
            theme="dark" // Apply the dark theme
            _dark={{ color: 'white', borderColor: 'yellow', borderWidth: 1 }}
        />
    );
}
