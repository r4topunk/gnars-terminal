import AccountCard from '@/components/cards/account';
import AuctionCard from '@/components/cards/auction';
import GovernorCard from '@/components/cards/governor';
import { ColorModeButton } from '@/components/ui/color-mode';
import { Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
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
      <AccountCard />
      <AuctionCard />
      <GovernorCard />
    </VStack>
  );
}

export default App;
