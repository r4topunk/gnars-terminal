'use client';

import { formatIpfsUrl, getZoraIpfsData } from '@/utils/ipfs';
import { getConfig } from '@/utils/wagmi';
import { Heading, Image, VStack } from '@chakra-ui/react';
import { createCollectorClient } from '@zoralabs/protocol-sdk';
import { default as NextImage } from 'next/image';
import { useEffect, useState } from 'react';
import { zora } from 'viem/chains';
import { getClient } from 'wagmi/actions';
import { Box } from '../ui/box';

export default function ZoraCard() {
  const wagmiConfig = getConfig();
  const client = getClient(wagmiConfig);
  const collectorClient = createCollectorClient({
    chainId: zora.id,
    // @todo fix this https://github.com/ourzora/zora-protocol/issues/466
    // @ts-ignore
    publicClient: client,
  });

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const { tokens } = await collectorClient.getTokensOfContract({
        tokenContract: '0xd2f21a72730259512f6edc60cfd182a79420dae6',
      });
      if (tokens.length > 0) {
        const tokenUri = tokens[tokens.length - 1].token.tokenURI;
        const data = await getZoraIpfsData(tokenUri);
        if (data && data.image) {
          setImageSrc(formatIpfsUrl(data.image));
        }
      }
    };

    fetchToken();
  }, []);

  return (
    <Box>
      <VStack align={'start'} gap={2}>
        <Heading as='h2'>Zora</Heading>
        {imageSrc && (
          <Image asChild rounded={'md'} w={'full'}>
            <NextImage
              width={1024}
              height={1024}
              src={imageSrc}
              alt='Auction token image'
            />
          </Image>
        )}
      </VStack>
    </Box>
  );
}
