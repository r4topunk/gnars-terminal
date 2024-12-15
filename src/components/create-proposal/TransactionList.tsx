import React from "react";
import { VStack, Box, Text } from "@chakra-ui/react";

type TransactionDetails = Record<string, string | number | React.ReactNode>;

type TransactionListProps = {
    transactions: { type: string; details: TransactionDetails }[];
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
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
                    </Box>
                ))
            )}
        </VStack>
    );
};

export default TransactionList;
