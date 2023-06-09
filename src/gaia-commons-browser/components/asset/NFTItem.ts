import { AssetMetadata } from "gaia-commons-ts";
import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";

export default class NFTItem extends GaiaComponent {

    private checkboxContainer: DomNode;
    public selected = false;

    constructor(private options: {
        metadata: AssetMetadata,
    }) {
        super(".nft-item");

        this.append(
            this.checkboxContainer = el(".checkbox-container"),
            el(".image-container",
                el("img", { src: options.metadata.image }),
            ),
            el("footer",
                el("h5", msg(options.metadata.name)),
            ),
        );

        this.onDom("click", () => this.toggle());
    }

    public select() {
        this.selected = true;
        this.addClass("selected");
        this.checkboxContainer.empty().append(el("i.fa-solid.fa-check"));
    }

    public deselect() {
        this.selected = false;
        this.deleteClass("selected");
        this.checkboxContainer.empty();
    }

    public toggle() {
        this.selected ? this.deselect() : this.select();
    }

    public get metadata(): AssetMetadata {
        return this.options.metadata;
    }
}
