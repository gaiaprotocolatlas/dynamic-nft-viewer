import * as PIXI from "pixi.js";
import DomNode from "../../gaia-commons-browser/dom/DomNode.js";
import el from "../../gaia-commons-browser/dom/el.js";
import GameNode from "../gamenode/GameNode.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    width;
    height;
    canvas;
    renderer;
    camera = new Camera();
    root = new GameNode(0, 0);
    left = 0;
    top = 0;
    ratio = 0;
    animationInterval;
    fps;
    beforeTime = 0;
    timeSigma = 0;
    constructor(width, height, antialias) {
        super("");
        this.width = width;
        this.height = height;
        this.canvas = el("canvas").appendTo(this);
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
    resize(width, height, ratio = 1) {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        this.canvas.style({ width: width * ratio, height: height * ratio });
        this.canvas.domElement.width = width;
        this.canvas.domElement.height = height;
        this.renderer.resize(width, height);
    }
    step(deltaTime) {
        this.root.step(deltaTime, -this.root.x, -this.root.y, 1, 1, 0, 0, 1, 1, false);
        this.root.x = this.width / 2 - this.camera.x;
        this.root.y = this.height / 2 - this.camera.y;
        this.renderer.render(this.root.pixiContainer);
    }
    tic = (now) => {
        const deltaTime = now - this.beforeTime;
        if (deltaTime > 0) {
            if (this.fps !== undefined && this.fps > 0) {
                this.timeSigma += deltaTime;
                const frameSecond = 1000 / this.fps;
                if (this.timeSigma >= frameSecond) {
                    this.step(frameSecond);
                    this.timeSigma -= frameSecond;
                }
            }
            else {
                this.step(deltaTime);
            }
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this.tic);
    };
    resume() {
        if (this.animationInterval === undefined) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
}
//# sourceMappingURL=Screen.js.map