import DomNode from "../dom/DomNode.js";
export default class GaiaComponent<EL extends HTMLElement = HTMLElement> extends DomNode<EL> {
    constructor(tag: string, ...nodes: (DomNode | string | undefined)[]);
}
//# sourceMappingURL=GaiaComponent.d.ts.map