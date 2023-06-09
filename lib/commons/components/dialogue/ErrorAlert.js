import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import ErrorMessageBox from "../messagebox/ErrorMessageBox.js";
export default class ErrorAlert extends Popup {
    content;
    constructor(title, message, callback) {
        super({ barrierDismissible: true });
        this.append(this.content = new GaiaComponent(".error-alert", new ErrorMessageBox({}, title), el("p", message), el("footer", new Button({
            type: ButtonType.Text,
            title: msg("gaia-components-dialog-confirm-button"),
            onClick: () => {
                if (callback !== undefined) {
                    callback();
                }
                this.delete();
            },
        }))));
    }
}
//# sourceMappingURL=ErrorAlert.js.map