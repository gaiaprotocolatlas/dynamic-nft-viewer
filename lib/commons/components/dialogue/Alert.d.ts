import DomNode from "../../dom/DomNode.js";
import Popup from "../Popup.js";
export default class Alert extends Popup {
    content: DomNode;
    constructor(title: string, message: string, callback?: () => void);
}
//# sourceMappingURL=Alert.d.ts.map