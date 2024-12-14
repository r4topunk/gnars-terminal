import { FormattedAddress } from '@/components/utils/ethereum';
import { Box, Text, Heading } from '@chakra-ui/react';

export default function NftTransferTransaction({
  calldata,
  index,
}: {
  calldata: string;
  index: number;
}) {
  const decodedData = decodeTransferFromCalldata(calldata);

  return (
    <Box
      borderWidth='1px'
      borderRadius='md'
      p={4}
      _dark={{ bg: 'bg.emphasized', borderColor: 'yellow.500' }}
    >
      <Heading size='sm' mb={2}>
        Transaction {index + 1}: NFT Transfer
      </Heading>
      <Text>
        <strong>From:</strong> {decodedData.from}
      </Text>
      <Text display='flex' alignItems='center'>
        <strong>To:</strong>
        <FormattedAddress address={decodedData.to} />
      </Text>
      <Text>
        <strong>Token ID:</strong> {decodedData.tokenId}
      </Text>
    </Box>
  );
}

function decodeTransferFromCalldata(calldata: string) {
  // Remove function selector (first 10 characters)
  const data = calldata.slice(10);

  // Decode the parameters
  const from = `0x${data.slice(24, 64)}`;
  const to = `0x${data.slice(88, 128)}`;
  const tokenId = BigInt(`0x${data.slice(128)}`).toString();

  return { from, to, tokenId };
}
