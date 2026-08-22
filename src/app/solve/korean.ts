function hasFinalConsonant(word: string): boolean {
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return false;
  return code % 28 !== 0;
}

export function roParticle(word: string): "로" | "으로" {
  return hasFinalConsonant(word) ? "으로" : "로";
}
