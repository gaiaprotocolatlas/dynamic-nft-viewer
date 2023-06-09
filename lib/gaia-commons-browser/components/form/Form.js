import GaiaComponent from "../GaiaComponent.js";
export default class Form extends GaiaComponent {
    constructor(options, ...nodes) {
        super("form" + (options.tag ?? ""), ...nodes);
        this.onDom("submit", (event) => event.preventDefault());
    }
}
//# sourceMappingURL=Form.js.map