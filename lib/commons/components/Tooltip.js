import GaiaComponent from "./GaiaComponent.js";
export default class Tooltip extends GaiaComponent {
    constructor(options, ...nodes) {
        super(".tooltip", ...nodes);
    }
    show(left, top) {
        this.style({ left: left - this.rect.width / 2, top: top + 8 });
    }
    hide() {
        this.style({ left: -999999, top: -999999 });
    }
}
//# sourceMappingURL=Tooltip.js.map