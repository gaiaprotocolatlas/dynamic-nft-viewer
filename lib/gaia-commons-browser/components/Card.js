import GaiaComponent from "./GaiaComponent.js";
export default class Card extends GaiaComponent {
    constructor(options, ...nodes) {
        super(".card" + (options.tag ?? ""));
        this.append(...nodes);
    }
}
//# sourceMappingURL=Card.js.map