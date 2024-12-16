import React, { useState } from "react";
import { VStack, Input, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"; // Assuming this exists
import { useForm } from "react-hook-form";
import { isAddress } from "viem";

type SendERC20TransactionProps = {
    type: string;
    tokenAddress: string;
    decimals: number; // Token's decimal precision
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

interface FormValues {
    amount: string; // Input as string to avoid float precision issues
    address: string;
}

const SendERC20Transaction: React.FC<SendERC20TransactionProps> = ({
    type,
    tokenAddress,
    decimals,
    onAdd,
    onCancel,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormValues>();
    const [amountPreview, setAmountPreview] = useState<string>("0");

    // Watch for amount input changes
    const amount = watch("amount", "");

    // Convert and update the preview in smaller units
    React.useEffect(() => {
        if (amount) {
            const parsedAmount = parseFloat(amount);
            if (!isNaN(parsedAmount)) {
                setAmountPreview((parsedAmount * 10 ** decimals).toLocaleString("en-US"));
            } else {
                setAmountPreview("0");
            }
        } else {
            setAmountPreview("0");
        }
    }, [amount, decimals]);

    const onSubmit = (data: FormValues) => {
        const parsedAmount = parseFloat(data.amount);
        const amountWithDecimals = (parsedAmount * 10 ** decimals).toString();
        const details = {
            amount: amountWithDecimals,
            address: data.address,
            tokenAddress,
            decimals,
        };
        onAdd({ type, details });
    };

    return (
        <div>
            <Stack gap="4" align="stretch" maxW="sm">
                {/* Amount Field */}
                <Field
                    label="Amount"
                    invalid={!!errors.amount}
                    errorText={errors.amount?.message}
                >
                    <Input
                        placeholder="Enter amount"
                        {...register("amount", {
                            required: "Amount is required.",
                        })}
                        type="number"
                    />
                    {/* Preview of the smaller units */}
                    <Text fontSize="sm" color="gray.500" mt="1">
                        {amountPreview} (uint)
                    </Text>
                </Field>

                {/* Address Field */}
                <Field
                    label="Destination Address"
                    invalid={!!errors.address}
                    errorText={errors.address?.message}
                >
                    <Input
                        placeholder="Enter destination address"
                        {...register("address", {
                            required: "Address is required.",
                            validate: (value) =>
                                isAddress(value) || "Invalid Ethereum address.",
                        })}
                    />
                </Field>

                {/* Buttons */}
                <HStack justify="space-between">
                    <Button colorScheme="red" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="teal"
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Add Transaction
                    </Button>
                </HStack>
            </Stack>
        </div>
    );
};

export default SendERC20Transaction;
