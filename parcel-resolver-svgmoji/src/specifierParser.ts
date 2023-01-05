const emojiFile =
  /^(twemoji|blobmoji|notomoji|openmoji)\/([\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]).svg$/u;

interface SpecifierInformation {
  mojiType: string;
  emoji: string;
}

export function getSpecifierInformation(
  specifier: string
): SpecifierInformation | null {
  const emojiInformation = specifier.match(emojiFile);

  if (!emojiInformation) return null;

  return {
    mojiType: emojiInformation[1]!,
    emoji: emojiInformation[2]!,
  };
}