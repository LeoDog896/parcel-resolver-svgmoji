import { Resolver } from "@parcel/plugin";
import path from "path";
import { Twemoji } from "@svgmoji/twemoji";
import { Blobmoji } from "@svgmoji/blob";
import { Notomoji } from "@svgmoji/noto";
import { Openmoji } from "@svgmoji/openmoji";
import data from "svgmoji/emoji.json";
import { Moji } from "svgmoji";
import fetch from "node-fetch";

const mojis: Record<string, Moji> = {
  twemoji: new Twemoji({ data, type: "individual" }),
  blobmoji: new Blobmoji({ data, type: "individual" }),
  notomoji: new Notomoji({ data, type: "individual" }),
  openmoji: new Openmoji({ data, type: "individual" }),
}

export const emojiFile =
  /^(twemoji|blobmoji|notomoji|openmoji)\/([\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]).svg$/u;

interface SpecifierInformation {
  mojiType: string;
  emoji: string;
}

export function getSpecifierInformation(specifier: string): SpecifierInformation | null {
  const emojiInformation = specifier.match(emojiFile)

  if (!emojiInformation) return null;

  if (emojiInformation[0] == null) return null;
  if (emojiInformation[1] == null) return null;
  if (emojiInformation[2] == null) return null;

  return {
    mojiType: emojiInformation[1]!,
    emoji: emojiInformation[2]!
  }
}

export default new Resolver({
  async resolve({ specifier }) {
    const info = getSpecifierInformation(specifier);
    if (info != null) {
      const request = await fetch(mojis[info.mojiType].url(info.emoji));
      const body = await request.text();

      return {
        filePath: path.join(__dirname, specifier),
        code: body,
      };
    }

    // Let the next resolver in the pipeline handle
    // this dependency.
    return null;
  },
});
