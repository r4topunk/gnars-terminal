declare module "@toast-ui/editor" {
    export class Editor {
        getMarkdown(): string;
        getHtml(): string;
        setMarkdown(markdown: string, cursorToEnd?: boolean): void;
        getInstance(): Editor;
        getRootElement(): HTMLElement;
        focus(): void;
        blur(): void;
        remove(): void;
        reset(): void;
        addHook(type: string, handler: Function): void;
        removeHook(type: string): void;
        // Add other methods as needed
    }

    export class Viewer {
        // Define Viewer methods if needed
    }
}
