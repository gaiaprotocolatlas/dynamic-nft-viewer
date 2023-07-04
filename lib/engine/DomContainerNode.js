import GameNode from "./gamenode/GameNode.js";
export default class DomContainerNode extends GameNode {
    _dom;
    dom_left = 0;
    dom_top = 0;
    dom_scaleX = 1;
    dom_scaleY = 1;
    dom_angle = 0;
    dom_alpha = 1;
    constructor(x, y, dom) {
        super(x, y);
        this.dom = dom;
    }
    set dom(dom) {
        this._dom?.delete();
        if (dom !== undefined) {
            this._dom = dom;
            dom.style({
                position: "fixed",
                left: -9999999,
                top: -9999999,
                opacity: this.pixiContainer.worldAlpha,
            });
            dom.on("delete", () => this._dom = undefined);
            if (this.screen !== undefined) {
                dom.appendTo(this.screen);
            }
        }
    }
    get dom() {
        return this._dom;
    }
    set screen(screen) {
        if (super.screen === undefined && screen !== undefined) {
            this.dom?.appendTo(screen);
        }
        super.screen = screen;
    }
    get screen() {
        return super.screen;
    }
    step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha, hidden) {
        super.step(deltaTime, x, y, scaleX, scaleY, angle, sin, cos, alpha, hidden);
        if (this.deleted !== true && this.dom !== undefined && this.screen !== undefined) {
            const dom_left = this.screen.left + (this.screen.width / 2 + this.r_x - this.centerX - this.screen.camera.x) * this.screen.ratio;
            const dom_top = this.screen.top + (this.screen.height / 2 + this.r_y - this.centerY - this.screen.camera.y) * this.screen.ratio;
            const dom_scaleX = this.screen.ratio * this.r_scaleX;
            const dom_scaleY = this.screen.ratio * this.r_scaleY;
            if (dom_left !== this.dom_left ||
                dom_top !== this.dom_top ||
                dom_scaleX !== this.dom_scaleX ||
                dom_scaleY !== this.dom_scaleY ||
                this.r_angle !== this.dom_angle ||
                this.r_alpha !== this.dom_alpha) {
                this.dom.style({
                    left: dom_left - this.dom.domElement.offsetWidth / 2,
                    top: dom_top - this.dom.domElement.offsetHeight / 2,
                    transform: `scale(${dom_scaleX}, ${dom_scaleY})`,
                    opacity: this.r_alpha,
                });
                this.dom_left = dom_left;
                this.dom_top = dom_top;
                this.dom_scaleX = dom_scaleX;
                this.dom_scaleY = dom_scaleY;
                this.dom_angle = this.r_angle;
                this.dom_alpha = this.r_alpha;
            }
        }
    }
    appendTo(node, index) {
        const _this = super.appendTo(node, index);
        if (this.screen !== undefined) {
            this.dom?.appendTo(this.screen);
        }
        return _this;
    }
    delete() {
        this.dom?.delete();
        super.delete();
    }
}
//# sourceMappingURL=DomContainerNode.js.map