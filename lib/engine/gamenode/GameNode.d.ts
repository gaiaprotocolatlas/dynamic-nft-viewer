import Screen from "../screen/Screen.js";
import MovableNode from "./MovableNode.js";
export default class GameNode extends MovableNode {
    private _screen;
    set screen(screen: Screen | undefined);
    get screen(): Screen | undefined;
    appendTo(node: GameNode, index?: number): this;
}
//# sourceMappingURL=GameNode.d.ts.map