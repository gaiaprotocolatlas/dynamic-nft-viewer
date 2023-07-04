import MovableNode from "./MovableNode.js";
export default class GameNode extends MovableNode {
    _screen;
    set screen(screen) {
        this._screen = screen;
        for (const child of this.children) {
            if (child instanceof GameNode) {
                child.screen = this.screen;
            }
        }
    }
    get screen() {
        return this._screen;
    }
    appendTo(node, index) {
        const _this = super.appendTo(node, index);
        this.screen = node.screen;
        return _this;
    }
}
//# sourceMappingURL=GameNode.js.map