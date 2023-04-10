export interface ParsedMessage {
  type: string;
  token: string;
  profit: number
}

export function parseMessage(msg: string): ParsedMessage {
  const hashed = msg.match(/^[^\s]*\s/)?.[0];
  const split = hashed?.split('#')?.slice(1) || [];
  const [type, token, profit] = split;

  if (split?.length >= 2) {
    return {
      type: type.trim(),
      token: token.trim(),
      profit: typeof profit === 'string' ? parseFloat(profit) : null
    }
  }

  return null
}
