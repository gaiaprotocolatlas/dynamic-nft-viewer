import DomNode from "../../gaia-commons-browser/dom/DomNode.js";
import GameNode from "../gamenode/GameNode.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    width: number;
    height: number;
    protected canvas: DomNode<HTMLCanvasElement>;
    private renderer;
    camera: Camera;
    root: GameNode;
    left: number;
    top: number;
    ratio: number;
    private animationInterval;
    private fps;
    private beforeTime;
    private timeSigma;
    constructor(width: number, height: number, antialias?: boolean);
    protected resize(width: number, height: number, ratio?: number): void;
    private step;
    private tic;
    resume(): void;
}
//# sourceMappingURL=Screen.d.ts.map