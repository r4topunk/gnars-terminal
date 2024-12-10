import { FormattedAddress } from '@/components/utils/ethereum';
import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Address, decodeFunctionData } from 'viem';

// Define the ABI for the mintBatchTo function
const MINT_BATCH_TO_ABI = [
    {
        type: 'function',
        name: 'mintBatchTo',
        inputs: [
            { name: 'amount', type: 'uint256' },
            { name: 'recipient', type: 'address' },
        ],
        outputs: [{ name: 'tokenIds', type: 'uint256[]' }],
    },
];

interface MintBatchTransactionProps {
    calldata: `0x${string}`; // Properly typed calldata
    index: number;
}

export default function MintBatchTransaction({ calldata, index }: MintBatchTransactionProps) {
    let amount: string | undefined;
    let recipient: Address | undefined;

    try {
        // Decode calldata using viem's decodeFunctionData
        const decodedData = decodeFunctionData({
            abi: MINT_BATCH_TO_ABI,
            data: calldata,
        });

        // Extract `amount` and `recipient` from args
        const [decodedAmount, decodedRecipient] = decodedData.args as [bigint, Address];

        amount = decodedAmount.toString();
        recipient = decodedRecipient;

    } catch (error) {
        console.error('Error decoding calldata:', error);
    }

    return (
        <Box p={4} borderWidth={1} rounded="md" shadow="sm" mb={4}>
            {/* Title Section */}
            <Heading size="sm" mb={3}>
                Transaction {index + 1}: Mint Batch
            </Heading>

            {/* Content Section */}
            <Box display="flex" alignItems="center" gap={4}>
                {/* Image Section */}
                <Image
                    src="https://www.skatehive.app/loading.gif"
                    alt="Mint Batch"
                    width={64}
                    height={64}
                    style={{ objectFit: 'contain', borderRadius: '8px' }}
                />

                {/* Details Section */}
                <VStack align="start" gap={2}>
                    <Text>
                        <strong>Amount:</strong> {amount || 'N/A'}
                    </Text>
                    <Text>
                        <strong>Recipient:</strong>{' '}
                        {recipient ? (
                            <Link href={`/address/${recipient}`} passHref>
                                <FormattedAddress address={recipient} />
                            </Link>
                        ) : (
                            <span>Address not available</span>
                        )}
                    </Text>
                </VStack>
            </Box>
        </Box>
    );


}
