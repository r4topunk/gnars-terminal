'use client';

import { useState } from 'react';
import { Address, Chain } from 'viem';

export default function ZoraEmbed({
  chainContract,
}: {
  chainContract: `${string}:${Address}`;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isDarkMode = document.documentElement.classList.contains('dark');

  const src = `https://zora.co/collect/${chainContract}/embed?referrer=0x41CB654D1F47913ACAB158a8199191D160DAbe4A`;
  const iframeSrc = isDarkMode ? `${src}&theme=dark` : src;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <iframe
      src={iframeSrc}
      onLoad={handleLoad}
      width='100%'
      height='100%'
      title='Zora iFrame'
      style={isLoaded ? {} : { display: 'none' }}
    />
  );
}
