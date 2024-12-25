'use client';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const images = [
    '/images/404.gif',
    '/images/baby.gif',
    '/images/bestbail.gif',
    '/images/bail.gif',
    '/images/mortal.gif',
];

export default function NotFoundPage() {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBackgroundImage(randomImage);
    }, []);

    return (
        <Box
            minH="100vh"
            width="100%"
            height="100vh"
            backgroundImage={`url(${backgroundImage})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            display="flex"
            zIndex={1}
            position="absolute"
            left="0"
            right="0"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Box>
                <Heading as="h1" size="6xl" mb={4} color={'yellow.500'}>
                    404 - Page Not Found
                </Heading>
                <Text fontSize="3xl" mb={4} color={'yellow.500'}>
                    You crazy, this page does not exist 🤷‍♂️
                </Text>
            </Box>
        </Box>
    );
}
