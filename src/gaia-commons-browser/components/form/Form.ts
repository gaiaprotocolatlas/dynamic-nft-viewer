import DomNode from "../../dom/DomNode.js";
import GaiaComponent from "../GaiaComponent.js";

export default class Form extends GaiaComponent {

    constructor(options: {
        tag?: string,
    }, ...nodes: (DomNode | string | undefined)[]) {
        super("form" + (options.tag ?? ""), ...nodes);
        this.onDom("submit", (event) => event.preventDefault());
    }
}
