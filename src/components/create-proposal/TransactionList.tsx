import React from "react";
import { VStack, Box, Text, Button } from "@chakra-ui/react";

type TransactionDetails = Record<string, string | number | React.ReactNode>;

type TransactionListProps = {
    transactions: { type: string; details: TransactionDetails }[];
    onDelete: (index: number) => void;
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
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
                        <Text fontWeight="bold">{tx.type}</Text>
                        {Object.entries(tx.details).map(([key, value]) => (
                            <Text key={key}>
                                {key}: <strong>{String(value)}</strong>
                            </Text>
                        ))}
                        <Button colorScheme="red" size="sm" mt={2} onClick={() => onDelete(idx)}>
                            Delete
                        </Button>
                    </Box>
                ))
            )}
        </VStack>
    );
};

export default TransactionList;
