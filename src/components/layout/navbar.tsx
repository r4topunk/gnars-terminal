'use client';

import { ColorModeButton } from '@/components/ui/color-mode';
import { Heading, HStack, IconButton, Image, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import ConnectButton from './connect-button';
import Sparks from './sparks';
import AccountMenu from './account-menu';

export default function Navbar() {
  const [isLargerThanMd] = useMediaQuery(['(min-width: 768px)'], {
    fallback: [true],
  });

  return (
    <HStack
      w={'full'}
      justify={'space-between'}
      px={4}
      py={2}
      colorPalette={'yellow'}
    >
      <Link href={'/'}>
        <Stack direction='row' align='center' gap={2}>
          <Image
            src='https://gnars.com/images/logo.png'
            alt='gnars-terminal'
            boxSize={6}
          />
          <Heading size={{ base: 'xl', md: '2xl' }} as='h1' fontWeight={'bold'}>
            TermGnar
          </Heading>
        </Stack>
      </Link>
      {isLargerThanMd ? (
        <HStack>
          <Link href='https://github.com/r4topunk/gnars-terminal'>
            <IconButton variant={'ghost'} colorPalette={'black'} size={'sm'}>
              <BsGithub style={{ background: 'none' }} />
            </IconButton>
          </Link>
          <ColorModeButton variant={'ghost'} />
          <ConnectButton />
          <Sparks />
        </HStack>
      ) : (
        <AccountMenu />
      )}
    </HStack>
  );
}
