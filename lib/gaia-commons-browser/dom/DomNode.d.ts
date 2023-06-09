import { TreeNode } from "gaia-commons-ts";
export type Style = {
    [key: string]: string | number | undefined;
};
export type DomEventHandler<ET extends Event, DT extends DomNode> = (event: ET, domNode: DT) => any;
export default class DomNode<EL extends HTMLElement = HTMLElement> extends TreeNode {
    private static readonly NUMBER_STYLE_KEY;
    private static keyframesCount;
    static createElement<EL extends HTMLElement>(tag: string): EL;
    parent: DomNode | undefined;
    children: DomNode[];
    private domEventMap;
    private windowEventMap;
    domElement: EL;
    constructor(domElement: EL | string);
    style(style: Style): this;
    get rect(): DOMRect;
    get innerScrollPosition(): {
        left: number;
        top: number;
    };
    onDom<ET extends Event>(eventName: string, eventHandler: DomEventHandler<ET, this>): void;
    onWindow<ET extends Event>(eventName: string, eventHandler: DomEventHandler<ET, this>): void;
    offDom<ET extends Event>(eventName: string, eventHandler: DomEventHandler<ET, this>): void;
    fireDomEvent(eventName: string): void;
    appendText(text: string): this;
    set text(text: string);
    append(...nodes: (TreeNode | string | undefined)[]): this;
    private checkVisible;
    private fireVisible;
    appendTo(node: DomNode, index?: number): this;
    empty(): this;
    addClass(className: string): void;
    deleteClass(className: string): void;
    hasClass(className: string): boolean;
    toggleClass(className: string): void;
    clone(): DomNode<EL>;
    delete(): void;
    animate(options: {
        keyframes: {
            [key: string]: Style;
        };
        duration?: number;
        timingFunction?: "ease" | "linear" | "ease" | "ease-in" | "ease-out";
        delay?: number;
        iterationCount?: 1 | "infinite";
        direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
        onEnd?: () => void;
    }): void;
}
//# sourceMappingURL=DomNode.d.ts.map