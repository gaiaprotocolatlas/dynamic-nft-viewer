import { BodyNode, el } from "gaia-commons-browser";
import { View } from "gaia-commons-ts";
export default class ShigorSparrows extends View {
    container;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".nft-view"));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=ShigorSparrows.js.map