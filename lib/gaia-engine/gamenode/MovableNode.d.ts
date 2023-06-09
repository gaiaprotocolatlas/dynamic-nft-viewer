import PixiContainerNode from "./PixiContainerNode.js";
export default class MovableNode extends PixiContainerNode {
    protected children: MovableNode[];
    private toX;
    private toY;
    private speedX;
    private speedY;
    private moveEndHandler;
    private toAlpha;
    private fadingSpeed;
    private fadeEndHandler;
    protected r_x: number;
    protected r_y: number;
    protected r_scaleX: number;
    protected r_scaleY: number;
    protected r_angle: number;
    protected r_sin: number;
    protected r_cos: number;
    protected r_alpha: number;
    protected r_hidden: boolean;
    step(deltaTime: number, x: number, y: number, scaleX: number, scaleY: number, angle: number, sin: number, cos: number, alpha: number, hidden: boolean): void;
}
//# sourceMappingURL=MovableNode.d.ts.map