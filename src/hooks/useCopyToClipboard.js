import { useCallback, useState } from 'react';

export function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
      return true;
    } catch (e) {
      return false;
    }
  }, []);
  return { copy, isCopied, copiedText };
}


