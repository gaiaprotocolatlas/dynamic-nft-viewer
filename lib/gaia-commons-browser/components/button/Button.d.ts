import DomNode from "../../dom/DomNode.js";
import GaiaComponent from "../GaiaComponent.js";
import ButtonType from "./ButtonType.js";
export default class Button extends GaiaComponent<HTMLAnchorElement> {
    private titleContainer;
    constructor(options: {
        tag?: string;
        type?: ButtonType;
        icon?: DomNode;
        title?: string | DomNode;
        href?: string;
        disabled?: boolean;
        onClick?: () => void;
    });
    set title(title: string);
    disable(): void;
    enable(): void;
}
//# sourceMappingURL=Button.d.ts.map