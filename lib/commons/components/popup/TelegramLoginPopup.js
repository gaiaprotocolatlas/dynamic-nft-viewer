import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
const win = window;
export default class TelegramLoginPopup extends Popup {
    content;
    constructor(telegramBotName, onLogin) {
        super({ barrierDismissible: true });
        this.append(this.content = new GaiaComponent(".telegram-login-popup", el("h1", msg("gaia-components-telegram-login-popup-title")), el(".widget-container", el("script", {
            async: true,
            src: "https://telegram.org/js/telegram-widget.js?21",
            "data-telegram-login": telegramBotName,
            "data-size": "large",
            "data-radius": "8",
            "data-onauth": "onTelegramAuth(user)",
            "data-request-access": "write",
        })), el("footer", new Button({
            type: ButtonType.Text,
            title: msg("gaia-components-dialog-close-button"),
            onClick: () => this.delete(),
        }))));
        win.onTelegramAuth = async (user) => {
            onLogin(user);
            this.delete();
        };
    }
}
//# sourceMappingURL=TelegramLoginPopup.js.map