import { Box, VStack, Heading, Text } from '@chakra-ui/react';
import { decodeUsdcTransaction } from './transactions/utils/decodeUsdcTransaction';
import EthTransferTransaction from './transactions/EthTransferTransaction';
import { Address } from 'viem';
import { FormattedAddress } from '../utils/ethereum';
import USDCTransaction from './transactions/USDCTransaction';
import MintBatchTransaction from './transactions/MintBatchTransaction';


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


    // Handle mint batch transaction
    if (target === '0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17') {
        return <MintBatchTransaction calldata={normalizedCalldata} index={index} />;
    }
    // Handle hardcoded targets (e.g., Mint Batch)
    let transactionType = 'Generic Transfer'; // Default type
    if (target === "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17") {
        transactionType = 'Mint Batch';
    } else if (target === "0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c") {
        transactionType = 'Droposal';
    }


    // Fallback for unsupported transaction types
    return (
        <Box p={4} borderWidth={1} rounded="md" shadow="sm" mb={4}>
            <Heading size="sm" mb={2}>

                Transaction {index + 1}: {transactionType}

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

export default function ProposalTransactionsContent({ proposal }: ProposalTransactionsContentProps) {
    const { targets, values, calldatas } = proposal;

    // Parse `calldatas`: split if it’s a string, or use it directly if it’s an array
    const parsedCalldatas = typeof calldatas === 'string' ? calldatas.split(':') : calldatas;


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
            <Box
                shadow="sm"
                maxW="100%"
                minW="100%"
                p={4}
                rounded="md"
                _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            >
                <Text>No transactions available for this proposal.</Text>
            </Box>
        );
    }

    return (
        <Box
            shadow="sm"
            maxW="100%"
            minW="100%"
            p={4}
            rounded="md"
            _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            divideY="2px"
            divideColor="gray.300"
        >
            <Heading size="md" mb={4}>
                Transactions
            </Heading>
            {targets.map((target, index) => (
                <TransactionItem
                    key={index}
                    index={index}
                    target={target}
                    value={values[index]}
                    calldata={parsedCalldatas[index] as Address} // Ensure calldata is of type `0x${string}`
                />
            ))}
        </Box>
    );
}
