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
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            />
            <div>{data.label}</div>
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
}) => {
    // Memoize the nodes
    const nodes: Node[] = useMemo(() => [
        {
            id: 'user',
            data: { label: 'User', imageUrl: '/images/ethereum.png' },
            position: { x: 50, y: 150 },
            type: 'custom',
        },
        {
            id: 'fundRecipient',
            data: { label: fundsRecipient, imageUrl: '/images/ethereum.png' },
            position: { x: 300, y: 50 },
            type: 'custom',
        },
        {
            id: 'proposer',
            data: { label: proposer, imageUrl: '/images/ethereum.png' },
            position: { x: 300, y: 250 },
            type: 'custom',
        },
    ], [fundsRecipient, proposer]);

    // Memoize the edges
    const edges: Edge[] = useMemo(() => [
        { id: 'user-to-recipient', source: 'user', target: 'fundRecipient', type: 'smoothstep', animated: true },
        { id: 'user-to-proposer', source: 'user', target: 'proposer', type: 'smoothstep', animated: true },
    ], []);

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
                                <video src={mediaSrc} style={{ width: '100%' }} controls />
                            ) : (
                                <Image src={mediaSrc} alt={title} width="100%" />
                            )}
                            <Text mt={4}>Description: {description}</Text>
                            <Text>Royalties: {royalties}%</Text>
                        </VStack>
                        <Box position="relative" p={5} w={{ base: '100%', md: '50%' }} h="400px" bg="gray.100" borderRadius="md">
                            <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={{ custom: CustomNode }}>
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
