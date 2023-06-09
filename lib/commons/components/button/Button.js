import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Button extends GaiaComponent {
    titleContainer;
    constructor(options) {
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
                    options.onClick();
                }
            });
        }
    }
    set title(title) {
        if (this.titleContainer !== undefined) {
            this.titleContainer.text = title;
        }
        else {
            this.append(this.titleContainer = el("span.title", title));
        }
    }
    disable() { this.addClass("disabled"); }
    enable() { this.deleteClass("disabled"); }
}
//# sourceMappingURL=Button.js.map