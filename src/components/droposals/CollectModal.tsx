import { useMemo, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogRoot,
} from "@/components/ui/dialog";
import { Box, Flex, Text, VStack, Image, DialogFooter, Heading, Textarea } from '@chakra-ui/react';
import ReactFlow, { Background, Controls, Node, Edge, Handle, Position } from 'react-flow-renderer';
import CustomVideoPlayer from './CustomVideoPlayer';
import { FormattedAddress } from '../utils/ethereum';
import { useAccount } from 'wagmi';


// TODO: Learn how to query the NFT contract from the proposal data, 
// there is no NFT contract address at the moment of the proposal transaction creation, so we need to seek a relationship between the proposal and the NFT contract that was created after
const droposalContractDictionary: { [key: number]: string } = {
    0: '0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c',
    1: '0xd2f21a72730259512f6edc60cfd182a79420dae6',
};

const CustomNode = ({ data }: { data: { label: string; imageUrl: string } }) => {
    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555', top: '50%' }} // Center the line vertically
            />
            <Image
                src={data.imageUrl}
                alt={data.label}
                style={{ width: '30px', height: '30px', display: 'block', margin: '0 auto' }} // Center the image
            />
            <div style={{ marginTop: '5px' }}> {/* Add margin to separate the label from the image */}
                {data.label.startsWith('0x') ? (
                    <FormattedAddress address={data.label} />
                ) : (
                    data.label
                )}
            </div>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555', top: '50%' }} // Center the line vertically
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
    const percentageSplit = parseInt(royalties)
    const [numMints, setNumMints] = useState(1); // Add state for number of mints
    const userAccount = useAccount();
    const nftContract = droposalContractDictionary[index] || 'Unknown Contract'; // Assign NFT contract based on index

    const nodes: Node[] = useMemo(() => [
        {
            id: 'user',
            data: { label: 'You', imageUrl: '/images/ethereum.png' },
            position: { x: 50, y: 75 }, // Adjusted position
            type: 'custom',
        },
        {
            id: 'fundRecipient',
            data: { label: fundsRecipient, imageUrl: '/images/gnars.webp' }, // Address
            position: { x: 300, y: 25 }, // Adjusted position
            type: 'custom',
        },
        {
            id: 'proposer',
            data: { label: proposer, imageUrl: '/images/ethereum.png' }, // Address
            position: { x: 300, y: 125 }, // Adjusted position
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
                            <Text mt={4}>NFT Contract: {nftContract}</Text> {/* Display NFT contract */}
                            <Text mt={4}>
                                Number of Mints:
                                <input
                                    type="number"
                                    value={numMints}
                                    onChange={(e) => setNumMints(Number(e.target.value))}
                                    min="1"
                                    style={{ marginLeft: '10px', width: '60px' }}
                                />
                            </Text>
                        </VStack>
                        <Box position="relative" p={5} w={{ base: '100%', md: '50%' }} h="200px" bg="gray.100" borderRadius="md"> {/* Adjusted height */}
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                fitView
                                nodeTypes={{ custom: CustomNode }}
                            >
                                <Background gap={16} size={1} color="#888" />
                            </ReactFlow>
                        </Box>
                        {/* <Heading as="h3" size="md" mt={4}>
                            Collect {title}
                        </Heading>
                        <Textarea placeholder="Enter your message here" h={200} /> */}


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
