import BodyNode from "../../gaia-commons-browser/dom/BodyNode.js";
import Letterbox from "./Letterbox.js";
import Screen from "./Screen.js";
export default class Fullscreen extends Screen {
    fixedWidth;
    fixedHeight;
    extraOptions;
    letterboxes = {
        top: new Letterbox(), bottom: new Letterbox(),
        left: new Letterbox(), right: new Letterbox(),
    };
    constructor(fixedWidth, fixedHeight, extraOptions) {
        super(fixedWidth ?? 0, fixedHeight ?? 0);
        this.fixedWidth = fixedWidth;
        this.fixedHeight = fixedHeight;
        this.extraOptions = extraOptions;
        this.append(...Object.values(this.letterboxes));
        this.style({ position: "fixed", left: 0, top: 0, width: "100%", height: "100%" });
        this.canvas.style({ position: "fixed", zIndex: -1 });
        this.letterboxes.top.style({ left: 0, top: 0, width: "100%" });
        this.letterboxes.bottom.style({ left: 0, bottom: 0, width: "100%" });
        this.letterboxes.left.style({ left: 0, top: 0, height: "100%" });
        this.letterboxes.right.style({ right: 0, top: 0, height: "100%" });
        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();
        BodyNode.append(this);
    }
    windowResizeHandler = () => {
        const windowWidth = document.documentElement.clientWidth;
        const windowHeight = window.innerHeight;
        let isToFixWidth = false;
        let isToFixHeight = false;
        if (this.fixedWidth === undefined) {
            this.width = windowWidth;
            isToFixWidth = true;
        }
        if (this.fixedHeight === undefined) {
            this.height = windowHeight;
            isToFixHeight = true;
        }
        let ratio = 1;
        let widthRatio = windowWidth / this.width;
        let heightRatio = windowHeight / this.height;
        if (widthRatio < heightRatio) {
            ratio = widthRatio;
        }
        else {
            ratio = heightRatio;
        }
        if (this.extraOptions?.minWidth !== undefined && this.width / ratio < this.extraOptions.minWidth) {
            this.width = this.extraOptions.minWidth;
            isToFixWidth = false;
        }
        if (this.extraOptions?.minHeight !== undefined && this.height / ratio < this.extraOptions.minHeight) {
            this.height = this.extraOptions.minHeight;
            isToFixHeight = false;
        }
        widthRatio = windowWidth / this.width;
        heightRatio = windowHeight / this.height;
        if (widthRatio < heightRatio) {
            ratio = widthRatio;
        }
        else {
            ratio = heightRatio;
        }
        if (isToFixWidth === true) {
            this.width /= ratio;
        }
        if (isToFixHeight === true) {
            this.height /= ratio;
        }
        if (this.extraOptions?.maxWidth !== undefined && this.width > this.extraOptions.maxWidth) {
            this.width = this.extraOptions.maxWidth;
        }
        if (this.extraOptions?.maxHeight !== undefined && this.height > this.extraOptions.maxHeight) {
            this.height = this.extraOptions.maxHeight;
        }
        this.left = (windowWidth - this.width * ratio) / 2;
        this.top = (windowHeight - this.height * ratio) / 2;
        this.canvas.style({ left: this.left, top: this.top });
        this.letterboxes.left.style({ width: this.left });
        this.letterboxes.top.style({ height: this.top });
        this.letterboxes.right.style({ width: this.left });
        this.letterboxes.bottom.style({ height: this.top });
        this.resize(this.width, this.height, ratio);
    };
    delete() {
        window.removeEventListener("resize", this.windowResizeHandler);
        super.delete();
    }
}
//# sourceMappingURL=Fullscreen.js.map