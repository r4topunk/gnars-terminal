import { Box } from '@chakra-ui/react';

interface ProposalTransactionsContentProps {
    proposal: any; // Replace `any` with the actual proposal type if you have a defined interface
}

export default function ProposalTransactionsContent({ proposal }: ProposalTransactionsContentProps) {
    return (
        <Box
            shadow={'sm'}
            maxW={'100%'}
            minW={'100%'}
            padding={4}
            rounded={'md'}
            _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
            flexWrap={'wrap'}
        >
            {proposal.calldatas}
        </Box>
    );
}
