"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useColorMode } from "../ui/color-mode";

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
    height = 700,
    preview = "live",
    visibleDragbar = true,
    fullscreen = false,
}) => {
    const { colorMode } = useColorMode() as { colorMode: "light" | "dark" }; // Get the current color mode ("light" or "dark")

    return (
        <div data-color-mode={colorMode}> {/* Dynamically set the mode */}
            <MDEditor
                value={value}
                onChange={onChange}
                height={height}
                preview={preview}
                visibleDragbar={visibleDragbar}
                fullscreen={fullscreen}
                highlightEnable={true}
                tabSize={4}
                hideToolbar={false}
                data-color-mode={colorMode}
            />
        </div>
    );
};

export default Editor;
