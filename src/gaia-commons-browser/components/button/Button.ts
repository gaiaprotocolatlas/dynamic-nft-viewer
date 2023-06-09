import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
import ButtonType from "./ButtonType.js";

export default class Button extends GaiaComponent<HTMLAnchorElement> {

    private titleContainer: DomNode | undefined;

    constructor(options: {
        tag?: string,
        type?: ButtonType,
        icon?: DomNode,
        title?: string | DomNode,
        href?: string,
        disabled?: boolean,
        onClick?: () => void,
    }) {
        super("a.button" + (options.type !== undefined ? "." + options.type : ".contained") + (options.tag ?? ""));
        if (options.icon !== undefined) {
            this.append(options.icon);
        }
        if (options.title !== undefined) {
            this.append(this.titleContainer = el("span.title", options.title));
        }
        if (options.href !== undefined) {
            this.domElement.href = options.href;
            this.domElement.target = "_blank";
        }
        if (options.disabled === true) {
            this.disable();
        }
        if (options.onClick !== undefined) {
            this.onDom("click", () => {
                if (this.hasClass("disabled") !== true) {
                    options.onClick!();
                }
            });
        }
    }

    public set title(title: string) {
        if (this.titleContainer !== undefined) {
            this.titleContainer.text = title;
        } else {
            this.append(this.titleContainer = el("span.title", title));
        }
    }

    public disable(): void { this.addClass("disabled"); }
    public enable(): void { this.deleteClass("disabled"); }
}
