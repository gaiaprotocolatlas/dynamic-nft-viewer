import { BigNumber } from "ethers";
import { AssetMetadata, Validator } from "gaia-commons-ts";
import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Input from "../form/Input.js";

export default class MultiTokenItem extends GaiaComponent {

    private checkboxContainer: DomNode;
    private input: Input;

    constructor(private options: {
        metadata: AssetMetadata,
        maxAmount: BigNumber,
    }) {
        super(".multi-token-item");

        this.append(
            this.checkboxContainer = el(".checkbox-container"),
            el(".image-container",
                el("img", { src: options.metadata.image }),
            ),
            el("footer",
                el("h5", msg(options.metadata.name)),
                el("p", `Max amount: ${options.maxAmount.toString()}`),
                this.input = new Input({ label: "Count", placeholder: "" }),
            ),
        );

        this.input.on("change", () => {
            Validator.integerString(this.input.value) ? this.check() : this.uncheck();
        });
    }

    private check() {
        this.addClass("checked");
        this.checkboxContainer.empty().append(el("i.fa-solid.fa-check"));
    }

    private uncheck() {
        this.deleteClass("checked");
        this.checkboxContainer.empty();
    }

    public get metadata(): AssetMetadata {
        return this.options.metadata;
    }

    public get amount(): BigNumber {
        return BigNumber.from(this.input.value);
    }

    public set amount(amount: BigNumber) {
        this.input.value = amount.toString();
    }
}
