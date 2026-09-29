export type InlineToken = { type: 'text'; value: string } | { type: 'link'; label: string; href: string };

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Splits `Hello [world](https://example.com)!` into text and link tokens. */
export function parseInlineLinks(input: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let lastIndex = 0;
  for (const match of input.matchAll(LINK_PATTERN)) {
    const [whole, label, href] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push({ type: 'text', value: input.slice(lastIndex, index) });
    tokens.push({ type: 'link', label: label ?? '', href: href ?? '' });
    lastIndex = index + whole.length;
  }
  if (lastIndex < input.length) tokens.push({ type: 'text', value: input.slice(lastIndex) });
  return tokens;
}
