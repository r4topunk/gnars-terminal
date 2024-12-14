import { Box } from '@chakra-ui/react';
import Markdown from '@/components/proposal/markdown';

interface ProposalDescriptionContentProps {
  proposal: any;
}

export default function ProposalDescriptionContent({
  proposal,
}: ProposalDescriptionContentProps) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      data-state='open'
      _open={{
        animation: 'fade-in 600ms ease-out',
      }}
      px={2}
    >
      <Markdown text={proposal.description} />
    </Box>
  );
}
