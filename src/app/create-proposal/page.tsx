'use client';

import React from "react";
import { Button, Input, VStack, HStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import Editor from "../../components/create-proposal/Editor";

export default function CreateProposalPage() {
    return (
        <VStack gap={4} align="stretch" p={4}>
            <Input placeholder="Proposal Title" />
            <Editor />
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
