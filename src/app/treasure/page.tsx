'use client';
import { useState } from 'react';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import useTreasure, { Token as TreasureToken } from "../../hooks/useTreasure";
import styles from '@/components/treasure/TreasurePage.module.css';
import NFTSection from '@/components/treasure/NFTSection';
import TokensSection from '../../components/treasure/TokensSection';
import { FormattedAddress } from '@/components/utils/ethereum';
import { formatBalance } from '@/utils/helpers';

const ITEMS_PER_PAGE = 20;

const TreasurePage = () => {
    const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY!;
    const { tokens, totalBalance, totalNetWorth, isLoading, error, nfts } = useTreasure(treasuryAddress);
    const [hideLowBalance, setHideLowBalance] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const sortedTokens = tokens.sort((a, b) => b.token.balanceUSD - a.token.balanceUSD);
    const filteredTokens = hideLowBalance ? sortedTokens.filter(token => token.token.balanceUSD >= 10) : sortedTokens;

    const sortedNfts = nfts.sort((a, b) => {
        const aHasImage = a.token.medias && a.token.medias.length > 0 && a.token.medias[0].originalUrl;
        const bHasImage = b.token.medias && b.token.medias.length > 0 && b.token.medias[0].originalUrl;
        return Number(bHasImage) - Number(aHasImage);
    });

    const paginatedNfts = sortedNfts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage * ITEMS_PER_PAGE < sortedNfts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    // log nfts object
    console.log(nfts);

    return (
        <Box className={styles.container}>
            {/* Header Section */}
            <Box className={styles.netWorthCard} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" textAlign="center">
                <Flex direction={["column", "row"]} justify="space-between" align="center" wrap="wrap">
                    <Flex className={styles.profile} align="center" mb={[4, 0]}>
                        <Image src="/images/ethereum.png" alt="Treasury Avatar" className={styles.avatar} />
                        <FormattedAddress address={treasuryAddress} />
                    </Flex>
                    <Box mb={[4, 0]} textAlign={["center", "left"]} display={["none", "block"]}>
                        <Text fontSize="xl" fontWeight="bold">Net Worth</Text>
                        <Heading as="h2" size="xl">${formatBalance(totalNetWorth)}</Heading>
                    </Box>
                    <Box textAlign={["center", "right"]}>
                        <Text fontSize="xl" fontWeight="bold">Total Balance</Text>
                        <Heading as="h2" size="xl">${formatBalance(totalBalance)}</Heading>
                    </Box>
                </Flex>
            </Box>
            {/* Wallet Section */}
            <TokensSection
                tokens={filteredTokens as TreasureToken[]}
                totalBalance={totalBalance}
                hideLowBalance={hideLowBalance}
                setHideLowBalance={setHideLowBalance}
            />
            {/* NFTs Section */}
            <NFTSection nfts={nfts} />
        </Box>
    );
};

export default TreasurePage;
