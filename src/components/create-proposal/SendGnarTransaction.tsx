import React from "react";
import { VStack, Input, Button, HStack, Text } from "@chakra-ui/react";
import { isAddress } from 'viem';

type SendGnarTransactionProps = {
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const SendGnarTransaction: React.FC<SendGnarTransactionProps> = ({ onAdd, onCancel }) => {
    const [tokenID, setTokenID] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [isAddressValid, setIsAddressValid] = React.useState(true);

    const handleAdd = () => {
        const details = { tokenID, address };
        onAdd({ type: "SEND GNAR", details });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);
        setIsAddressValid(isAddress(value));
    };

    return (
        <VStack gap={4} align="stretch">
            <Input
                placeholder="Enter token ID"
                value={tokenID}
                onChange={(e) => setTokenID(e.target.value)}
            />
            <Input
                placeholder="Enter destination address"
                value={address}
                onChange={handleAddressChange}
                _invalid={!isAddressValid as any}
            />
            {!isAddressValid && <Text color="red.500">Invalid Ethereum address.</Text>}
            <HStack justify="space-between">
                <Button colorScheme="red" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    colorScheme="teal"
                    onClick={handleAdd}
                    disabled={!tokenID.trim() || !address.trim() || !isAddressValid}
                >
                    Add Transaction
                </Button>
            </HStack>
        </VStack>
    );
};

export default SendGnarTransaction;
