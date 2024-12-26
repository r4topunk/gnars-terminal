import { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Button, IconButton, HStack, Image, Text } from '@chakra-ui/react';
import { FiVolume2, FiVolumeX, FiMaximize, FiMinimize } from 'react-icons/fi';
import { LuPause, LuPlay } from 'react-icons/lu';
import CollectModal from './CollectModal'; // Import the CollectModal component

const CustomVideoPlayer = ({ src, isVideo, title, royalties, proposer, fundsRecipient, description, saleConfig, index }: { src: string; isVideo: boolean; title: string; royalties: string; proposer: string; fundsRecipient: string; description: string; saleConfig: any; index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [isCollectModalOpen, setIsCollectModalOpen] = useState(false); // State to manage CollectModal visibility

    // Show/hide controls on hover
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const handleVolumeChange = useCallback(() => {
        if (videoRef.current) {
            const newVolume = volume === 0 ? 1 : 0;
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    }, [volume]);

    const handleFullscreenToggle = useCallback(() => {
        if (videoRef.current) {
            if (isFullscreen) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
            setIsFullscreen(!isFullscreen);
        }
    }, [isFullscreen]);

    const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const newTime = (videoRef.current.duration * parseFloat(e.target.value)) / 100;
            videoRef.current.currentTime = newTime;
            setProgress(parseFloat(e.target.value));
        }
    }, []);

    const handleTimeUpdate = useCallback(() => {
        if (videoRef.current) {
            const newProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(newProgress);
        }
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const newHoverTime = (x / rect.width) * videoRef.current.duration;
            setHoverTime(newHoverTime);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoverTime(null);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [handleTimeUpdate]);

    /**
     * By default, CSS backgrounds stack in the order you write them:
     * The first background is on top, the last is at the bottom.
     *
     * Here we want:
     *   1) A semi-transparent "fill" gradient on top (so it can show progress in yellow).
     *   2) The ethereum image underneath.
     *
     * Because we want the image behind, we write: 
     *   background: linear-gradient(...) , url("/images/ethereum.png")
     */
    const sliderBackground = `
      linear-gradient(
        to right,
        rgba(255, 255, 0, 0.8) 0%,
        rgba(255, 255, 0, 0.8) ${progress}%,
        #ccc ${progress}%,
        #ccc 100%
      )
    `;

    return (
        <Box
            position="relative"
            w="full"
            rounded="md"
            overflow="hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Title and Royalties */}
            <Box
                position="absolute"
                top={4}
                left={4}
                zIndex={1}
                color="white"
                textShadow="1px 1px 2px black"
                display={isPlaying ? 'none' : 'block'}
            >
                <Text fontSize="xl" fontWeight="bold">{title}</Text>
                <Text>Royalties: {royalties}%</Text>
            </Box>

            {isVideo ? (
                <video ref={videoRef} src={src} style={{ width: '100%' }} autoPlay muted controls={false} />
            ) : (
                <Image src={src} alt="Droposal Media" width="100%" rounded="md" />
            )}

            {/* Bottom Controls Bar, only show when hovered */}
            {isVideo && isHovered && (
                <Box
                    position="absolute"
                    bottom={4}
                    left={0}
                    right={0}
                    px={4}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* Left side: Control buttons */}
                    <HStack gap={0}>
                        <Button onClick={handlePlayPause} size="xs" p={-2} variant={'ghost'} color={'white'} _hover={{ bg: 'transparent', color: 'yellow' }}>
                            {isPlaying ? <LuPause /> : <LuPlay />}
                        </Button>
                        <IconButton
                            aria-label="Volume"
                            onClick={handleVolumeChange}
                            p={-2} variant={'ghost'} color={'white'} _hover={{ bg: 'transparent', color: 'yellow' }} size="sm"
                        >
                            {volume === 0 ? <FiVolumeX /> : <FiVolume2 />}
                        </IconButton >
                        <IconButton
                            aria-label="Fullscreen"
                            onClick={handleFullscreenToggle}
                            p={-2} variant={'ghost'} color={'white'} _hover={{ bg: 'transparent', color: 'yellow' }} size="sm"
                        >
                            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
                        </IconButton>
                    </HStack>

                    {/* Middle: Progress bar */}
                    <Box position="relative" flex="1" mx={4}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                width: '100%',
                                WebkitAppearance: 'none', // remove default styling
                                background: sliderBackground,
                                height: '6px',
                                borderRadius: '3px',
                                outline: 'none',
                            }}
                        />

                        <style jsx>{`
                          /* For Chrome/Edge/Safari */
                          input[type='range']::-webkit-slider-runnable-track {
                            -webkit-appearance: none;
                            height: 6px;
                            background: transparent; /* We'll rely on the background in <input style=...> */
                          }
                          input[type='range']::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            height: 20px;
                            width: 20px;
                            background: url("/images/gnars.webp") no-repeat center;
                            background-size: contain;
                            border: none;
                            border-radius: 0%;
                            cursor: pointer;
                            margin-top: -9px;  /* offset so it's centered */
                          }
                          input[type='range']::-webkit-slider-thumb:active {
                            background: url("/images/gnars.webp") no-repeat center;
                            background-size: contain;
                          }

                          /* For Firefox (optional):
                             input[type='range']::-moz-range-track { ... }
                             input[type='range']::-moz-range-thumb { ... }
                          */
                        `}</style>

                        {/* Hover time display */}
                        {hoverTime !== null && videoRef.current?.duration && (
                            <Box
                                position="absolute"
                                top="-25px"
                                left={`${(hoverTime / videoRef.current.duration) * 100}%`}
                                transform="translateX(-50%)"
                                bg="black"
                                color="white"
                                p={1}
                                rounded="md"
                                fontSize="xs"
                            >
                                {new Date(hoverTime * 1000).toISOString().substr(11, 8)}
                            </Box>
                        )}
                    </Box>

                    {/* Right side: Mint button */}
                    <Button
                        aria-label="Mint"
                        colorScheme="teal"
                        size="sm"
                        onClick={() => setIsCollectModalOpen(true)} // Open the CollectModal
                    >
                        Collect
                    </Button>
                </Box>
            )}

            {/* CollectModal */}
            <CollectModal
                isOpen={isCollectModalOpen}
                onClose={() => setIsCollectModalOpen(false)}
                title={title}
                royalties={royalties}
                proposer={proposer}
                fundsRecipient={fundsRecipient}
                description={description}
                saleConfig={saleConfig}
                mediaSrc={src}
                isVideo={isVideo}
                index={index} // Pass the index here
            />
        </Box>
    );
};

export default CustomVideoPlayer;
