"use client";

import React, { useState } from "react";
import { VStack, Input, Button, HStack, Text, Box } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";

type Transaction = {
    id: number;
    name: string;
    symbol: string;
    description: string;
    media: string;
    price: string;
    editionType: string;
    editionSize: string;
    startTime: string;
    endTime: string;
    mintLimit: string;
    royalty: string;
    payoutAddress: string;
    adminAddress: string;
};

type ProposalTransactionInputsProps = {
    onAdd: (details: Transaction) => void;
    onCancel: () => void;
};

const ProposalTransactionInputs: React.FC<ProposalTransactionInputsProps> = ({ onAdd, onCancel }) => {
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState("");
    const [price, setPrice] = useState("");
    const [editionType, setEditionType] = useState("Fixed"); // Default to "Fixed"
    const [editionSize, setEditionSize] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [mintLimit, setMintLimit] = useState("");
    const [royalty, setRoyalty] = useState("");
    const [payoutAddress, setPayoutAddress] = useState("");
    const [adminAddress, setAdminAddress] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const handleAdd = () => {
        const newTransaction: Transaction = {
            id: Date.now(), // Unique ID for each transaction
            name,
            symbol,
            description,
            media,
            price,
            editionType,
            editionSize,
            startTime,
            endTime,
            mintLimit,
            royalty,
            payoutAddress,
            adminAddress,
        };

        onAdd(newTransaction);

        // Clear form inputs
        setName("");
        setSymbol("");
        setDescription("");
        setMedia("");
        setPrice("");
        setEditionType("Fixed");
        setEditionSize("");
        setStartTime("");
        setEndTime("");
        setMintLimit("");
        setRoyalty("");
        setPayoutAddress("");
        setAdminAddress("");
    };

    const handleDelete = (id: number) => {
        const confirmed = window.confirm("Are you sure you want to delete this transaction?");
        if (confirmed) {
            setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
        }
    };

    const toggleEditionType = () => {
        setEditionType((prevType) => (prevType === "Fixed" ? "Open" : "Fixed"));
    };

    return (
        <VStack gap={4} align="stretch">
            {/* Transaction Form */}
            <Text fontSize="xl" fontWeight="bold">Add Transaction</Text>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Symbol" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            <Input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                placeholder="Media URL"
                value={media}
                onChange={(e) => setMedia(e.target.value)}
            />
            <Input placeholder="Price (ETH)" value={price} onChange={(e) => setPrice(e.target.value)} />

            {/* Switch for Edition Type */}
            <HStack justify="space-between" align="center">
                <Text fontWeight="bold">Edition Type:</Text>
                <HStack align="center" gap={4}>
                    <Text>Fixed</Text>
                    <Switch
                        checked={editionType === "Open"}
                        onCheckedChange={toggleEditionType}
                    />
                    <Text>Open</Text>
                </HStack>
            </HStack>

            <Input
                placeholder="Edition Size"
                value={editionSize}
                onChange={(e) => setEditionSize(e.target.value)}
            />
            <Input
                placeholder="Start Time (yyyy-mm-dd)"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
                placeholder="End Time (yyyy-mm-dd)"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <Input
                placeholder="Mint Limit Per Address"
                value={mintLimit}
                onChange={(e) => setMintLimit(e.target.value)}
            />
            <Input
                placeholder="Royalty (%)"
                value={royalty}
                onChange={(e) => setRoyalty(e.target.value)}
            />
            <Input
                placeholder="Payout Address"
                value={payoutAddress}
                onChange={(e) => setPayoutAddress(e.target.value)}
            />
            <Input
                placeholder="Default Admin Address"
                value={adminAddress}
                onChange={(e) => setAdminAddress(e.target.value)}
            />
            <HStack justify="space-between">
                <Button
                    colorScheme="red"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    colorScheme="teal"
                    onClick={handleAdd}
                    disabled={!name.trim() || !symbol.trim() || !payoutAddress.trim()}
                >
                    Add Transaction
                </Button>
            </HStack>

            {/* Transaction List */}
            <Text fontSize="xl" fontWeight="bold" mt={6}>
                Transaction List
            </Text>
            {transactions.length === 0 ? (
                <Text>No transactions added yet.</Text>
            ) : (
                transactions.map((transaction) => (
                    <Box
                        key={transaction.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        boxShadow="md"
                        bg="gray.50"
                    >
                        <Text><strong>Name:</strong> {transaction.name}</Text>
                        <Text><strong>Symbol:</strong> {transaction.symbol}</Text>
                        <Text><strong>Edition Type:</strong> {transaction.editionType}</Text>
                        <Text><strong>Price:</strong> {transaction.price} ETH</Text>
                        <Button
                            colorScheme="red"
                            size="sm"
                            mt={2}
                            onClick={() => handleDelete(transaction.id)}
                        >
                            Delete
                        </Button>
                    </Box>
                ))
            )}
        </VStack>
    );
};

export default ProposalTransactionInputs;
