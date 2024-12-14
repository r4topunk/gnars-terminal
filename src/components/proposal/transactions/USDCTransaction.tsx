import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react';
import { FormattedAddress } from '@/components/utils/ethereum';

interface USDCTransactionProps {
  index: number;
  to: string;
  value: string;
}

const USDCTransaction: React.FC<USDCTransactionProps> = ({
  index,
  to,
  value,
}) => {
  return (
    <Box
      borderWidth='1px'
      borderRadius='md'
      p={4}
      _dark={{ bg: 'bg.emphasized', borderColor: 'yellow.500' }}
    >
      <Heading size='sm' mb={2}>
        Transaction {index + 1}: USDC Transfer
      </Heading>
      <HStack gap={2} align='center' mt={2}>
        <Text display='flex' alignItems='center'>
          <strong>To:</strong>
        </Text>
        <FormattedAddress address={to} />
      </HStack>
      <HStack gap={2} align='center' mt={2}>
        <Text>
          <strong>Value:</strong> {value}
        </Text>
        <Image
          src='/images/usd-coin-usdc-logo.png'
          alt='USDC Logo'
          boxSize='20px'
          objectFit='contain'
        />
        USDC
      </HStack>
    </Box>
  );
};

export default USDCTransaction;
