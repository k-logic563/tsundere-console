export function pickMessage(
  messages: readonly string[],
  randomness: boolean,
): string | undefined {
  if (messages.length === 0) return undefined;
  if (!randomness) return messages[0];

  return messages[Math.floor(Math.random() * messages.length)];
}
