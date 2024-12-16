import React from "react";
import { VStack, Input, Button, HStack } from "@chakra-ui/react";

type AirdropRandomGnarTransactionProps = {
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const AirdropRandomGnarTransaction: React.FC<AirdropRandomGnarTransactionProps> = ({ onAdd, onCancel }) => {
    const [numRecipients, setNumRecipients] = React.useState("");

    const handleAdd = () => {
        const details = { numRecipients };
        onAdd({ type: "AIRDROP RANDOM GNAR", details });
    };

    return (
        <VStack gap={4} align="stretch">
            <Input
                placeholder="Enter number of recipients"
                value={numRecipients}
                onChange={(e) => setNumRecipients(e.target.value)}
            />
            <HStack justify="space-between">
                <Button colorScheme="red" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    colorScheme="teal"
                    onClick={handleAdd}
                    disabled={!numRecipients.trim()}
                >
                    Add Transaction
                </Button>
            </HStack>
        </VStack>
    );
};

export default AirdropRandomGnarTransaction;
