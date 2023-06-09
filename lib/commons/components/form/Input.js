import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Input extends GaiaComponent {
    input;
    previousValue = "";
    constructor(options) {
        super("fieldset.input" + (options.disabled === true ? ".disabled" : "") + (options.tag ?? ""));
        this.append(el("legend", options.label), this.input = el("input", {
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
        }));
    }
    get value() {
        return this.input.domElement.value;
    }
    set value(value) {
        if (this.input.domElement.value !== value) {
            this.input.domElement.value = value;
            this.fireEvent("change");
        }
    }
    active() {
        this.addClass("active");
    }
    inactive() {
        this.deleteClass("active");
    }
}
//# sourceMappingURL=Input.js.map