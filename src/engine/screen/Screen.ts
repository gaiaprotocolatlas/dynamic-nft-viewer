import * as PIXI from "pixi.js";
import DomNode from "../../gaia-commons-browser/dom/DomNode.js";
import el from "../../gaia-commons-browser/dom/el.js";
import GameNode from "../gamenode/GameNode.js";
import Camera from "./Camera.js";

export default class Screen extends DomNode {

    protected canvas: DomNode<HTMLCanvasElement>;
    private renderer: PIXI.Renderer;

    public camera = new Camera();
    public root = new GameNode(0, 0);

    public left = 0;
    public top = 0;
    public ratio = 0;

    private animationInterval: number | undefined;
    private fps: number | undefined;
    private beforeTime = 0;
    private timeSigma = 0;

    constructor(
        public width: number,
        public height: number,
        antialias?: boolean,
    ) {
        super("");

        this.canvas = el("canvas").appendTo(this) as DomNode<HTMLCanvasElement>;

        this.renderer = new PIXI.Renderer({
            view: this.canvas.domElement,
            backgroundAlpha: 0,
            resolution: devicePixelRatio,
            antialias,
        });
        this.renderer.plugins.interaction.autoPreventDefault = false;

        this.resize(width, height);
        this.root.screen = this;
        this.resume();
    }

    protected resize(width: number, height: number, ratio = 1): void {

        this.width = width;
        this.height = height;
        this.ratio = ratio;

        this.canvas.style({ width: width * ratio, height: height * ratio });
        this.canvas.domElement.width = width;
        this.canvas.domElement.height = height;

        this.renderer.resize(width, height);
    }

    private step(deltaTime: number) {

        // root to center of screen
        this.root.step(deltaTime, -this.root.x, -this.root.y, 1, 1, 0, 0, 1, 1, false);
        this.root.x = this.width / 2 - this.camera.x;
        this.root.y = this.height / 2 - this.camera.y;

        this.renderer.render(this.root.pixiContainer);
    }

    private tic = (now: number) => {
        const deltaTime = now - this.beforeTime;
        if (deltaTime > 0) {
            if (this.fps !== undefined && this.fps > 0) {
                this.timeSigma += deltaTime;
                const frameSecond = 1000 / this.fps;
                if (this.timeSigma >= frameSecond) {
                    this.step(frameSecond);
                    this.timeSigma -= frameSecond;
                }
            } else {
                this.step(deltaTime);
            }
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this.tic);
    };

    public resume(): void {
        if (this.animationInterval === undefined) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
}
