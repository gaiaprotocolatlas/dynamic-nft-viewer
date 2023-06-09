import DomNode from "../../dom/DomNode.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Select<VT = string> extends GaiaComponent {
    private options;
    selectedOption: VT | undefined;
    private _selectOptions;
    private valueDisplay;
    private optionContainer;
    constructor(options: {
        placeholder?: string;
        defaultValue: string;
        options: {
            dom: DomNode;
            value: VT;
        }[];
    });
    private select;
    get selectOptions(): {
        dom: DomNode;
        value: VT;
    }[];
    set selectOptions(options: {
        dom: DomNode;
        value: VT;
    }[]);
}
//# sourceMappingURL=Select.d.ts.map