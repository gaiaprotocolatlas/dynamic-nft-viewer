import DomNode from "../../gaia-commons-browser/dom/DomNode.js";
export default class Letterbox extends DomNode {
    constructor() {
        super(document.createElement("div"));
        this.style({
            position: "absolute",
            zIndex: 9999998,
            backgroundColor: "#000000",
        });
    }
}
//# sourceMappingURL=Letterbox.js.map