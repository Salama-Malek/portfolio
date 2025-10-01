export const getCssVariableValue = (token, fallback = '') => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement).getPropertyValue(token);
  const trimmed = value.trim();
  return trimmed || fallback;
};

export const resolvePalette = (tokens, fallback = []) => {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    return fallback;
  }
  return tokens.map((token, index) => {
    if (!token) {
      return fallback[index] ?? fallback[0] ?? '#ffffff';
    }
    if (token.startsWith('--')) {
      return getCssVariableValue(token, fallback[index] ?? fallback[0] ?? '#ffffff');
    }
    return token;
  });
};
