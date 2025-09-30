import React from 'react';
import CodeBlock from './CodeBlock';

type MdxRendererProps = {
  content: string;
};

const createKey = (prefix: string, index: number) => `${prefix}-${index}`;

const MdxRenderer: React.FC<MdxRendererProps> = ({ content }) => {
  const segments = content.trim().split(/\n\s*\n/);

  return (
    <div>
      {segments.map((segment, index) => {
        const trimmed = segment.trim();
        if (!trimmed) {
          return null;
        }
        if (trimmed.startsWith('```')) {
          const code = trimmed.replace(/^```[a-z]*\n?/i, '').replace(/```$/, '');
          return <CodeBlock key={createKey('code', index)}>{code}</CodeBlock>;
        }
        if (trimmed.startsWith('### ')) {
          return <h3 key={createKey('h3', index)}>{trimmed.replace(/^###\s*/, '')}</h3>;
        }
        if (trimmed.startsWith('> ')) {
          return <blockquote key={createKey('quote', index)}>{trimmed.replace(/^>\s*/, '')}</blockquote>;
        }
        const lines = trimmed.split(/\n/);
        return (
          <p key={createKey('p', index)}>
            {lines.map((line, lineIndex) => (
              <React.Fragment key={createKey('line', lineIndex)}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default MdxRenderer;
