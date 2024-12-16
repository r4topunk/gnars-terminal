"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface EditorProps {
    value?: string;
    onChange?: (content: string | undefined) => void;
    height?: string | number;
    preview?: "live" | "edit" | "preview";
    visibleDragbar?: boolean;
    fullscreen?: boolean;
}

const Editor: React.FC<EditorProps> = ({
    value = "",
    onChange,
    height = 700, // Default to 500px height
    preview = "live", // Default to live preview
    visibleDragbar = true, // Allow drag to resize height
    fullscreen = false, // Start in normal mode
}) => {
    return (
        <div data-color-mode="dark">
            <MDEditor
                value={value}
                onChange={onChange}
                height={height} // Customizable height
                preview={preview} // Control preview mode
                visibleDragbar={visibleDragbar} // Allow drag-to-resize functionality
                fullscreen={fullscreen} // Fullscreen editing mode
                highlightEnable={true} // Enable syntax highlighting
                tabSize={4} // Use 4 spaces for tab
                hideToolbar={false} // Show toolbar
            />
        </div>
    );
};

export default Editor;
