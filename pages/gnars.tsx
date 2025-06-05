import { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Link,
  Image,
  useColorModeValue,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import GnarCard from '@/components/GnarCard';
import ProposalCard from '@/components/ProposalCard';
import AuctionBidButton from '@/components/AuctionBidButton';
import { useGnars } from '@/hooks/useGnars';
import { useAuctions } from '@/hooks/useAuctions';
import { useProposals } from '@/hooks/useProposals';

const MotionBox = motion(Box);

function Pattern() {
  const color = useColorModeValue('#f0f0f0', '#1a1a1a');
  return (
    <Box
      position='absolute'
      inset={0}
      aria-hidden='true'
      zIndex={-1}
      overflow='hidden'
    >
      <svg width='100%' height='100%'>
        <defs>
          <pattern
            id='grid'
            width='40'
            height='40'
            patternUnits='userSpaceOnUse'
          >
            <rect width='40' height='40' fill='none' stroke={color} strokeWidth='1' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#grid)' />
      </svg>
    </Box>
  );
}

export default function GnarsPage() {
  const { mintVideo } = useGnars();
  const { current, refresh } = useAuctions();
  const proposals = useProposals(6);
  const toast = useToast();

  useEffect(() => {
    if (!current) return;
    const end = Number(current.endTime) * 1000 - Date.now();
    if (end > 0) {
      const t = setTimeout(refresh, end + 1000);
      return () => clearTimeout(t);
    }
  }, [current, refresh]);

  const onMint = async () => {
    try {
      const tx = await mintVideo();
      toast({ title: 'Mint submitted', description: tx, status: 'success' });
    } catch (e: any) {
      toast({ title: 'Mint failed', description: e.message, status: 'error' });
    }
  };

  const cols = useBreakpointValue({ base: 1, md: 2 });

  return (
    <Layout title='Gnars DAO Portal'>
      <Box position='relative'>
        <Hero
          title='Gnars DAO — Fueling Action Sports With NFTs'
          subtitle='A new community where skaters, artists and builders fund epic adventures together.'
        />
        <Pattern />
      </Box>

      <MotionBox
        as={Container}
        maxW='container.lg'
        py={16}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SectionTitle>What Is Gnars?</SectionTitle>
        <SimpleGrid columns={cols} spacing={8} mt={8} alignItems='center'>
          <Text fontSize='lg' lineHeight='tall'>
            {`Gnars DAO is an experiment by the Nouns community to empower action
            sports through decentralized governance. Each Gnar is an NFT that
            grants membership and the ability to vote on proposals that support
            athletes, events and creative projects. By collecting and trading
            Gnars, you’re helping fund the progression of skateboarding and other
            extreme sports around the globe.`}
          </Text>
          <Image
            src='/images/bestbail.gif'
            alt='Skateboarding'
            rounded='md'
            shadow='lg'
          />
        </SimpleGrid>
      </MotionBox>

      <MotionBox
        as={Container}
        maxW='container.lg'
        py={16}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SectionTitle>Watch & Mint The ‘Droposal’</SectionTitle>
        <Box mt={8} position='relative' paddingTop='56.25%' rounded='lg' shadow='lg' overflow='hidden'>
          <iframe
            src='https://www.youtube.com/embed/dQw4w9WgXcQ'
            title='Gnars Droposal'
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Box>
        <Button mt={4} onClick={onMint}>Mint This Video</Button>
      </MotionBox>

      <MotionBox
        as={Container}
        maxW='container.lg'
        py={16}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SectionTitle>Live Auction</SectionTitle>
        {current && (
          <VStack mt={8} spacing={4} align='stretch'>
            <GnarCard gnar={current.token} />
            <HStack justify='space-between'>
              <Text fontWeight='bold'>
                Highest Bid: {current.highestBidAmount}
              </Text>
              <Text>
                Ends in: {Math.max(0, Number(current.endTime) * 1000 - Date.now()) / 1000 | 0}s
              </Text>
            </HStack>
            <AuctionBidButton auction={current} onBid={refresh} />
          </VStack>
        )}
      </MotionBox>

      <MotionBox
        as={Container}
        maxW='container.lg'
        py={16}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SectionTitle>Recent Proposals</SectionTitle>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={8}>
          {proposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </SimpleGrid>
        <HStack justify='end' mt={4}>
          <Link as={NextLink} href='/proposals'>View All</Link>
        </HStack>
      </MotionBox>

      <MotionBox
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={16}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Container maxW='container.lg'>
          <VStack spacing={4} textAlign='center'>
            <Heading size='lg'>Join the Session</Heading>
            <HStack spacing={4}>
              <Link href='https://discord.gg/gnars' aria-label='Discord'>
                <Image src='/images/discord.svg' alt='Discord' boxSize={6} />
              </Link>
              <Link href='https://x.com/gnars_dao' aria-label='X'>
                <Image src='/images/x.svg' alt='X' boxSize={6} />
              </Link>
            </HStack>
            <Button as={NextLink} href='#auction'>Get A Gnar</Button>
          </VStack>
        </Container>
      </MotionBox>
    </Layout>
  );
}
