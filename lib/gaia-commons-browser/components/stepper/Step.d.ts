import DomNode from "../../dom/DomNode.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Step extends GaiaComponent {
    private options;
    private _index;
    private titleContainer;
    private indexContainer;
    private continueButton;
    private backButton;
    constructor(options: {
        tag?: string;
        title: string;
        continueButtonTitle?: string;
        onOpen?: () => void;
        checkContinue?: () => Promise<boolean>;
    }, ...nodes: (DomNode | string | undefined)[]);
    set index(index: number);
    set title(title: string);
    show(): void;
    hide(): void;
    check(): void;
    uncheck(): void;
}
//# sourceMappingURL=Step.d.ts.map