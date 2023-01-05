import { resolver } from "@parcel/plugin";

export default new resolver({
  async transform({asset}) {
    return [asset];
  }
});
