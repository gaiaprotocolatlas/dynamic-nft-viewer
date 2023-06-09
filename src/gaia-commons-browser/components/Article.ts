import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";

export default class Article extends GaiaComponent {

    constructor(options: {
        tag?: string,
    }, ...nodes: (DomNode | string | undefined)[]) {
        super("article" + (options.tag ?? ""), ...nodes);
    }
}
