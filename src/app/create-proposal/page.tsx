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
import TransactionTypes from "@/components/create-proposal/TransactionTypes"; // Import the new component

const CreateProposalPage = () => {
    const [proposalTitle, setProposalTitle] = useState("");
    const [transactions, setTransactions] = useState<string[]>([]);
    const [showTransactionOptions, setShowTransactionOptions] = useState(false); // Toggle grid visibility
    const editorRef = useRef<any>(null);

    const handleAddTransaction = () => {
        setShowTransactionOptions(true); // Show the transaction options grid
    };

    const handleSelectTransaction = (transactionType: string) => {
        setTransactions([...transactions, transactionType]);
        setShowTransactionOptions(false); // Hide the grid after selection
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

    const isTitleValid = proposalTitle.length > 5;

    return (
        <StepsRoot defaultValue={0} count={3}>
            <StepsList>
                <StepsItem index={0} icon={<LuFileText />} />
                <StepsItem index={1} icon={<LuPlus />} />
                <StepsItem index={2} icon={<LuCheckCircle />} />
            </StepsList>

            {/* Step 1: Proposal Title */}
            <StepsContent index={0}>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Proposal Title</Text>
                    <Input
                        placeholder="Enter your proposal title"
                        value={proposalTitle}
                        onChange={(e) => setProposalTitle(e.target.value)}
                    />
                    {!isTitleValid && (
                        <Text color="red.500" fontSize="sm">
                            Title must be longer than 5 characters.
                        </Text>
                    )}
                </VStack>
            </StepsContent>

            {/* Step 2: Add Transactions */}
            <StepsContent index={1}>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Transactions</Text>


                    {showTransactionOptions ? (
                        <TransactionTypes onSelect={handleSelectTransaction} />
                    ) : (
                        <Box>
                            {transactions.map((tx, idx) => (
                                <Text key={idx}>{tx}</Text>
                            ))}
                        </Box>
                    )}
                    <Button colorScheme="teal" onClick={handleAddTransaction}>
                        Add Transaction
                    </Button>
                </VStack>
            </StepsContent>

            {/* Step 3: Proposal Description */}
            <StepsContent index={2}>
                <VStack gap={4} align="stretch" p={4}>
                    <Text fontSize="xl" fontWeight="bold">Proposal Description</Text>
                    <Editor ref={editorRef} />
                </VStack>
            </StepsContent>

            {/* Final Step: Review and Submit */}
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
                {isTitleValid ? (
                    <StepsNextTrigger asChild>
                        <Button variant="solid" size="sm" colorScheme="teal">
                            Next
                        </Button>
                    </StepsNextTrigger>
                ) : (
                    <Button
                        variant="solid"
                        size="sm"
                        colorScheme="teal"
                        disabled
                    >
                        Next
                    </Button>
                )}
            </Group>
        </StepsRoot>
    );
};

export default CreateProposalPage;
