"use client";

import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import TransactionForm from "./TransactionForm";
import { USDC_CONTRACT_ADDRESS } from "@/utils/constants";
import { isAddress } from 'viem';

type TransactionItemProps = {
    type: string;
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ type, onAdd, onCancel }) => {
    const getTokenDetails = (type: string) => {
        switch (type) {
            case "SEND ETH":
                return { tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", decimals: 18 };
            case "SEND USDC":
                return { tokenAddress: USDC_CONTRACT_ADDRESS, decimals: 6 };
            case "SEND IT":
                return { tokenAddress: "0xba5b9b2d2d06a9021eb3190ea5fb0e02160839a4", decimals: 18 };
            default:
                return { tokenAddress: "", decimals: 18 };
        }
    };

    const { tokenAddress, decimals } = getTokenDetails(type);

    const fields = (() => {
        switch (type) {
            case "SEND ETH":
            case "SEND USDC":
            case "SEND IT":
                return [
                    { name: "amount", placeholder: "Enter amount" },
                    { name: "address", placeholder: "Enter destination address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
                ];
            case "SEND GNAR":
                return [
                    { name: "tokenID", placeholder: "Enter token ID" },
                    { name: "address", placeholder: "Enter destination address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
                ];
            case "AIRDROP RANDOM GNAR":
                return [
                    { name: "numRecipients", placeholder: "Enter number of recipients" }
                ];
            case "DROP PROPOSAL MINT":
                return [
                    { name: "name", placeholder: "Name" },
                    { name: "symbol", placeholder: "Symbol" },
                    { name: "description", placeholder: "Description" },
                    { name: "media", placeholder: "Media URL" },
                    { name: "price", placeholder: "Price (ETH)" },
                    { name: "editionType", placeholder: "Edition Type" },
                    { name: "editionSize", placeholder: "Edition Size" },
                    { name: "startTime", placeholder: "Start Time (yyyy-mm-dd)" },
                    { name: "endTime", placeholder: "End Time (yyyy-mm-dd)" },
                    { name: "mintLimit", placeholder: "Mint Limit Per Address" },
                    { name: "royalty", placeholder: "Royalty (%)" },
                    { name: "payoutAddress", placeholder: "Payout Address" },
                    { name: "adminAddress", placeholder: "Default Admin Address" },
                ];
            case "CUSTOM TRANSACTION":
                return [
                    { name: "customData", placeholder: "Enter custom transaction data" }
                ];
            default:
                return [];
        }
    })();

    const handleAdd = (transaction: { type: string; details: Record<string, any> }) => {
        if (type === "SEND ETH" || type === "SEND USDC" || type === "SEND IT") {
            const parsedAmount = parseFloat(transaction.details.amount);
            const amountWithDecimals = (parsedAmount * 10 ** decimals).toString();
            const details = {
                ...transaction.details,
                amount: amountWithDecimals,
                tokenAddress,
                decimals,
            };
            onAdd({ type: transaction.type, details });
        } else {
            onAdd(transaction);
        }
    };

    return (
        <VStack gap={4} align="stretch" p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" fontSize="lg">
                {type}
            </Text>
            <TransactionForm
                type={type}
                fields={fields}
                onAdd={handleAdd}
                onCancel={onCancel}
            />
        </VStack>
    );
};

export default TransactionItem;
