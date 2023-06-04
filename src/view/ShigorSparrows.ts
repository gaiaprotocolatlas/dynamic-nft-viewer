import { BodyNode, DomNode, el } from "gaia-commons-browser";
import { View, ViewParams } from "gaia-commons-ts";

export default class ShigorSparrows extends View {

    private container: DomNode;

    constructor(params: ViewParams) {
        super();
        BodyNode.append(this.container = el(".nft-view",

        ));
    }

    public close(): void {
        this.container.delete();
        super.close();
    }
}
