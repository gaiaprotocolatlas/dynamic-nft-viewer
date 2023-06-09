import DomNode from "./DomNode.js";

class BodyNode extends DomNode<HTMLBodyElement> {

    constructor() {
        super(document.body as any);
    }
}

export default new BodyNode();
