import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";
export default class Tooltip extends GaiaComponent {
    constructor(options: {}, ...nodes: (DomNode | string | undefined)[]);
    show(left: number, top: number): void;
    hide(): void;
}
//# sourceMappingURL=Tooltip.d.ts.map