import React from "react";
import { VStack, Input, Button, HStack, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"; // Assuming this exists
import { useForm } from "react-hook-form";
import { isAddress } from "viem";

type SendERC20TransactionProps = {
    type: string;
    tokenAddress: string;
    decimals: number;
    onAdd: (transaction: { type: string; details: Record<string, any> }) => void;
    onCancel: () => void;
};

interface FormValues {
    amount: string;
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
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        const details = {
            amount: data.amount,
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
