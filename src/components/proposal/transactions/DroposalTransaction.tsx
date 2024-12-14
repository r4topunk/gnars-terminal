import {
  Box,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Address, decodeFunctionData } from 'viem';
import droposalABI from './utils/droposalABI';
import { FormattedAddress } from '@/components/utils/ethereum';
import Link from 'next/link';

interface DroposalTransactionProps {
  calldata: `0x${string}`; // Properly typed calldata
  index: number;
}

export default function DroposalTransaction({
  calldata,
  index,
}: DroposalTransactionProps) {
  let decodedData: {
    name: string;
    symbol: string;
    editionSize: string;
    royaltyBPS: string;
    fundsRecipient: Address;
    defaultAdmin: Address;
    description: string;
    imageURI: string;
    animationURI: string;
  } | null = null;

  try {
    // Decode calldata using viem's decodeFunctionData
    const { args } = decodeFunctionData({
      abi: droposalABI,
      data: calldata,
    });

    // Map decoded arguments to named variables
    const [
      name,
      symbol,
      editionSize,
      royaltyBPS,
      fundsRecipient,
      defaultAdmin,
      ,
      description,
      animationURI,
      imageURI,
    ] = args as [
      string,
      string,
      bigint,
      number,
      Address,
      Address,
      unknown,
      string,
      string,
      string,
    ];

    decodedData = {
      name,
      symbol,
      editionSize: editionSize.toString(),
      royaltyBPS: (royaltyBPS / 100).toFixed(2), // Convert BPS to percentage
      fundsRecipient,
      defaultAdmin,
      description,
      imageURI: formatURI(imageURI),
      animationURI: formatURI(animationURI),
    };
  } catch (error) {
    console.error('Error decoding calldata for DroposalTransaction:', error);
    console.error('Calldata:', calldata); // Log the raw calldata for debugging
    decodedData = null;
  }

  // Helper function to format IPFS URIs
  function formatURI(uri: string): string {
    if (uri.startsWith('ipfs://')) {
      return `https://gateway.pinata.cloud/ipfs/${uri.slice(7)}`;
    }
    return uri;
  }

  if (!decodedData) {
    return (
      <Box
        borderWidth='1px'
        borderRadius='md'
        p={4}
        _dark={{ bg: 'bg.emphasized', borderColor: 'yellow.500' }}
      >
        <Heading size='sm' mb={2}>
          Transaction {index + 1}: Droposal Transaction
        </Heading>
        <Text color='red.500'>
          Failed to decode transaction data. Unsupported signature.
        </Text>
        <Text fontSize='sm' mt={2}>
          <strong>Raw Calldata:</strong> {calldata}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      borderWidth='1px'
      borderRadius='md'
      p={4}
      _dark={{ bg: 'bg.emphasized', borderColor: 'yellow.500' }}
    >
      <Heading size='sm' mb={4}>
        Transaction {index + 1}: Droposal Transaction
      </Heading>
      <VStack align='start' gap={3}>
        <Text>
          <strong>Name:</strong> {decodedData.name} ({decodedData.symbol})
        </Text>
        <Text>
          <strong>Edition Size:</strong> {decodedData.editionSize}
        </Text>
        <Text>
          <strong>Royalty:</strong> {decodedData.royaltyBPS}%
        </Text>
        <Text>
          <strong>Funds Recipient:</strong>{' '}
          <FormattedAddress address={decodedData.fundsRecipient} />
        </Text>
        <Text>
          <strong>Default Admin:</strong>{' '}
        </Text>
        <FormattedAddress address={decodedData.defaultAdmin} />
        <Text>
          <strong>Description:</strong> {decodedData.description || 'N/A'}
        </Text>
        <Text>
          <strong>Image:</strong>{' '}
          {decodedData.imageURI ? (
            <img
              src={decodedData.imageURI}
              alt='Droposal Image'
              style={{ maxWidth: '100%' }}
            />
          ) : (
            'N/A'
          )}
        </Text>
        <Text>
          <strong>Animation:</strong>{' '}
          {decodedData.animationURI ? (
            <video
              src={decodedData.animationURI}
              className='w-full rounded-md'
              controls
            />
          ) : (
            'N/A'
          )}
        </Text>
      </VStack>
    </Box>
  );
}
