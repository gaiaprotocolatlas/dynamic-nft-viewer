import DomNode from "../dom/DomNode.js";
export default class GaiaComponent extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".gaia-component");
        this.append(...nodes);
    }
}
//# sourceMappingURL=GaiaComponent.js.map