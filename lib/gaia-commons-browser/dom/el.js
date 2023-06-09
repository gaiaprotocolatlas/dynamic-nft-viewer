import DomNode from "./DomNode.js";
const el = (tag, ...children) => {
    const domNode = new DomNode(DomNode.createElement(tag));
    for (const child of children) {
        if (child !== undefined) {
            if (typeof child === "string") {
                domNode.appendText(child);
            }
            else if (child instanceof DomNode) {
                domNode.append(child);
            }
            else {
                for (const [name, value] of Object.entries(child)) {
                    if (typeof value === "function") {
                        domNode.onDom(name, value);
                    }
                    else if (name === "style" && typeof value === "object") {
                        domNode.style(value);
                    }
                    else if (value === undefined) {
                        domNode.domElement.removeAttribute(name);
                    }
                    else if (typeof value === "string") {
                        domNode.domElement.setAttribute(name, value);
                    }
                }
            }
        }
    }
    return domNode;
};
export default el;
//# sourceMappingURL=el.js.map