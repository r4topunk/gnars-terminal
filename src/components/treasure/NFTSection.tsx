'use client';
import { useState } from 'react';
import { Box, Button, Grid, Heading, Image, Text } from '@chakra-ui/react';
import { NFT } from '@/hooks/useTreasure';

interface NFTSectionProps {
    nfts: NFT[];
}

const ITEMS_PER_PAGE = 20;

const NFTSection: React.FC<NFTSectionProps> = ({ nfts }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Sort NFTs in reverse order
    const sortedNfts = [...nfts].reverse();

    const paginatedNfts = sortedNfts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage * ITEMS_PER_PAGE < nfts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Box>
            <Heading as="h2" size="lg" mb={4}>NFTs</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
                {paginatedNfts.map((nft) => (
                    <Box key={nft.token.collection.openseaId} borderWidth="1px" borderRadius="lg" overflow="hidden">
                        {nft.token.medias && nft.token.medias.length > 0 && nft.token.medias[0].originalUrl ? (
                            <Image src={nft.token.medias[0].originalUrl} alt={nft.token.collection.name} />
                        ) : (
                            <Image src="/images/loading.gif" alt="Default" />
                        )}
                        <Box p="6">
                            <Text fontWeight="bold">{nft.token.collection.name}</Text>
                            <Text>Token ID: {nft.token.tokenId}</Text>
                        </Box>
                    </Box>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="space-between">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                <Button onClick={handleNextPage} disabled={currentPage * ITEMS_PER_PAGE >= nfts.length}>Next</Button>
            </Box>
        </Box>
    );
};

export default NFTSection;
