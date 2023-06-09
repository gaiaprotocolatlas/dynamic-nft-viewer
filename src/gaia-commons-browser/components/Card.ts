import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";

export default class Card extends GaiaComponent {

    constructor(options: {
        tag?: string,
    }, ...nodes: (DomNode | string | undefined)[]) {
        super(".card" + (options.tag ?? ""));
        this.append(...nodes);
    }
}
