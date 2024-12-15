"use client";

import React from "react";
import { VStack, Input, Button, Text, HStack } from "@chakra-ui/react";
import ProposalTransactionInputs from "./ProposalTransactionsInputs";

type TransactionItemProps = {
    type: string;
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ type, onAdd, onCancel }) => {
    const [amount, setAmount] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [tokenID, setTokenID] = React.useState("");

    const handleAddBasic = () => {
        const details =
            type === "SEND GNAR" ? { tokenID, address } : { amount, address };
        onAdd({ type, details });
    };

    return (
        <VStack gap={4} align="stretch" p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" fontSize="lg">
                {type}
            </Text>

            {type === "SEND ETH" || type === "SEND USDC" || type === "SEND IT" ? (
                <>
                    <Input
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Input
                        placeholder="Enter destination address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <HStack justify="space-between">
                        <Button colorScheme="red" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="teal"
                            onClick={handleAddBasic}
                            disabled={!amount.trim() || !address.trim()}
                        >
                            Add Transaction
                        </Button>
                    </HStack>
                </>
            ) : type === "SEND GNAR" ? (
                <>
                    <Input
                        placeholder="Enter token ID"
                        value={tokenID}
                        onChange={(e) => setTokenID(e.target.value)}
                    />
                    <Input
                        placeholder="Enter destination address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <HStack justify="space-between">
                        <Button colorScheme="red" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="teal"
                            onClick={handleAddBasic}
                            disabled={!tokenID.trim() || !address.trim()}
                        >
                            Add Transaction
                        </Button>
                    </HStack>
                </>
            ) : type === "DROP PROPOSAL MINT" ? (
                <ProposalTransactionInputs
                    onAdd={(details: Record<string, any>) => onAdd({ type, details })}
                    onCancel={onCancel}
                />
            ) : null}
        </VStack>
    );
};

export default TransactionItem;
