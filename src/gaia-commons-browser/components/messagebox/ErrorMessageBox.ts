import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";

export default class ErrorMessageBox extends GaiaComponent {

    private messageContainer: DomNode;

    constructor(options: { tag?: string }, message?: string) {
        super((options.tag ?? "") + ".message-box.error-message-box");
        this.append(
            el("i.fa-light.fa-triangle-exclamation"),
            this.messageContainer = el("p", message),
        );
    }

    public set message(message: string) {
        this.messageContainer.text = message;
    }
}
