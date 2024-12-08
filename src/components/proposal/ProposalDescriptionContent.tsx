import { Box } from '@chakra-ui/react';
import Markdown from '@/components/proposal/markdown';

interface ProposalDescriptionContentProps {
    proposal: any;
}

export default function ProposalDescriptionContent({ proposal }: ProposalDescriptionContentProps) {
    return (
        <Box
            shadow={'sm'}
            w={'full'}
            padding={4}
            rounded={'md'}
            _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
        >
            <Markdown text={proposal.description} />
        </Box>
    );
}
