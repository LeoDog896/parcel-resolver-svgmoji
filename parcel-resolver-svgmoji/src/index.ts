import { Resolver } from "@parcel/plugin";
import path from "path";
import { Twemoji } from "@svgmoji/twemoji";
import { Blobmoji } from "@svgmoji/blob";
import { Notomoji } from "@svgmoji/noto";
import { Openmoji } from "@svgmoji/openmoji";
import data from "svgmoji/emoji.json";
import fetch from "node-fetch";

const twemoji = new Twemoji({ data, type: "individual" });
const blobmoji = new Blobmoji({ data, type: "individual" });
const notomoji = new Notomoji({ data, type: "individual" });
const openmoji = new Openmoji({ data, type: "individual" });

const emoji =
  /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;
const emojiFile =
  /^[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}].svg$/u;

export default new Resolver({
  async resolve({ specifier }) {
    if (emojiFile.test(specifier)) {
      const emojiCharacter = specifier.match(emoji);

      if (!emojiCharacter || emojiCharacter.length === 0) {
        throw Error("Character not recognized by regex.");
      }

      const request = await fetch(twemoji.url(emojiCharacter[0]));
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
