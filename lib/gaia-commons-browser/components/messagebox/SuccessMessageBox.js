import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class SuccessMessageBox extends GaiaComponent {
    constructor(options, message) {
        super((options.tag ?? "") + ".message-box.success-message-box");
        this.append(el("i.fa-solid.fa-check-circle"), el("p", message));
    }
}
//# sourceMappingURL=SuccessMessageBox.js.map