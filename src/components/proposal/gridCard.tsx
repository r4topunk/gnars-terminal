import { ProposalWithThumbnail } from '@/app/services/proposal';
import {
  AspectRatio,
  Box,
  Link as ChakraLink,
  Heading,
  HStack,
  Icon,
  Image,
  VStack,
} from '@chakra-ui/react';
import { default as NextImage } from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import ProposalStatus from '../proposal/status';
import { FormattedAddress } from '../utils/ethereum';
import { FaRegFileExcel } from 'react-icons/fa6';

interface ProposalGridCardProps {
  proposal: ProposalWithThumbnail;
}

const ProposalGridCard = memo(({ proposal }: ProposalGridCardProps) => {
  return (
    <Box
      borderWidth={1}
      rounded={'md'}
      p={4}
      bg={'bg.subtle'}
      display={'flex'}
      gap={2}
      alignItems={'stretch'}
      h={'full'}
    >
      <VStack gap={1} align={'start'} flex={1}>
        <Image mb={2} asChild w={'full'} rounded={'md'} aspectRatio={16 / 9}>
          <NextImage
            width={512}
            height={512}
            src={proposal.thumbnail || 'https://gnars.com/images/01-2.jpg'}
            alt={proposal.title}
          />
        </Image>

        <HStack gap={1}>
          <ProposalStatus proposal={proposal} />
          <FormattedAddress address={proposal.proposer} asLink={false} />
        </HStack>
        <ChakraLink color={{ _light: 'black', _dark: 'white' }} asChild>
          <Link href={`/dao/proposal/${proposal.proposalNumber}`}>
            <Heading as='h3' size='sm'>
              #{proposal.proposalNumber}: {proposal.title}
            </Heading>
          </Link>
        </ChakraLink>
      </VStack>
    </Box>
  );
});

ProposalGridCard.displayName = 'ProposalHorizontalCard';

export default ProposalGridCard;
