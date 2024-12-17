import React, { useState } from "react";
import { VStack, Box, Text, Button, HStack } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

type TransactionDetails = Record<string, string | number | React.ReactNode>;

type TransactionListProps = {
    transactions: { type: string; details: TransactionDetails }[];
    onDelete: (index: number) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <VStack gap={4} align="stretch" p={4}>
            {transactions.length === 0 ? (
                <Text>No transactions added yet.</Text>
            ) : (
                transactions.map((tx, idx) => (
                    <Box
                        key={idx}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        bg="gray.50"
                        _dark={{ bg: "gray.700" }}
                    >
                        <HStack justify="space-between">
                            <Text fontWeight="bold" onClick={() => toggleExpand(idx)} cursor="pointer">
                                {tx.type}
                            </Text>

                            {expandedIndex === idx ? (
                                <LuChevronUp onClick={() => toggleExpand(idx)} cursor="pointer" />
                            ) : (
                                <LuChevronDown onClick={() => toggleExpand(idx)} cursor="pointer" />
                            )}
                        </HStack>
                        {expandedIndex === idx && (
                            <>
                                {Object.entries(tx.details).map(([key, value]) => (
                                    <Text key={key}>
                                        {key}: <strong>{String(value)}</strong>
                                    </Text>
                                ))}
                                <Button colorScheme="red" size="sm" mt={2} onClick={() => onDelete(idx)}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </Box>
                ))
            )}
        </VStack>
    );
};

export default TransactionList;
