"use client";

import React, { useEffect, useState } from "react";
import { VStack, Text, HStack, SimpleGrid, Badge, Image } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/components/ui/radio";
import TransactionForm from "./TransactionForm";
import { SENDIT_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from "@/utils/constants";
import { Address, isAddress } from 'viem';
import { LuChevronDown } from "react-icons/lu";
import { prepareTransactionData, formatTransactionDetails } from '@/utils/transactionUtils';
import useTreasure from "@/hooks/useTreasure";
import { useTheme } from "next-themes";

type TransactionItemProps = {
    type: string;
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const DROPOSAL_CONTRACT_ADDRESS = "0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c";

const formatNumber = (value: string) => {
    if (!value) return "";
    const [integerPart, decimalPart] = value.split(".");
    const formattedInteger = new Intl.NumberFormat("en-US").format(parseFloat(integerPart.replace(/,/g, '')));
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

const TransactionItem: React.FC<TransactionItemProps> = ({ type, onAdd, onCancel }) => {
    const [file, setFile] = useState<File | null>(null);
    const [editionType, setEditionType] = useState<string>("Fixed");
    const [amount, setAmount] = useState<number>(0);

    const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY as Address || '0x';
    const { tokens, usdcBalance, ethBalance, senditBalance, gnarsNftBalance, isLoading } = useTreasure(treasuryAddress);

    type TokenDetails = {
        tokenAddress: string;
        name: string;
        decimals: number;
        image: string;
    };

    const tokenDetails: Record<string, TokenDetails> = {
        "SEND ETH": { tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", name: "ETH", decimals: 18, image: "/images/ethereum.png" },
        "SEND USDC": { tokenAddress: USDC_CONTRACT_ADDRESS, name: "USDC", decimals: 6, image: "/images/usdc.png" },
        "SEND IT": { tokenAddress: SENDIT_CONTRACT_ADDRESS, name: "SENDIT", decimals: 18, image: "/images/sendit.jpg" },
        "SEND NFT": { tokenAddress: "", name: "GNARS", decimals: 0, image: "https://gnars.com/images/logo.png" }
    };

    const { tokenAddress, name, decimals, image } = tokenDetails[type] || { tokenAddress: "", name: "", decimals: 18, image: "" };

    type Field = {
        name: string;
        placeholder: string;
        validate: (value: string) => boolean | string;
        type?: string;
    };

    const fieldsMapping: Record<string, Field[]> = {
        "SEND ETH": [
            { name: "amount", placeholder: "Enter amount", validate: (value: string) => !isNaN(Number(value.replace(/,/g, ''))) || "Invalid amount." },
            { name: "toAddress", placeholder: "Enter destination address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
        ],
        "SEND USDC": [
            { name: "amount", placeholder: "Enter amount", validate: (value: string) => !isNaN(Number(value.replace(/,/g, ''))) || "Invalid amount." },
            { name: "toAddress", placeholder: "Enter destination address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
        ],
        "SEND IT": [
            { name: "amount", placeholder: "Enter amount", validate: (value: string) => !isNaN(Number(value.replace(/,/g, ''))) || "Invalid amount." },
            { name: "toAddress", placeholder: "Enter destination address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
        ],
        "SEND NFT": [
            { name: "tokenId", placeholder: "Enter tokenId", validate: (value: string) => !isNaN(Number(value.replace(/,/g, ''))) || "Invalid tokenId." },
            { name: "toAddress", placeholder: "Enter destination address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
        ],
        "AIRDROP RANDOM GNAR": [
            { name: "amount", placeholder: "Amount", validate: (value: string) => !isNaN(Number(value.replace(/,/g, ''))) || "Invalid amount." },
            { name: "toAddress", placeholder: "Address", validate: (value: string) => isAddress(value) || "Invalid Ethereum address." }
        ],
        "DROPOSAL MINT": [
            { name: "name", placeholder: "Name", validate: (value: string) => value.trim() !== "" || "Name is required." },
            { name: "symbol", placeholder: "Symbol", validate: (value: string) => value.trim() !== "" || "Symbol is required." },
            { name: "description", placeholder: "Description", validate: (value: string) => value.trim() !== "" || "Description is required." },
            { name: "animationURI", placeholder: "Animation URI", validate: (value: string) => true },
            { name: "imageURI", placeholder: "Image URI", validate: (value: string) => value.trim() !== "" || "Image URI is required." },
            { name: "price", placeholder: "Price (ETH)", validate: (value: string) => !isNaN(Number(value.trim())) || "Invalid price." },
            ...(editionType === "Fixed" ? [{ name: "editionSize", placeholder: "Edition Size", type: "text", validate: (value: string) => !isNaN(Number(value.trim())) || "Invalid edition size." }] : []),
            { name: "startTime", placeholder: "Start Time", type: "date", validate: (value: string) => !isNaN(Date.parse(value.trim())) || "Invalid start time." },
            { name: "endTime", placeholder: "End Time", type: "date", validate: (value: string) => !isNaN(Date.parse(value.trim())) || "Invalid end time." },
            { name: "mintLimit", placeholder: "Mint Limit Per Address", validate: (value: string) => !isNaN(Number(value.trim())) || "Invalid mint limit." },
            { name: "royalty", placeholder: "Royalty (%)", validate: (value: string) => !isNaN(Number(value.trim())) || "Invalid royalty." },
            { name: "payoutAddress", placeholder: "Payout Address", validate: (value: string) => isAddress(value.trim()) || "Invalid Ethereum address." },
            { name: "adminAddress", placeholder: "Default Admin Address", validate: (value: string) => isAddress(value.trim()) || "Invalid Ethereum address." }
        ],
        "CUSTOM TRANSACTION": [
            { name: "customData", placeholder: "Enter custom transaction data", validate: (value: string) => value.trim() !== "" || "Custom data is required." }
        ]
    };

    const fields = fieldsMapping[type] || [];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleAdd = (transaction: { type: string; details: Record<string, any> }) => {
        const treasureAddress = process.env.NEXT_PUBLIC_TREASURY as Address || '0x';
        const formattedDetails = formatTransactionDetails(type, transaction.details);
        const { input, contractAbi, fromAddress, toAddress, value } = prepareTransactionData(type, formattedDetails, treasureAddress);
        const details = {
            ...transaction.details,
            calldata: input,
            contractAbi,
            fromAddress,
            toAddress,
            value,
        };
        onAdd({ type: `${transaction.type}`, details });
    };

    const usdcBalanceNumber = parseFloat(usdcBalance?.toString() || "0");
    const ethBalanceNumber = ethBalance;
    const senditBalanceNumber = parseFloat(senditBalance?.toString() || "0");

    const calculatePercentageChange = (balance: number, amount: number) => {
        if (balance === 0) return 0;
        return (amount / balance) * 100;
    };

    useEffect(() => {
        const percentageChange = calculatePercentageChange(
            type === "SEND ETH" ? ethBalanceNumber :
                type === "SEND USDC" ? usdcBalanceNumber :
                    type === "SEND IT" ? senditBalanceNumber : 0,
            amount
        );
    }, [amount, ethBalanceNumber, usdcBalanceNumber, senditBalanceNumber, type]);

    const { theme } = useTheme();
    const badgeColor = theme === "dark" ? "red.300" : "red.500";

    const BalanceDisplay = ({ balance, name, image, amount }: { balance: number, name: string, image: string, amount: number }) => (
        <HStack>
            <Image src={image} alt={name} boxSize="20px" />
            <Text>
                Balance: <Badge colorScheme="green">{balance.toFixed(3)} {name}</Badge>
            </Text>
            {amount !== 0 && (
                <Badge color={badgeColor} fontWeight="semibold">
                    -{((amount / balance) * 100).toFixed(2)}% of the treasury
                </Badge>
            )}
        </HStack>
    );

    const handleAmountChange = (amount: number) => {
        setAmount(amount);
    };

    return (
        <VStack gap={4} align="stretch" p={4} borderWidth="1px" borderRadius="md">
            <HStack justifyContent="space-between">
                <Text fontWeight="bold" fontSize="lg">
                    {type}
                </Text>
                <LuChevronDown />
            </HStack>
            {(type === "SEND ETH" || type === "SEND USDC" || type === "SEND IT" || type === "SEND NFT") && isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    {type === "SEND ETH" && <BalanceDisplay balance={ethBalanceNumber} name={name} image={image} amount={amount} />}
                    {type === "SEND USDC" && <BalanceDisplay balance={usdcBalanceNumber} name={name} image={image} amount={amount} />}
                    {type === "SEND IT" && <BalanceDisplay balance={senditBalanceNumber} name={name} image={image} amount={amount} />}
                    {type === "SEND NFT" && <BalanceDisplay balance={gnarsNftBalance} name={name} image={image} amount={amount} />}
                </>
            )}
            {type === "DROPOSAL MINT" && (
                <RadioGroup
                    value={editionType}
                    onValueChange={(details) => setEditionType(details.value)}
                >
                    <SimpleGrid columns={2} gap={4}>
                        <Radio value="Fixed">Fixed Edition</Radio>
                        <Radio value="Open">Open Edition</Radio>
                    </SimpleGrid>
                </RadioGroup>
            )}
            <TransactionForm
                type={type}
                fields={fields}
                onAdd={(transaction) => {
                    setAmount(parseFloat(transaction.details.amount.replace(/,/g, '')));
                    handleAdd(transaction);
                }}
                onCancel={onCancel}
                onFileChange={handleFileChange}
                onAmountChange={handleAmountChange}
                formatNumber={formatNumber} // Pass the formatNumber function
            />
        </VStack>
    );
};

export default TransactionItem;
