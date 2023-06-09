import TelegramUser from "../../TelegramUser.js";
import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class TelegramLoginPopup extends Popup {
    content: DomNode;
    constructor(telegramBotName: string, onLogin: (user: TelegramUser) => void);
}
//# sourceMappingURL=TelegramLoginPopup.d.ts.map