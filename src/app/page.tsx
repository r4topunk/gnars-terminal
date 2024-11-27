import AccountCard from '@/components/cards/account';
import AuctionCard from '@/components/cards/auction';
import GovernorCard from '@/components/cards/governor';
import MarkdownCard from '@/components/cards/markdown';
import MarkdownEditor from '@/components/markdown/editor';
import { ColorModeButton } from '@/components/ui/color-mode';
import {
  ClientOnly,
  Heading,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { Editor } from '@toast-ui/react-editor';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

function App() {
  return (
    <VStack gap={4} align={'start'}>
      <HStack w={'full'} justify={'space-between'}>
        <Heading size={'4xl'} as='h1'>
          Gnars Terminal
        </Heading>
        <HStack>
          <Link href='https://github.com/r4topunk/gnars-terminal'>
            <IconButton variant={'outline'} colorPalette={'black'} size={'sm'}>
              <BsGithub style={{ background: 'none' }} />
            </IconButton>
          </Link>
          <ColorModeButton variant={'outline'} />
        </HStack>
      </HStack>
      <MarkdownCard />
      <AccountCard />
      <AuctionCard />
      <GovernorCard />
    </VStack>
  );
}

export default App;
