'use client';

import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
import TransactionTypes from "@/components/create-proposal/TransactionTypes";
import TransactionList from "@/components/create-proposal/TransactionList";
import TransactionItem from "@/components/create-proposal/TransactionItem";
import Editor from "@/components/create-proposal/Editor";
import Markdown from "@/components/proposal/markdown";

const CreateProposalPage = () => {
    const { control, handleSubmit, watch, setValue } = useForm();
    const [transactions, setTransactions] = useState<{ type: string; details: any }[]>([]);
    const [currentTransactionType, setCurrentTransactionType] = useState<string | null>(null);
    const [showTransactionOptions, setShowTransactionOptions] = useState(false);
    const editorRef = useRef<any>(null);
    const [initialEditorValue, setInitialEditorValue] = useState<string | null>(null);

    const proposalTitle = watch("proposalTitle");
    const editorContent = watch("editorContent");

    const handleAddTransaction = () => {
        setShowTransactionOptions(true);
    };

    const handleSelectTransaction = (type: string) => {
        setCurrentTransactionType(type);
        setShowTransactionOptions(false);
    };

    const handleAddTransactionDetails = (transaction: { type: string; details: any }) => {
        setTransactions([...transactions, transaction]);
        setCurrentTransactionType(null);
    };

    const handleCancelTransaction = () => {
        setCurrentTransactionType(null);
    };

    const handleDeleteTransaction = (index: number) => {
        setTransactions(transactions.filter((_, idx) => idx !== index));
    };

    const onSubmit = (data: any) => {
        console.log({
            title: data.proposalTitle,
            transactions,
            details: data.editorContent,
        });
        alert("Proposal submitted! Check the console for details.");
    };

    const isTitleValid = proposalTitle?.length > 5;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StepsRoot defaultValue={0} count={3}>
                <StepsList>
                    <StepsItem index={0} icon={<LuFileText />} />
                    <StepsItem index={1} icon={<LuPlus />} />
                    <StepsItem index={2} icon={<LuCheckCircle />} />
                </StepsList>

                {/* Step 1: Proposal Title */}
                <StepsContent index={0}>
                    <VStack gap={4} align="stretch" p={4}>
                        <Text fontSize="2xl" fontWeight="bold">Proposal Title</Text>
                        <Controller
                            name="proposalTitle"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    placeholder="Enter your proposal title"
                                    {...field}
                                />
                            )}
                        />
                        {!isTitleValid && (
                            <Text color="red.500">Title must be longer than 5 characters.</Text>
                        )}
                    </VStack>
                </StepsContent>

                {/* Step 2: Add Transactions */}
                <StepsContent index={1}>
                    <VStack gap={4} align="stretch" p={4}>
                        <Text fontSize="2xl" fontWeight="bold">Transactions</Text>

                        {currentTransactionType ? (
                            <TransactionItem
                                type={currentTransactionType}
                                onAdd={handleAddTransactionDetails}
                                onCancel={handleCancelTransaction}
                            />
                        ) : showTransactionOptions ? (
                            <TransactionTypes onSelect={handleSelectTransaction} />
                        ) : (
                            <>
                                <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                                <Button colorScheme="teal" onClick={handleAddTransaction}>
                                    Add Transaction
                                </Button>
                            </>
                        )}
                    </VStack>
                </StepsContent>

                {/* Step 3: Proposal Description */}
                <StepsContent index={2}>
                    <VStack gap={4} align="stretch" p={4}>
                        <Text fontSize="2xl" fontWeight="bold">Proposal Description</Text>
                        <Controller
                            name="editorContent"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Editor
                                    value={field.value} // Pass the form value to the editor
                                    onChange={(content) => {
                                        field.onChange(content); // Update react-hook-form state
                                        console.log("Markdown content updated:", content);
                                    }}
                                />
                            )}
                        />
                    </VStack>
                </StepsContent>

                {/* Review and Submit */}
                <StepsCompletedContent>
                    <VStack gap={4} align="stretch" p={4}>
                        <Text fontSize="2xl" fontWeight="bold">Review and Submit</Text>
                        <Text>Title: <strong>{proposalTitle}</strong></Text>
                        <Text>
                            Transactions:{" "}
                            <strong>{transactions.map((tx) => tx.type).join(", ")}</strong>
                            <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                        </Text>
                        <Text>Editor Content: <strong>{editorContent}</strong></Text>
                        <Markdown
                            text={editorContent}
                        />
                        <Button
                            colorScheme="green"
                            type="submit"
                            disabled={!isTitleValid || transactions.length === 0}
                        >
                            Submit Proposal
                        </Button>
                    </VStack>
                </StepsCompletedContent>

                {/* Navigation Buttons */}
                <Group mt={6} justify="space-between">
                    <StepsPrevTrigger asChild>
                        <Button variant="outline" size="sm">Previous</Button>
                    </StepsPrevTrigger>
                    <StepsNextTrigger asChild>
                        <Button
                            variant="solid"
                            size="sm"
                            colorScheme="teal"
                            disabled={!isTitleValid && !transactions.length}
                        >
                            Next
                        </Button>
                    </StepsNextTrigger>
                </Group>
            </StepsRoot>
        </form>
    );
};

export default CreateProposalPage;
