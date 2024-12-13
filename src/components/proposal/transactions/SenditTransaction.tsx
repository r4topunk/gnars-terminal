import { Box, Heading, Text, Image, HStack } from '@chakra-ui/react';
import { FormattedAddress } from '@/components/utils/ethereum';

interface SenditTransactionProps {
    index: number;
    to: string;
    value: string;
}

const SenditTransaction: React.FC<SenditTransactionProps> = ({ index, to, value }) => {
    return (
        <Box p={4} borderWidth={1} rounded="md" shadow="sm" mb={4}>
            <Heading size="sm" mb={2}>
                Transaction {index + 1}: Sendit Token Transfer
            </Heading>
            <Text display="flex" alignItems="center">
                <strong>To:</strong>
                <FormattedAddress address={to} />
            </Text>
            <HStack gap={2} align="center" mt={2}>
                <Text>
                    <strong>Value:</strong> {value}
                </Text>
                <Image
                    src="https://sendit.city/assets/images/image03.jpg?v=389a8e2f" // Replace with the actual path to your logo
                    alt="Sendit Logo"
                    boxSize="20px"
                    objectFit="contain"
                />
                SENDIT
            </HStack>
        </Box>
    );
};

export default SenditTransaction;
