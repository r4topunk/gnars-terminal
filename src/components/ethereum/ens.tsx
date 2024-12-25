import { useEnsName } from 'wagmi';
import { mainnet } from 'viem/chains';
import { Address } from 'viem';
import { normalize } from 'path';
import { useEnsAvatar } from 'wagmi';
import { Avatar } from '../ui/avatar';

export default function EnsAvatar( { address,  }: { address: Address }) {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: mainnet.id,
  });
  
  return (
    <Avatar
      size='md'
      name={ensName || ''}
      src={
        ensAvatar ||
        `https://api.dicebear.com/5.x/identicon/svg?seed=${address}`
      }
    />
  )
}
