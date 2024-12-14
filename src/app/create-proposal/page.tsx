'use client';

import React, { useRef } from "react";
import { Button, Input, VStack, HStack } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { LuPlus } from "react-icons/lu";

const ToastEditor = dynamic(() => import("@toast-ui/react-editor").then(mod => mod.Editor), { ssr: false });

export default function CreateProposalPage() {
    const editorRef = useRef<typeof ToastEditor>(null);

    return (
        <VStack gap={4} align="stretch" p={4}>
            <Input placeholder="Proposal Title" />
            <ToastEditor
                ref={editorRef}
                initialValue="Write your proposal details here..."
                previewStyle="vertical"
                height="300px"
                initialEditType="markdown"
                useCommandShortcut={true}
                theme="dark" // Apply the dark theme
                _dark={{ color: 'white', borderColor: 'yellow', borderWidth: 1 }}
            />
            <HStack justify="flex-end">
                <Button
                    colorScheme="teal"
                >
                    Add Transaction
                </Button>
            </HStack>
        </VStack>
    );
}
