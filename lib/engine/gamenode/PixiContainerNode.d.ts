import { TreeNode } from "gaia-commons-ts";
import * as PIXI from "pixi.js";
export default class PixiContainerNode extends TreeNode {
    pixiContainer: PIXI.Container;
    constructor(x: number, y: number);
    yToZ: boolean;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set z(z: number);
    get z(): number;
    set centerX(x: number);
    get centerX(): number;
    set centerY(y: number);
    get centerY(): number;
    changeCenter(x: number, y: number): void;
    set scaleX(scale: number);
    get scaleX(): number;
    set scaleY(scale: number);
    get scaleY(): number;
    set scale(scale: number);
    get scale(): number;
    set angle(angle: number);
    get angle(): number;
    set alpha(alpha: number);
    get alpha(): number;
    appendTo(node: PixiContainerNode, index?: number): this;
    delete(): void;
}
//# sourceMappingURL=PixiContainerNode.d.ts.map