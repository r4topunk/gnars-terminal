'use client';

import { useState } from 'react';
import { Address } from 'viem';

export default function ZoraEmbed({
  chainContract,
}: {
  chainContract: `${string}:${Address}`;
}) {
  const iframeSrc = `https://zora.co/collect/${chainContract}/embed?referrer=0x41CB654D1F47913ACAB158a8199191D160DAbe4A`;

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
