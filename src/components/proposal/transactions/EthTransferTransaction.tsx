import { FormattedAddress } from '@/components/utils/ethereum';
import { Box, Text, Heading, VStack, Code } from '@chakra-ui/react';
import { formatEther } from 'viem';

interface EthTransferTransactionProps {
  toAddress: `0x${string}`;
  value: BigInt | { hex: string } | undefined; // Support BigInt and hex
}

const EthTransferTransaction: React.FC<EthTransferTransactionProps> = ({
  toAddress,
  value,
}) => {
  let bigIntValue: bigint;

  try {
    if (value === undefined) {
      throw new Error('Value is undefined');
    }
    // Parse the `value` to BigInt
    if (typeof value === 'bigint') {
      bigIntValue = value;
    } else if (typeof value === 'object' && 'hex' in value) {
      bigIntValue = BigInt(value.hex);
    } else {
      throw new Error('Value is not a valid BigInt or hex object');
    }
  } catch (error) {
    console.error('Error parsing value:', error);
    bigIntValue = 0n; // Default to 0 on error
  }

  // Format the value to Ether
  const formattedValue = formatEther(bigIntValue);

  return (
    <Box
      borderWidth='1px'
      borderRadius='md'
      p={4}
      _dark={{ bg: 'bg.emphasized', borderColor: 'yellow.500' }}
    >
      <Heading size='lg' mb={2}>
        Ethereum Transfer
      </Heading>
      <VStack gap={1} align='start'>
        <Text display='flex' alignItems='center'>
          <Text mr={2} fontWeight={'medium'}>
            Value:
          </Text>
          <Code size={'sm'} variant={'surface'}>
            {formattedValue} ETH
          </Code>
        </Text>
        <Text display='flex' alignItems='center'>
          <Text mr={2} fontWeight={'medium'}>
            To:
          </Text>
          <FormattedAddress address={toAddress} />
        </Text>
      </VStack>
    </Box>
  );
};

export default EthTransferTransaction;
