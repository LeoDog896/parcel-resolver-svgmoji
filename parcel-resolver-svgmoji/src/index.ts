import { Resolver } from "@parcel/plugin";
import path from "path";
import { Twemoji } from "@svgmoji/twemoji";
import { Blobmoji } from "@svgmoji/blob";
import { Notomoji } from "@svgmoji/noto";
import { Openmoji } from "@svgmoji/openmoji";
import data from "svgmoji/emoji.json";
import { Moji } from "svgmoji";
import fetch from "node-fetch";
import { getSpecifierInformation } from "./specifierParser"

const mojis: Record<string, Moji> = {
  twemoji: new Twemoji({ data, type: "individual" }),
  blobmoji: new Blobmoji({ data, type: "individual" }),
  notomoji: new Notomoji({ data, type: "individual" }),
  openmoji: new Openmoji({ data, type: "individual" }),
};

export default new Resolver({
  async resolve({ specifier, logger }) {
    const info = getSpecifierInformation(specifier);
    if (info != null) {
      const url = mojis[info.mojiType].url(info.emoji);
      const request = await fetch(url);
      logger.verbose({
        message: `Fetching URL ${url} for ${specifier}`,
      });
      const code = await request.text();
      const filePath = path.join(__dirname, specifier);

      return {
        filePath,
        code,
      };
    }

    // Let the next resolver in the pipeline handle
    // this dependency.
    return null;
  },
});
