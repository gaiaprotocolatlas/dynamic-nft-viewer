import DomNode from "../dom/DomNode.js";

export default class GaiaComponent<EL extends HTMLElement = HTMLElement> extends DomNode<EL> {

    constructor(tag: string, ...nodes: (DomNode | string | undefined)[]) {
        super(tag + ".gaia-component");
        this.append(...nodes);
    }
}
