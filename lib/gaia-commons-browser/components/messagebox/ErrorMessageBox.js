import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class ErrorMessageBox extends GaiaComponent {
    messageContainer;
    constructor(options, message) {
        super((options.tag ?? "") + ".message-box.error-message-box");
        this.append(el("i.fa-light.fa-triangle-exclamation"), this.messageContainer = el("p", message));
    }
    set message(message) {
        this.messageContainer.text = message;
    }
}
//# sourceMappingURL=ErrorMessageBox.js.map