import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Select extends GaiaComponent {
    options;
    selectedOption;
    _selectOptions = [];
    valueDisplay;
    optionContainer;
    constructor(options) {
        super(".select");
        this.options = options;
        this.append(this.valueDisplay = el(".value", options.placeholder === undefined ? undefined : el(".placeholder", options.placeholder)), this.optionContainer = el(".option-container"));
        this.onDom("mousedown", (event) => {
            event.stopPropagation();
            this.toggleClass("open");
        });
        this.onWindow("mousedown", () => this.deleteClass("open"));
        this.selectOptions = options.options;
    }
    select(value) {
        this.selectedOption = value;
        this.valueDisplay.empty();
        const optionDom = this._selectOptions.find((option) => option.value === value)?.dom.clone();
        if (optionDom !== undefined) {
            this.valueDisplay.append(optionDom);
        }
    }
    get selectOptions() {
        return this._selectOptions;
    }
    set selectOptions(options) {
        this._selectOptions = options;
        this.optionContainer.empty();
        for (const option of options) {
            const optionDom = option.dom.clone();
            optionDom.onDom("mousedown", () => {
                this.select(option.value);
                this.fireEvent("select", option.value);
            });
            this.optionContainer.append(optionDom);
            if (this.selectedOption === undefined && option.value === this.options.defaultValue) {
                this.select(option.value);
            }
        }
    }
}
//# sourceMappingURL=Select.js.map