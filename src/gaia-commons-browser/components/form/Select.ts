import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";

export default class Select<VT = string> extends GaiaComponent {

    public selectedOption: VT | undefined;

    private _selectOptions: { dom: DomNode, value: VT }[] = [];

    private valueDisplay: DomNode;
    private optionContainer: DomNode;

    constructor(private options: {
        placeholder?: string,
        defaultValue: string,
        options: { dom: DomNode, value: VT }[],
    }) {
        super(".select");
        this.append(
            this.valueDisplay = el(".value", options.placeholder === undefined ? undefined : el(".placeholder", options.placeholder)),
            this.optionContainer = el(".option-container"),
        );
        this.onDom("mousedown", (event) => {
            event.stopPropagation();
            this.toggleClass("open");
        });
        this.onWindow("mousedown", () => this.deleteClass("open"));

        this.selectOptions = options.options;
    }

    private select(value: VT) {
        this.selectedOption = value;
        this.valueDisplay.empty();
        const optionDom = this._selectOptions.find((option) => option.value === value)?.dom.clone();
        if (optionDom !== undefined) {
            this.valueDisplay.append(optionDom);
        }
    }

    public get selectOptions() {
        return this._selectOptions;
    }

    public set selectOptions(options: { dom: DomNode, value: VT }[]) {

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
