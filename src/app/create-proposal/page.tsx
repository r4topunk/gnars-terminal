'use client';

import React, { useState, useRef } from "react";
import {
    VStack,
    Text,
    Input,
    Button,
    Box,
    Group,
} from "@chakra-ui/react";
import {
    StepsRoot,
    StepsList,
    StepsItem,
    StepsContent,
    StepsNextTrigger,
    StepsPrevTrigger,
    StepsCompletedContent,
} from "@/components/ui/steps";
import { LuFileText, LuPlus, LuCheckCircle } from "react-icons/lu";
import Editor from "@/components/create-proposal/Editor";

const CreateProposalPage = () => {
    const [proposalTitle, setProposalTitle] = useState("");
    const [transactions, setTransactions] = useState<string[]>([]);
    const editorRef = useRef<any>(null);

    const handleAddTransaction = () => {
        setTransactions([...transactions, `Transaction ${transactions.length + 1}`]);
    };

    const handleSubmitProposal = () => {
        const proposalDetails = editorRef.current?.getInstance().getMarkdown();
        console.log({
            title: proposalTitle,
            transactions,
            details: proposalDetails,
        });
        alert("Proposal submitted! Check the console for details.");
    };

    return (
        <StepsRoot defaultValue={0} count={3}> {/* FIX: Change count to 3 */}
            <StepsList>
                <StepsItem index={0} icon={<LuFileText />} />
                <StepsItem index={1} icon={<LuPlus />} />
                <StepsItem index={2} icon={<LuCheckCircle />} />
            </StepsList>

            <StepsContent index={0}>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Proposal Title</Text>
                    <Input
                        placeholder="Enter your proposal title"
                        value={proposalTitle}
                        onChange={(e) => setProposalTitle(e.target.value)}
                    />
                </VStack>
            </StepsContent>

            <StepsContent index={1}>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Transactions</Text>
                    <Button colorScheme="teal" onClick={handleAddTransaction}>
                        Add Transaction
                    </Button>
                    <Box>
                        {transactions.map((tx, idx) => (
                            <Text key={idx}>{tx}</Text>
                        ))}
                    </Box>
                </VStack>
            </StepsContent>

            <StepsContent index={2}>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Proposal Description</Text>
                    <Editor ref={editorRef} />
                </VStack>
            </StepsContent>

            <StepsCompletedContent>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">
                        Review and Submit
                    </Text>
                    <Text>
                        Title: <strong>{proposalTitle}</strong>
                    </Text>
                    <Text>
                        Transactions: <strong>{transactions.join(", ")}</strong>
                    </Text>
                    <Button colorScheme="green" onClick={handleSubmitProposal}>
                        Submit Proposal
                    </Button>
                </VStack>
            </StepsCompletedContent>

            <Group mt={6} justify="space-between">
                <StepsPrevTrigger asChild>
                    <Button variant="outline" size="sm">
                        Previous
                    </Button>
                </StepsPrevTrigger>
                <StepsNextTrigger asChild>
                    <Button variant="solid" size="sm" colorScheme="teal">
                        Next
                    </Button>
                </StepsNextTrigger>
            </Group>
        </StepsRoot>
    );
};

export default CreateProposalPage;
