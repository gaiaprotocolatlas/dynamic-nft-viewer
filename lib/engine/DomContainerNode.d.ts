import DomNode from "../gaia-commons-browser/dom/DomNode.js";
import GameNode from "./gamenode/GameNode.js";
import Screen from "./screen/Screen.js";
export default class DomContainerNode extends GameNode {
    private _dom;
    private dom_left;
    private dom_top;
    private dom_scaleX;
    private dom_scaleY;
    private dom_angle;
    private dom_alpha;
    constructor(x: number, y: number, dom: DomNode);
    set dom(dom: DomNode | undefined);
    get dom(): DomNode | undefined;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    step(deltaTime: number, x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number, hidden: boolean): void;
    appendTo(node: GameNode, index?: number): this;
    delete(): void;
}
//# sourceMappingURL=DomContainerNode.d.ts.map