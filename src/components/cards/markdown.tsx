'use client';

import React from 'react';
import MarkdownEditor from '../markdown/editor';

export default function MarkdownCard() {
  return (
    <MarkdownEditor
      value={'# hack the plan3t'}
      onChange={(e) => console.log({ e })}
    />
  );
}
