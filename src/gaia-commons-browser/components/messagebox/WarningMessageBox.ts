import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";

export default class WarningMessageBox extends GaiaComponent {

    constructor(options: { tag?: string }, message: string) {
        super((options.tag ?? "") + ".message-box.warning-message-box");
        this.append(
            el("i.fa-solid.fa-lightbulb"),
            el("p", message),
        );
    }
}
