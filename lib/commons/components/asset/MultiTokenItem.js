import { BigNumber } from "ethers";
import { Validator } from "gaia-commons-ts";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Input from "../form/Input.js";
export default class MultiTokenItem extends GaiaComponent {
    options;
    checkboxContainer;
    input;
    constructor(options) {
        super(".multi-token-item");
        this.options = options;
        this.append(this.checkboxContainer = el(".checkbox-container"), el(".image-container", el("img", { src: options.metadata.image })), el("footer", el("h5", msg(options.metadata.name)), el("p", `Max amount: ${options.maxAmount.toString()}`), this.input = new Input({ label: "Count", placeholder: "" })));
        this.input.on("change", () => {
            Validator.integerString(this.input.value) ? this.check() : this.uncheck();
        });
    }
    check() {
        this.addClass("checked");
        this.checkboxContainer.empty().append(el("i.fa-solid.fa-check"));
    }
    uncheck() {
        this.deleteClass("checked");
        this.checkboxContainer.empty();
    }
    get metadata() {
        return this.options.metadata;
    }
    get amount() {
        return BigNumber.from(this.input.value);
    }
    set amount(amount) {
        this.input.value = amount.toString();
    }
}
//# sourceMappingURL=MultiTokenItem.js.map