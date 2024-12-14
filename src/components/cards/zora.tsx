import { Box } from '@chakra-ui/react';
import ZoraEmbed from '../utils/zora';

interface ZoraCardProps { }
async function ZoraCard(props: ZoraCardProps) {
  return (
    <Box
      shadow={'sm'}
      w={'full'}
      padding={4}
      rounded={'md'}
      _dark={{ borderColor: 'yellow', borderWidth: 1 }}
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      height={'300px'}
    >
      <ZoraEmbed
        chainContract={'base:0x3ac50ed10080d12fbb3fb1fc53524fa38ff67659/2'}
      />
    </Box>
  );
}

export default ZoraCard;
