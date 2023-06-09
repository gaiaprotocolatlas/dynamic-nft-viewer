import DomNode from "../dom/DomNode.js";
export default abstract class Popup extends DomNode {
    abstract content: DomNode | undefined;
    constructor(options: {
        barrierDismissible: boolean;
    });
}
//# sourceMappingURL=Popup.d.ts.map