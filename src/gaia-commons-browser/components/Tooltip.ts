import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";

export default class Tooltip extends GaiaComponent {

    constructor(options: {
    }, ...nodes: (DomNode | string | undefined)[]) {
        super(".tooltip", ...nodes);
    }

    public show(left: number, top: number) {
        this.style({ left: left - this.rect.width / 2, top: top + 8 });
    }

    public hide() {
        this.style({ left: -999999, top: -999999 })
    }
}
