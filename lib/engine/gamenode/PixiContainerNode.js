import { TreeNode } from "gaia-commons-ts";
import * as PIXI from "pixi.js";
export default class PixiContainerNode extends TreeNode {
    pixiContainer;
    constructor(x, y) {
        super();
        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.sortableChildren = true;
        this.x = x;
        this.y = y;
    }
    yToZ = false;
    set x(x) { this.pixiContainer.x = x; }
    get x() { return this.pixiContainer.x; }
    set y(y) {
        this.pixiContainer.y = y;
        if (this.yToZ === true) {
            this.z = y;
        }
    }
    get y() { return this.pixiContainer.y; }
    set z(z) { this.pixiContainer.zIndex = z; }
    get z() { return this.pixiContainer.zIndex; }
    set centerX(x) { this.pixiContainer.pivot.x = x; }
    get centerX() { return this.pixiContainer.pivot.x; }
    set centerY(y) { this.pixiContainer.pivot.y = y; }
    get centerY() { return this.pixiContainer.pivot.y; }
    changeCenter(x, y) {
        this.pixiContainer.pivot.x = x;
        this.pixiContainer.pivot.y = y;
    }
    set scaleX(scale) { this.pixiContainer.scale.x = scale; }
    get scaleX() { return this.pixiContainer.scale.x; }
    set scaleY(scale) { this.pixiContainer.scale.y = scale; }
    get scaleY() { return this.pixiContainer.scale.y; }
    set scale(scale) {
        this.pixiContainer.scale.x = scale;
        this.pixiContainer.scale.y = scale;
    }
    get scale() { return this.pixiContainer.scale.x; }
    set angle(angle) { this.pixiContainer.angle = angle; }
    get angle() { return this.pixiContainer.angle; }
    set alpha(alpha) { this.pixiContainer.alpha = alpha; }
    get alpha() { return this.pixiContainer.alpha; }
    appendTo(node, index) {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        }
        else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        return super.appendTo(node, index);
    }
    delete() {
        this.pixiContainer.destroy();
        super.delete();
    }
}
//# sourceMappingURL=PixiContainerNode.js.map