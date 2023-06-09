import GaiaComponent from "../GaiaComponent.js";
export default class Tab extends GaiaComponent {
    options;
    data;
    constructor(options) {
        super("a.tab" + (options.tag ?? ""));
        this.options = options;
        this.data = options.data;
        this.appendText(options.title);
        this.onDom("click", () => this.select());
    }
    select() {
        this.addClass("selected");
        this.fireEvent("select");
    }
    deselect() {
        this.deleteClass("selected");
        this.style({
            color: undefined,
            borderBottom: undefined,
        });
    }
}
//# sourceMappingURL=Tab.js.map