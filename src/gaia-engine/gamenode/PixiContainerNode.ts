import { TreeNode } from "gaia-commons-ts";
import * as PIXI from "pixi.js";

export default class PixiContainerNode extends TreeNode {

    public pixiContainer: PIXI.Container;

    constructor(x: number, y: number) {
        super();
        this.pixiContainer = new PIXI.Container();
        this.pixiContainer.sortableChildren = true;
        this.x = x;
        this.y = y;
    }

    public yToZ = false;

    public set x(x: number) { this.pixiContainer.x = x; }
    public get x(): number { return this.pixiContainer.x; }
    public set y(y: number) {
        this.pixiContainer.y = y;
        if (this.yToZ === true) {
            this.z = y;
        }
    }
    public get y(): number { return this.pixiContainer.y; }
    public set z(z: number) { this.pixiContainer.zIndex = z; }
    public get z(): number { return this.pixiContainer.zIndex; }

    public set centerX(x: number) { this.pixiContainer.pivot.x = x; }
    public get centerX(): number { return this.pixiContainer.pivot.x; }
    public set centerY(y: number) { this.pixiContainer.pivot.y = y; }
    public get centerY(): number { return this.pixiContainer.pivot.y; }

    public changeCenter(x: number, y: number): void {
        this.pixiContainer.pivot.x = x;
        this.pixiContainer.pivot.y = y;
    }

    public set scaleX(scale: number) { this.pixiContainer.scale.x = scale; }
    public get scaleX(): number { return this.pixiContainer.scale.x; }
    public set scaleY(scale: number) { this.pixiContainer.scale.y = scale; }
    public get scaleY(): number { return this.pixiContainer.scale.y; }

    public set scale(scale: number) {
        this.pixiContainer.scale.x = scale;
        this.pixiContainer.scale.y = scale;
    }
    public get scale(): number { return this.pixiContainer.scale.x; }

    public set angle(angle: number) { this.pixiContainer.angle = angle; }
    public get angle(): number { return this.pixiContainer.angle; }

    public set alpha(alpha: number) { this.pixiContainer.alpha = alpha; }
    public get alpha(): number { return this.pixiContainer.alpha; }

    public appendTo(node: PixiContainerNode, index?: number): this {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        } else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        return super.appendTo(node, index);
    }

    public delete(): void {
        this.pixiContainer.destroy();
        super.delete();
    }
}
