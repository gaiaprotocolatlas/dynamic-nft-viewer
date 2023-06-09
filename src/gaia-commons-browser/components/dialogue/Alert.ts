import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";

export default class Alert extends Popup {

    public content: DomNode;

    constructor(title: string, message: string, callback?: () => void) {
        super({ barrierDismissible: true });
        this.append(this.content = new GaiaComponent(".alert",
            el("h1", title),
            el("p", message),
            el("footer",
                new Button({
                    type: ButtonType.Text,
                    title: msg("gaia-components-dialog-confirm-button"),
                    onClick: () => {
                        if (callback !== undefined) {
                            callback();
                        }
                        this.delete();
                    },
                }),
            ),
        ));
    }
}
