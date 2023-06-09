import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
export default class NFTItem extends GaiaComponent {
    options;
    checkboxContainer;
    selected = false;
    constructor(options) {
        super(".nft-item");
        this.options = options;
        this.append(this.checkboxContainer = el(".checkbox-container"), el(".image-container", el("img", { src: options.metadata.image })), el("footer", el("h5", msg(options.metadata.name))));
        this.onDom("click", () => this.toggle());
    }
    select() {
        this.selected = true;
        this.addClass("selected");
        this.checkboxContainer.empty().append(el("i.fa-solid.fa-check"));
    }
    deselect() {
        this.selected = false;
        this.deleteClass("selected");
        this.checkboxContainer.empty();
    }
    toggle() {
        this.selected ? this.deselect() : this.select();
    }
    get metadata() {
        return this.options.metadata;
    }
}
//# sourceMappingURL=NFTItem.js.map