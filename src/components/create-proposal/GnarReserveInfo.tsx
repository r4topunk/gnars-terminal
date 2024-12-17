import React, { useMemo, useEffect } from "react";
import { VStack, Text, Spinner, Box } from "@chakra-ui/react";
import { useReadTokenRemainingTokensInReserve } from "@/hooks/wagmiGenerated";

const GnarReserveInfo: React.FC = () => {
    const {
        data: reserve,
        isLoading,
        isError,
        refetch,
        dataUpdatedAt,
    } = useReadTokenRemainingTokensInReserve();

    // Periodically refetch the data every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 60000);
        return () => clearInterval(interval);
    }, [refetch]);

    // Memoize reserve display to avoid unnecessary re-renders
    const reserveInfo = useMemo(() => {
        if (isLoading) {
            return (
                <Box textAlign="center">
                    <Spinner size="sm" />
                    <Text mt={2}>Loading reserve info...</Text>
                </Box>
            );
        }

        if (isError || reserve === undefined) {
            return (
                <Text color="red.500" textAlign="center">
                    Failed to load reserve info.
                </Text>
            );
        }

        return (
            <VStack>
                <Text fontWeight="bold" fontSize="md">
                    Reserve: {reserve.toString()} GNARs available
                </Text>
                <Text fontSize="xs" color="gray.500">
                    Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
                </Text>
            </VStack>
        );
    }, [isLoading, isError, reserve, dataUpdatedAt]);

    return (
        <VStack>
            {reserveInfo}
        </VStack>
    );
};

export default GnarReserveInfo;
