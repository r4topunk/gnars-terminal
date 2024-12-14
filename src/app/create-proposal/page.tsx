// lets create a form for creating proposals with Title, add transaction button and textarea, we are using chakraui 3.0 and next 14
import React from "react";
import { Button, Textarea, Input, VStack, HStack, Box } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default function CreateProposalPage() {
    return (
        <VStack gap={4} align="stretch">
            <Input placeholder="Title" />
            <Textarea placeholder="Description" />
        </VStack>
    );
}

