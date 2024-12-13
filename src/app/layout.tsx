import { getConfig } from '@/utils/wagmi';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { type ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';
import { Providers } from '@/components/layout/providers';
import { Box, Container } from '@chakra-ui/react';
import Navbar from '@/components/layout/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gnars Terminal',
  description: 'Gnars Dao Essentials Tools Backup',
  openGraph: {
    images: [
      {
        url: '/images/shredquarters.png',
        width: 800,
        height: 600,
        alt: 'Gnars Terminal',
      },
    ],
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie')
  );
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} style={{ minHeight: '100vh' }}>
        <Providers initialState={initialState}>
          <Navbar />
          <Box
            minH={'100vh'}
            bg={'bg.panel'}
            colorPalette={'yellow'}
            color={{ base: 'black', _dark: 'white' }}
            paddingBlock={{ base: 2, md: 4 }}
          >
            <Container maxW={'2xl'}>{props.children}</Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
