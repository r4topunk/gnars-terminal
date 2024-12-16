import React from "react";
import { VStack, Input, Button, HStack } from "@chakra-ui/react";

type CustomTransactionProps = {
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

const CustomTransaction: React.FC<CustomTransactionProps> = ({ onAdd, onCancel }) => {
    const [customData, setCustomData] = React.useState("");

    const handleAdd = () => {
        const details = { customData };
        onAdd({ type: "CUSTOM TRANSACTION", details });
    };

    return (
        <VStack gap={4} align="stretch">
            <Input
                placeholder="Enter custom transaction data"
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
            />
            <HStack justify="space-between">
                <Button colorScheme="red" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    colorScheme="teal"
                    onClick={handleAdd}
                    disabled={!customData.trim()}
                >
                    Add Transaction
                </Button>
            </HStack>
        </VStack>
    );
};

export default CustomTransaction;
