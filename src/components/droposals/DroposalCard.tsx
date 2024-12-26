'use client';
import { useEffect, useState, useCallback } from 'react';
import {
    Box,
    VStack,
    Skeleton
} from '@chakra-ui/react';
import { fetchProposals } from '@/app/services/proposal';
import { Address, decodeFunctionData } from 'viem';
import droposalABI from '../proposal/transactions/utils/droposalABI';
import { DAO_ADDRESSES } from '@/utils/constants';
import CustomVideoPlayer from './CustomVideoPlayer';

const TARGET_ADDRESS = '0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c';

export default function DroposalCard() {
    const [lastProposal, setLastProposal] = useState<any | null>(null);

    const fetchAndDecodeProposals = useCallback(async () => {
        try {
            const fetchedProposals = await fetchProposals(
                DAO_ADDRESSES.token,
                'proposalNumber',
                'desc',
                1,
                { targets_contains: [TARGET_ADDRESS] },
                true
            );

            if (fetchedProposals.length > 0) {
                const proposal = fetchedProposals[0];
                const rawCalldatas = proposal.calldatas;
                const calldatasArray = typeof rawCalldatas === 'string'
                    ? rawCalldatas.split(':')
                    : rawCalldatas;

                const normalizedCalldatas = calldatasArray.map((calldata: string) =>
                    calldata === '0x' || calldata === '0' ? '0x' : calldata
                );

                const decodedCalldatas = normalizedCalldatas.map((calldata: string) => {
                    if (!calldata || calldata.length < 8) return null;

                    let finalCalldata = calldata;
                    if (!finalCalldata.startsWith('0x')) {
                        finalCalldata = '0x' + finalCalldata;
                    }

                    try {
                        const { args } = decodeFunctionData({
                            abi: droposalABI,
                            data: finalCalldata as `0x${string}`,
                        });

                        const [
                            name,
                            symbol,
                            editionSize,
                            royaltyBPS,
                            fundsRecipient,
                            defaultAdmin,
                            saleConfig,
                            description,
                            animationURI,
                            imageURI,
                        ] = args as [
                            string,
                            string,
                            bigint,
                            number,
                            Address,
                            Address,
                            unknown,
                            string,
                            string,
                            string
                        ];

                        return {
                            name,
                            symbol,
                            editionSize: editionSize.toString(),
                            royaltyBPS: (royaltyBPS / 100).toFixed(2),
                            fundsRecipient,
                            defaultAdmin,
                            saleConfig,
                            description,
                            imageURI: formatURI(imageURI),
                            animationURI: formatURI(animationURI),
                        };
                    } catch {
                        return null;
                    }
                });

                setLastProposal({
                    ...proposal,
                    decodedCalldatas: decodedCalldatas.filter((d) => d !== null),
                });
            }
        } catch (error) {
            console.error('Error fetching proposals:', error);
        }
    }, []);

    useEffect(() => {
        fetchAndDecodeProposals();
    }, [fetchAndDecodeProposals]);

    const formatURI = (uri: string): string => {
        if (!uri) return '';
        if (uri.startsWith('ipfs://')) {
            return `https://gateway.pinata.cloud/ipfs/${uri.slice(7)}`;
        }
        return uri;
    };

    if (!lastProposal) {
        return (
            <Box
                shadow="sm"
                w="full"
                padding={4}
                rounded="md"
                gap={4}
                _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            >
                <Skeleton height="400px" width="full" />
            </Box>
        );
    }

    return (
        <VStack
            shadow="sm"
            w="full"
            height="full"
            padding={4}
            rounded="md"
            gap={4}
            _dark={{ borderColor: 'yellow', borderWidth: 1 }}
            position="relative"
        >
            {lastProposal.decodedCalldatas.length > 0 ? (
                lastProposal.decodedCalldatas.map((data: any, idx: number) => (
                    <CustomVideoPlayer
                        key={idx}
                        src={data.animationURI || data.imageURI}
                        isVideo={!!data.animationURI}
                        title={data.name}
                        royalties={data.royaltyBPS}
                        proposer={lastProposal.proposer}
                        fundsRecipient={data.fundsRecipient}
                        description={data.description}
                        saleConfig={data.saleConfig}
                    />
                ))
            ) : (
                <Box
                    shadow="sm"
                    w="full"
                    padding={4}
                    rounded="md"
                    gap={4}
                    _dark={{ borderColor: 'yellow', borderWidth: 1 }}
                >
                    <Skeleton height="full" width="full" />
                </Box>
            )}
        </VStack>
    );
}
