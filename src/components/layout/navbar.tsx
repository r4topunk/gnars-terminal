'use client';

import { ColorModeButton } from '@/components/ui/color-mode';
import {
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  Box,
  VStack,
  useMediaQuery,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { useState } from 'react';
import ConnectButton from './connect-button';
import Sparks from './sparks';
import AccountMenu from './account-menu';
import { Button } from '../ui/button';
import { FcAbout } from 'react-icons/fc';
import { LuHome } from 'react-icons/lu';
import { MdOutlineHowToVote } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';

export default function Navbar() {
  const [isLargerThanMd] = useMediaQuery(['(min-width: 768px)'], {
    fallback: [true],
  });
  const [showMenu, setShowMenu] = useState(false);

  return (
    <HStack
      w={'full'}
      justify={'space-between'}
      px={4}
      py={2}
      colorPalette={'yellow'}
      position='relative'
    >
      <Box
        position='relative'
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <NextLink href={'/'}>
          <Stack direction='row' align='center' gap={2}>
            <Image
              src='https://gnars.com/images/logo.png'
              alt='gnars-terminal'
              boxSize={6}
            />
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              as='h1'
              fontWeight={'bold'}
            >
              TermGnar
            </Heading>
          </Stack>
        </NextLink>

        {showMenu && (
          <VStack
            position='absolute'
            top='100%'
            left='0'
            pt={2}
            gap={2}
            zIndex={10}
            colorPalette={'black'}
          >
            <NextLink href='/' style={{ width: '100%' }}>
              <Link
                data-state='open'
                _open={{
                  animation: 'fade-in 300ms ease-out',
                }}
                fontSize={'xl'}
                fontWeight={'medium'}
              >
                <LuHome />
                Home
              </Link>
            </NextLink>
            <NextLink href='/dao' style={{ width: '100%' }}>
              <Link
                fontSize={'xl'}
                fontWeight={'medium'}
                data-state='open'
                _open={{
                  animation: 'fade-in 600ms ease-out',
                }}
                _hidden={{
                  animation: 'fade-out 600ms ease-in',
                }}
              >
                <MdOutlineHowToVote />
                DAO
              </Link>
            </NextLink>
            <NextLink href='/about' style={{ width: '100%' }}>
              <Link
                fontSize={'xl'}
                fontWeight={'medium'}
                data-state='open'
                _open={{
                  animation: 'fade-in 900ms ease-out',
                }}
                _hidden={{
                  animation: 'fade-out 300ms ease-in',
                }}
              >
                <IoDocumentTextOutline />
                About
              </Link>
            </NextLink>
          </VStack>
        )}
      </Box>

      {isLargerThanMd ? (
        <HStack>
          <NextLink href='https://github.com/r4topunk/gnars-terminal'>
            <IconButton variant={'ghost'} colorPalette={'black'} size={'sm'}>
              <BsGithub style={{ background: 'none' }} />
            </IconButton>
          </NextLink>
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
