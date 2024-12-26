import { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
    DialogTitle,
} from "@/components/ui/dialog";
import { Box, Flex, Text, VStack, Image, DialogFooter } from '@chakra-ui/react';
import ReactFlow, { Background, Controls, Node, Edge, Handle, Position } from 'react-flow-renderer';
import CustomVideoPlayer from './CustomVideoPlayer';
import { FormattedAddress } from '../utils/ethereum';


// TODO: Learn how to query the NFT contract from the proposal data, 
// there is no NFT contract address at the moment of the proposal transaction creation, so we need to seek a relationship between the proposal and the NFT contract that was created after
const droposalContractDictionary = {
    0: '0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c',
    1: '0xd2f21a72730259512f6edc60cfd182a79420dae6',
};

const CustomNode = ({ data }: { data: { label: string; imageUrl: string } }) => {
    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555' }}
            />
            <img
                src={data.imageUrl}
                alt={data.label}
                style={{ width: '60px', height: '60px', borderRadius: '0%' }}
            />
            <div>
                {data.label.startsWith('0x') ? (
                    <FormattedAddress address={data.label} />
                ) : (
                    data.label
                )}
            </div>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
            />
        </div>
    );
};

const CollectModal = ({
    isOpen,
    onClose,
    title,
    royalties,
    proposer,
    fundsRecipient,
    description,
    saleConfig,
    mediaSrc,
    isVideo,
    index, // Accept the index prop
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    royalties: string;
    proposer: string;
    fundsRecipient: string;
    description: string;
    saleConfig: any;
    mediaSrc: string;
    isVideo: boolean;
    index: number; // Define the index prop type
}) => {
    console.log(index)
    const percentageSplit = parseInt(royalties)

    const nodes: Node[] = useMemo(() => [
        {
            id: 'user',
            data: { label: 'User', imageUrl: '/images/ethereum.png' },
            position: { x: 50, y: 150 },
            type: 'custom',
        },
        {
            id: 'fundRecipient',
            data: { label: fundsRecipient, imageUrl: '/images/gnars.webp' }, // Address
            position: { x: 300, y: 50 },
            type: 'custom',
        },
        {
            id: 'proposer',
            data: { label: proposer, imageUrl: '/images/ethereum.png' }, // Address
            position: { x: 300, y: 250 },
            type: 'custom',
        },
    ], [fundsRecipient, proposer]);


    const edges: Edge[] = useMemo(() => [
        {
            id: 'user-to-recipient',
            source: 'user',
            target: 'fundRecipient',
            type: 'smoothstep',
            animated: true,
            label: `${percentageSplit}%`, // Add percentage label
            style: { stroke: '#000', strokeWidth: 3 },
        },
        {
            id: 'user-to-proposer',
            source: 'user',
            target: 'proposer',
            type: 'smoothstep',
            animated: true,
            label: `${100 - percentageSplit}%`, // Add remaining percentage label
            style: { stroke: '#000', strokeWidth: 3 },
        },
    ], [percentageSplit]);
    console.log(saleConfig)
    console.log(`Proposal index: ${index}`); // Use the index as needed
    return (
        <DialogRoot open={isOpen} onOpenChange={onClose} size="cover" placement="center" motionPreset="slide-in-bottom">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Collect {title}</DialogTitle>
                    <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                    <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                        <VStack align="start" w={{ base: '100%', md: '50%' }}>
                            {isVideo ? (
                                <CustomVideoPlayer
                                    src={mediaSrc}
                                    isVideo={isVideo}
                                    title={title}
                                    royalties={royalties}
                                    proposer={proposer}
                                    fundsRecipient={fundsRecipient}
                                    description={description}
                                    saleConfig={saleConfig}
                                    index={index} // Pass the index here
                                />
                            ) : (
                                <Image src={mediaSrc} alt={title} width="100%" />
                            )}
                            <Text mt={4}>Description: {description}</Text>
                            <Text mt={4}>NFT Contract: </Text>
                        </VStack>
                        <Box position="relative" p={5} w={{ base: '100%', md: '50%' }} h="400px" bg="gray.100" borderRadius="md">
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                fitView
                                nodeTypes={{ custom: CustomNode }}
                            >
                                <Background gap={16} size={1} color="#888" />
                                <Controls />
                            </ReactFlow>
                        </Box>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Flex justify="flex-end" mt={4}>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Confirm</Button>
                    </Flex>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

export default CollectModal;
