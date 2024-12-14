import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { decodeSenditTransaction, decodeUsdcTransaction } from './transactions/utils/decodeUsdcTransaction';
import EthTransferTransaction from './transactions/EthTransferTransaction';
import { Address } from 'viem';
import USDCTransaction from './transactions/USDCTransaction';
import MintBatchTransaction from './transactions/MintBatchTransaction';
import DroposalTransaction from './transactions/DroposalTransaction';
import NftTransferTransaction from './transactions/NFTTrasnfer';
import SenditTransaction from './transactions/SenditTransaction';


interface ProposalTransactionsContentProps {
  proposal: {
    targets: string[];
    values: string[];
    calldatas: string[] | string; // Allow both string[] and delimited string
  };
}

function TransactionItem({
  index,
  target,
  value,
  calldata,
}: {
  index: number;
  target: string;
  value: string;
  calldata: Address;
}) {
  // Normalize calldata to ensure consistency
  const normalizedCalldata =
    calldata === '0x' || calldata === ('0' as Address) ? '0x' : calldata;

  // Validate calldata before decoding
  const isCalldataValid = normalizedCalldata !== '0x' && normalizedCalldata.length >= 10;
  console.log(target)

  if (target === '0xba5b9b2d2d06a9021eb3190ea5fb0e02160839a4') {
    // Decode Sendit Token transaction
    const senditTransaction = isCalldataValid
      ? decodeSenditTransaction(normalizedCalldata)
      : null;

    if (senditTransaction) {
      const { to, value: decodedValue } = senditTransaction;

      // Format Sendit Token value (divide by 10^18)
      const formattedValue = (BigInt(decodedValue) / BigInt(10 ** 18)).toString();

      return (
        <SenditTransaction
          index={index}
          to={to}
          value={formattedValue}
        />
      );
    }
  }

  // Identify USDC transaction by decoding calldata (only if calldata is valid)
  const usdcTransaction = isCalldataValid
    ? decodeUsdcTransaction(normalizedCalldata)
    : null;

  if (usdcTransaction) {
    const { to, value: decodedValue } = usdcTransaction;

    // Format USDC value (divide by 10^6)
    const formattedValue = (BigInt(decodedValue) / BigInt(10 ** 6)).toString();

    return (
      <USDCTransaction
        index={index}
        to={to}
        value={formattedValue}
      />
    );
  }





  if (normalizedCalldata === '0x' && value !== '0') {
    return (
      <EthTransferTransaction
        toAddress={target as `0x${string}`}
        value={BigInt(value)}
      />
    );
  }

  // Handle Droposal transaction
  if (target === '0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c') {
    return <DroposalTransaction calldata={calldata} index={index} />;
  }

  // Handle transactions for target contract 0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17
  if (target === '0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17') {
    const functionSignature = normalizedCalldata.slice(0, 10); // Extract function selector

    if (functionSignature === '0x23b872dd') {
      // Handle NFT Transfer (ERC721 transferFrom)
      return (
        <NftTransferTransaction calldata={normalizedCalldata} index={index} />
      );
    }

    if (functionSignature === '0xd52fbd91') {
      // Handle MintBatch transaction
      return (
        <MintBatchTransaction calldata={normalizedCalldata} index={index} />
      );
    }
    // Fallback for unrecognized calldata
    return (
      <Box p={4} borderWidth={1} rounded='md' shadow='sm' mb={4}>
        <Heading size='sm' mb={2}>
          Transaction {index + 1}: Unrecognized Transaction
        </Heading>
        <Text>
          <strong>Target:</strong> {target}
        </Text>
        <Text>
          <strong>Calldata:</strong> {normalizedCalldata}
        </Text>
      </Box>
    );
  }

  // Fallback for unsupported transaction types
  return (
    <Box p={4} borderWidth={1} rounded='md' shadow='sm' mb={4}>
      <Heading size='sm' mb={2}>
        Transaction {index + 1}: {'Generic Transaction'}
      </Heading>
      <Text>
        <strong>Target:</strong> {target}
      </Text>
      <Text>
        <strong>Value:</strong> {value} wei
      </Text>
      <Text>
        <strong>Calldata:</strong> {normalizedCalldata}
      </Text>
    </Box>
  );
}

export default function ProposalTransactionsContent({
  proposal,
}: ProposalTransactionsContentProps) {
  const { targets, values, calldatas } = proposal;
  // Parse and normalize calldatas
  const parsedCalldatas =
    typeof calldatas === 'string' ? calldatas.split(':') : calldatas;
  const normalizedCalldatas = parsedCalldatas.map((calldata) =>
    calldata === '0x' || calldata === ('0' as Address) ? '0x' : calldata
  );

  if (
    !targets ||
    !values ||
    !parsedCalldatas ||
    targets.length === 0 ||
    targets.length !== values.length ||
    targets.length !== parsedCalldatas.length
  ) {
    console.error('Proposal data is inconsistent or missing!');
    return (
      <Box maxW='100%' minW='100%' p={2}>
        <Text>No transactions available for this proposal.</Text>
      </Box>
    );
  }

  return (
    <Box maxW='100%' minW='100%' p={2}>
      <VStack gap={2} align={'stretch'}>
        {targets.map((target, index) => (
          <TransactionItem
            key={index}
            index={index}
            target={target}
            value={values[index]}
            calldata={normalizedCalldatas[index] as Address}
          />
        ))}
      </VStack>
    </Box>
  );
}
