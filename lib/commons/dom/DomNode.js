import { ArrayUtil, TreeNode } from "gaia-commons-ts";
export default class DomNode extends TreeNode {
    static NUMBER_STYLE_KEY = [
        "zIndex",
        "opacity",
        "flexGrow",
        "flexShrink",
        "gridGap",
        "order",
        "zoom",
    ];
    static keyframesCount = 0;
    static createElement(tag) {
        let id;
        const idIndex = tag.indexOf("#");
        if (idIndex !== -1) {
            id = tag.substring(idIndex + 1);
            tag = tag.substring(0, idIndex);
            const cindex = id.indexOf(".");
            if (cindex !== -1) {
                tag += id.substring(cindex);
                id = id.substring(0, cindex);
            }
        }
        let className;
        const classNameIndex = tag.indexOf(".");
        if (classNameIndex !== -1) {
            className = tag.substring(classNameIndex + 1).replace(/\./g, " ");
            tag = tag.substring(0, classNameIndex);
        }
        if (tag === "") {
            tag = "div";
        }
        const element = document.createElement(tag);
        if (id !== undefined) {
            element.id = id;
        }
        if (className !== undefined) {
            element.className = className;
        }
        return element;
    }
    children = [];
    domEventMap = {};
    windowEventMap = {};
    domElement;
    constructor(domElement) {
        super();
        if (domElement instanceof HTMLElement) {
            this.domElement = domElement;
        }
        else {
            this.domElement = DomNode.createElement(domElement);
        }
    }
    style(style) {
        for (const [key, value] of Object.entries(style)) {
            if (value === undefined) {
                this.domElement.style[key] = null;
            }
            else if (typeof value === "number" && DomNode.NUMBER_STYLE_KEY.includes(key) !== true) {
                this.domElement.style[key] = `${value}px`;
            }
            else {
                this.domElement.style[key] = value;
            }
        }
        return this;
    }
    get rect() {
        return this.domElement.getBoundingClientRect();
    }
    get innerScrollPosition() {
        let left = 0;
        let top = 0;
        if (this.domElement !== document.body) {
            let parent = this.domElement.parentNode;
            while (parent !== document.body && parent !== null) {
                if (parent instanceof HTMLElement) {
                    left += parent.scrollLeft;
                    top += parent.scrollTop;
                }
                parent = parent.parentNode;
            }
        }
        return { left, top };
    }
    onDom(eventName, eventHandler) {
        if (this.domEventMap[eventName] === undefined) {
            this.domEventMap[eventName] = [];
        }
        const domEventHandler = (event) => eventHandler(event, this);
        this.domEventMap[eventName].push({ eventHandler, domEventHandler });
        this.domElement.addEventListener(eventName, domEventHandler);
    }
    onWindow(eventName, eventHandler) {
        if (this.windowEventMap[eventName] === undefined) {
            this.windowEventMap[eventName] = [];
        }
        const domEventHandler = (event) => eventHandler(event, this);
        this.windowEventMap[eventName].push({ eventHandler, domEventHandler });
        window.addEventListener(eventName, domEventHandler);
    }
    offDom(eventName, eventHandler) {
        const domEvents = this.domEventMap[eventName];
        if (domEvents !== undefined) {
            const domEvent = domEvents.find((de) => de.eventHandler === eventHandler);
            if (domEvent !== undefined) {
                this.domElement.removeEventListener(eventName, domEvent.domEventHandler);
                ArrayUtil.pull(domEvents, domEvent);
                if (domEvents.length === 0) {
                    delete this.domEventMap[eventName];
                }
            }
        }
    }
    fireDomEvent(eventName) {
        this.domElement.dispatchEvent(new Event(eventName));
    }
    appendText(text) {
        if (this.domElement.tagName === "TEXTAREA") {
            this.domElement.append(text);
        }
        else {
            const fragment = new DocumentFragment();
            const strs = text.split("\n");
            for (const [index, str] of strs.entries()) {
                if (index > 0) {
                    fragment.append(document.createElement("br"));
                }
                fragment.append(str);
            }
            this.domElement.append(fragment);
        }
        return this;
    }
    set text(text) {
        this.empty().appendText(text);
    }
    append(...nodes) {
        for (const node of nodes) {
            if (typeof node === "string") {
                this.appendText(node);
            }
            else if (node !== undefined) {
                node.appendTo(this);
            }
        }
        return this;
    }
    checkVisible() {
        if (this.parent !== undefined) {
            if (this.parent.domElement === document.body) {
                return true;
            }
            else {
                return this.parent.checkVisible();
            }
        }
        return false;
    }
    fireVisible() {
        this.fireEvent("visible");
        for (const child of this.children) {
            child.fireVisible();
        }
    }
    appendTo(node, index) {
        if (index !== undefined && index < node.children.length) {
            node.domElement.insertBefore(this.domElement, node.children[index].domElement);
        }
        else {
            node.domElement.append(this.domElement);
        }
        const that = super.appendTo(node, index);
        if (this.checkVisible() === true) {
            this.fireVisible();
        }
        return that;
    }
    empty() {
        super.empty();
        while (this.domElement.firstChild) {
            this.domElement.removeChild(this.domElement.firstChild);
        }
        return this;
    }
    addClass(className) { this.domElement.classList.add(className); }
    deleteClass(className) { this.domElement.classList.remove(className); }
    hasClass(className) { return this.domElement.classList.contains(className); }
    toggleClass(className) { this.domElement.classList.toggle(className); }
    clone() { return new DomNode(this.domElement.cloneNode(true)); }
    delete() {
        this.domElement.remove();
        this.domEventMap = undefined;
        for (const [eventName, domEvents] of Object.entries(this.windowEventMap)) {
            for (const domEvent of domEvents) {
                window.removeEventListener(eventName, domEvent.domEventHandler);
            }
        }
        this.windowEventMap = undefined;
        super.delete();
    }
    animate(options) {
        const duration = options.duration === undefined ? 0.5 : options.duration;
        const timingFunction = options.timingFunction === undefined ? "ease" : options.timingFunction;
        const delay = options.delay === undefined ? 0 : options.delay;
        const iterationCount = options.iterationCount === undefined ? 1 : options.iterationCount;
        const direction = options.direction === undefined ? "normal" : options.direction;
        const keyframesName = "__KEYFRAMES_" + DomNode.keyframesCount;
        DomNode.keyframesCount += 1;
        let keyframesStr = "";
        let keyframesStartStyle = {};
        let keyframesFinalStyle = {};
        for (const [key, style] of Object.entries(options.keyframes)) {
            keyframesStr += key + "{";
            for (let [name, value] of Object.entries(style)) {
                if (typeof value === "number" && name !== "zIndex" && name !== "opacity") {
                    value = value + "px";
                }
                keyframesStr += name.replace(/([A-Z])/g, "-$1").toLowerCase() + ":" + value + ";";
            }
            keyframesStr += "}";
            if (key === "from" || key === "0%") {
                keyframesStartStyle = style;
            }
            else if (key === "to" || key === "100%") {
                keyframesFinalStyle = style;
            }
        }
        let keyframesStyleEl = document.createElement("style");
        keyframesStyleEl.setAttribute("type", "text/css");
        keyframesStyleEl.appendChild(document.createTextNode("@keyframes " + keyframesName + "{" + keyframesStr + "}"));
        document.getElementsByTagName("head")[0].appendChild(keyframesStyleEl);
        this.style(keyframesStartStyle);
        this.style({ animation: keyframesName + " " + duration + "s " + timingFunction + " " + delay + "s " + iterationCount + " " + direction });
        this.style(keyframesFinalStyle);
        if (iterationCount === 1) {
            setTimeout(() => {
                if (this.deleted !== true && options.onEnd !== undefined) {
                    options.onEnd();
                }
                keyframesStyleEl.remove();
            }, duration * 1000);
        }
    }
}
//# sourceMappingURL=DomNode.js.map