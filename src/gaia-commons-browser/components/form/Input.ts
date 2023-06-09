import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";

export default class Input extends GaiaComponent {

    private input: DomNode<HTMLInputElement>;
    private previousValue: string = "";

    constructor(options: {
        tag?: string,
        label: string,
        placeholder?: string,
        disabled?: boolean,
    }) {
        super("fieldset.input" + (options.disabled === true ? ".disabled" : "") + (options.tag ?? ""));
        this.append(
            el("legend", options.label),
            this.input = el("input", {
                placeholder: options.placeholder,
                disabled: options.disabled === true ? "disabled" : undefined,
                focus: () => this.active(),
                blur: () => this.inactive(),
                keyup: () => {
                    if (this.value !== this.previousValue) {
                        this.fireEvent("change");
                        this.previousValue = this.value;
                    }
                },
            }),
        );
    }

    public get value(): string {
        return this.input.domElement.value;
    }

    public set value(value: string) {
        if (this.input.domElement.value !== value) {
            this.input.domElement.value = value;
            this.fireEvent("change");
        }
    }

    private active() {
        this.addClass("active");
    }

    private inactive() {
        this.deleteClass("active");
    }
}
