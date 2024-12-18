import React, { useState } from "react";
import { VStack, Box, Text, Button, HStack, Flex, Image } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { transactionOptions } from "./TransactionTypes";
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

    const getTransactionImage = (type: string) => {
        const transaction = transactionOptions.find(option => option.name === type);
        return transaction ? transaction.image : "";
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
                        bg="white"
                        _dark={{ bg: "gray.800" }}
                        boxShadow="md"
                        transition="all 0.2s"
                        _hover={{ transform: "scale(1.02)" }}
                    >
                        <HStack justify="space-between" align="center">
                            <HStack>
                                <Image
                                    src={getTransactionImage(tx.type)}
                                    alt={tx.type}
                                    boxSize="20px"
                                    objectFit="cover"
                                />
                                <Text fontWeight="bold" onClick={() => toggleExpand(idx)} cursor="pointer">
                                    {tx.type}
                                </Text>
                            </HStack>
                            {expandedIndex === idx ? (
                                <LuChevronUp onClick={() => toggleExpand(idx)} cursor="pointer" />
                            ) : (
                                <LuChevronDown onClick={() => toggleExpand(idx)} cursor="pointer" />
                            )}
                        </HStack>
                        {expandedIndex === idx && (
                            <Box mt={2}>
                                <HStack align="start" gap={4}>
                                    <Box
                                        borderLeft="2px solid"
                                        borderColor="gray.200"
                                        _dark={{ borderColor: "gray.600" }}
                                        height="100%"
                                        mr={4}
                                    />
                                    <VStack align="start" gap={1}>
                                        {Object.entries(tx.details).map(([key, value]) => (
                                            <HStack key={key} gap={2}>
                                                <Text fontWeight="medium">{key}:</Text>
                                                <Text>{String(value)}</Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </HStack>
                                <Flex justify="flex-end">
                                    <Button colorScheme="red" size="sm" mt={2} onClick={() => onDelete(idx)}>
                                        Delete
                                    </Button>
                                </Flex>
                            </Box>
                        )}
                    </Box>
                ))
            )}
        </VStack>
    );
};

export default TransactionList;
