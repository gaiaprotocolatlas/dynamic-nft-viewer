import DomNode, { Style } from "./DomNode.js";
export type EventHandler<EV, EL extends HTMLElement> = (event: EV, domNode: DomNode<EL>) => void;
interface Attributes<EL extends HTMLElement> {
    [name: string]: Style | string | number | boolean | undefined | EventHandler<any, EL>;
}
export type Child<EL extends HTMLElement> = Attributes<HTMLElement> | DomNode<EL> | string | undefined;
declare const el: <EL extends HTMLElement>(tag: string, ...children: Child<EL>[]) => DomNode<EL>;
export default el;
//# sourceMappingURL=el.d.ts.map