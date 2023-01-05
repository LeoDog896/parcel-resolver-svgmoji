import { Optimizer } from "@parcel/plugin";

export default new Optimizer({
  async optimize({ contents, map }) {
    return {
      contents,
      map,
    };
  },
});
