"use client";

import React from "react";
import { VStack, Input, Button, Text, HStack } from "@chakra-ui/react";
import ProposalTransactionInputs from "./ProposalTransactionsInputs";
import SendERC20Transaction from "./SendERC20Transaction";
import SendGnarTransaction from "./SendGnarTransaction";
import AirdropRandomGnarTransaction from "./AirdropRandomGnarTransaction";
import CustomTransaction from "./CustomTransaction";
import { USDC_CONTRACT_ADDRESS } from "@/utils/constants";

type TransactionItemProps = {
    type: string;
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ type, onAdd, onCancel }) => {
    const [amount, setAmount] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [tokenID, setTokenID] = React.useState("");
    const [numRecipients, setNumRecipients] = React.useState(""); // New state for number of recipients
    const [customData, setCustomData] = React.useState(""); // New state for custom transaction data

    const getTokenDetails = (type: string) => {
        switch (type) {
            case "SEND ETH":
                return { tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", decimals: 18 };
            case "SEND USDC":
                return { tokenAddress: USDC_CONTRACT_ADDRESS, decimals: 6 };
            case "SEND IT":
                return { tokenAddress: "0x0000000000000000000000000000000000000000", decimals: 18 }; // Replace with actual token address and decimals
            default:
                return { tokenAddress: "", decimals: 18 };
        }
    };

    const { tokenAddress, decimals } = getTokenDetails(type);

    const handleAddBasic = () => {
        const details =
            type === "SEND GNAR" ? { tokenID, address } : { amount, address };
        onAdd({ type, details });
    };

    const handleAddAirdrop = () => {
        const details = { numRecipients };
        onAdd({ type, details });
    };

    const handleAddCustom = () => {
        const details = { customData };
        onAdd({ type, details });
    };

    return (
        <VStack gap={4} align="stretch" p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" fontSize="lg">
                {type}
            </Text>

            {type === "SEND ETH" || type === "SEND USDC" || type === "SEND IT" ? (
                <SendERC20Transaction
                    type={type}
                    tokenAddress={tokenAddress}
                    decimals={decimals}
                    onAdd={onAdd}
                    onCancel={onCancel}
                />
            ) : type === "SEND GNAR" ? (
                <SendGnarTransaction
                    onAdd={onAdd}
                    onCancel={onCancel}
                />
            ) : type === "AIRDROP RANDOM GNAR" ? (
                <AirdropRandomGnarTransaction
                    onAdd={onAdd}
                    onCancel={onCancel}
                />
            ) : type === "DROP PROPOSAL MINT" ? (
                <ProposalTransactionInputs
                    onAdd={(details: Record<string, any>) => onAdd({ type, details })}
                    onCancel={onCancel}
                />
            ) : type === "CUSTOM TRANSACTION" ? (
                <CustomTransaction
                    onAdd={onAdd}
                    onCancel={onCancel}
                />
            ) : null}
        </VStack>
    );
};

export default TransactionItem;
