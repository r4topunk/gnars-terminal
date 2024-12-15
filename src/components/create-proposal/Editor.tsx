import React, { forwardRef } from "react";
import dynamic from "next/dynamic";

// Dynamically load ToastEditor
const ToastEditor = dynamic(() => import("@toast-ui/react-editor").then(mod => mod.Editor), { ssr: false });

// Define the props for Editor
type EditorProps = {
    initialValue?: string;
    previewStyle?: "vertical" | "tab";
    height?: string;
    initialEditType?: "markdown" | "wysiwyg";
    useCommandShortcut?: boolean;
    theme?: string;
};

const Editor = forwardRef<any, EditorProps>((props, ref) => {
    return (
        <ToastEditor
            {...props}
            ref={ref} // Forward the ref to the underlying ToastEditor
        />
    );
});

// Add displayName for better debugging
Editor.displayName = "Editor";

export default Editor;
