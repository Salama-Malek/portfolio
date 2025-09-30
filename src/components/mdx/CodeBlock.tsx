import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type CodeBlockProps = {
  children: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div className="code-block">
      <button type="button" className="code-block__copy" onClick={handleCopy}>
        {copied ? t('writing.code.copied') : t('writing.code.copy')}
      </button>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
