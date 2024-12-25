'use client';

import { ColorModeButton } from '@/components/ui/color-mode';
import {
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuArchive, LuHome } from 'react-icons/lu';
import { MdOutlineHowToVote } from 'react-icons/md';
import AccountMenu from './account-menu';
import ConnectButton from './connect-button';
import Sparks from './sparks';

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
      position='relative'
    >
      <Stack
        direction='row'
        align='center'
        gap={3}
        fontSize={'md'}
        fontWeight={'medium'}
      >
        <Image asChild boxSize={6} mr={2}>
          <NextImage
            src='https://gnars.com/images/logo.png'
            alt='gnars-terminal'
            width={80}
            height={80}
            objectFit='contain'
          />
        </Image>
        <NavbarLinks isLargerThanMd={isLargerThanMd} />
      </Stack>
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

function NavbarLinks({ isLargerThanMd }: { isLargerThanMd: boolean }) {
  return isLargerThanMd ? (
    <>
      <Link
        data-state='open'
        _open={{
          animation: 'fade-in 300ms ease-out',
        }}
        asChild
        gap={'0.5'}
      >
        <NextLink href='/' style={{ width: '100%' }}>
          <LuHome />
          HOME
        </NextLink>
      </Link>
      <Link
        data-state='open'
        _open={{
          animation: 'fade-in 600ms ease-out',
        }}
        _hidden={{
          animation: 'fade-out 600ms ease-in',
        }}
        asChild
        gap={'0.5'}
      >
        <NextLink href='/dao' style={{ width: '100%' }}>
          <MdOutlineHowToVote />
          DAO
        </NextLink>
      </Link>
      <Link
        data-state='open'
        _open={{
          animation: 'fade-in 900ms ease-out',
        }}
        _hidden={{
          animation: 'fade-out 300ms ease-in',
        }}
        gap={'0.5'}
        asChild
      >
        <NextLink href='/propdates' style={{ width: '100%' }}>
          <LuArchive />
          PROPDATES
        </NextLink>
      </Link>
      <Link
        data-state='open'
        _open={{
          animation: 'fade-in 900ms ease-out',
        }}
        _hidden={{
          animation: 'fade-out 300ms ease-in',
        }}
        gap={'0.5'}
        asChild
      >
        <NextLink href='/about' style={{ width: '100%' }}>
          <IoDocumentTextOutline />
          ABOUT
        </NextLink>
      </Link>
    </>
  ) : null;
}
