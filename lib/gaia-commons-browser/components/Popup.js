import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
export default class Popup extends DomNode {
    constructor(options) {
        super(".gaia-popup-background");
        this.onDom("click", (event) => {
            if (options.barrierDismissible === true &&
                event.target === this.domElement) {
                this.delete();
            }
        });
        BodyNode.append(this);
    }
}
//# sourceMappingURL=Popup.js.map