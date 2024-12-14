import { Address } from 'viem';

export default function ZoraEmbed({
  chainContract,
}: {
  chainContract: `${string}:${Address}`;
}) {
  const iframeSrc = `https://zora.co/collect/${chainContract}/embed?referrer=0x72ad986ebac0246d2b3c565ab2a1ce3a14ce6f88`;

  return (
    <iframe
      src={iframeSrc}
      style={{ borderRadius: '12px' }}
      width='100%'
      height='100%'
      title='Zora iFrame'
    />
  );
}
