import GaiaComponent from "../GaiaComponent.js";

export default class Tab extends GaiaComponent {

    public data: any;

    constructor(private options: {
        tag?: string,
        title: string,
        data?: any,
    }) {
        super("a.tab" + (options.tag ?? ""));
        this.data = options.data;
        this.appendText(options.title);
        this.onDom("click", () => this.select());
    }

    public select(): void {
        this.addClass("selected");
        this.fireEvent("select");
    }

    public deselect(): void {
        this.deleteClass("selected");
        this.style({
            color: undefined,
            borderBottom: undefined,
        });
    }
}
