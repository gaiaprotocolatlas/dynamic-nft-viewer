import Screen from "../screen/Screen.js";
import MovableNode from "./MovableNode.js";

export default class GameNode extends MovableNode {

    private _screen: Screen | undefined;

    public set screen(screen: Screen | undefined) {
        this._screen = screen;
        for (const child of this.children) {
            if (child instanceof GameNode) {
                child.screen = this.screen;
            }
        }
    }

    public get screen(): Screen | undefined {
        return this._screen;
    }

    public appendTo(node: GameNode, index?: number): this {
        const _this = super.appendTo(node, index);
        this.screen = node.screen;
        return _this;
    }
}
