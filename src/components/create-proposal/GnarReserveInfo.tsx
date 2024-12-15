import React, { useMemo } from "react";
import { VStack, Text, Spinner, Box, Button } from "@chakra-ui/react";
import { useReadTokenRemainingTokensInReserve } from "@/hooks/wagmiGenerated";

const GnarReserveInfo: React.FC = () => {
    const {
        data: reserve,
        isLoading,
        isError,
        isStale,
        refetch,
        dataUpdatedAt,
    } = useReadTokenRemainingTokensInReserve();

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
            {isStale && (
                <Text fontSize="sm" color="yellow.500">
                    Data may be outdated. Click below to refresh.
                </Text>
            )}
            <Button size="sm" colorScheme="teal" onClick={() => refetch()}>
                Refresh Reserve Info
            </Button>
        </VStack>
    );
};

export default GnarReserveInfo;
