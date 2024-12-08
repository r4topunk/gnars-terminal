import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import React from 'react';

import MarkdownRenderers from './markdownRenderers';
interface MarkdownProps {
  text?: string;
}

function Markdown({ text }: MarkdownProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      remarkPlugins={[remarkGfm]}
      components={MarkdownRenderers}
    >
      {text}
    </ReactMarkdown>
  );
}

export default Markdown;
