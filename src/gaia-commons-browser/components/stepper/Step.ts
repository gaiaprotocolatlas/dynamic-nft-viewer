import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import GaiaComponent from "../GaiaComponent.js";

export default class Step extends GaiaComponent {

    private _index: number = 0;

    private titleContainer: DomNode;
    private indexContainer: DomNode;
    private continueButton: Button;
    private backButton: Button;

    constructor(private options: {
        tag?: string,
        title: string,
        continueButtonTitle?: string,
        onOpen?: () => void,
        checkContinue?: () => Promise<boolean>,
    }, ...nodes: (DomNode | string | undefined)[]) {
        super((options.tag ?? "") + ".step");
        this.append(
            el("header",
                this.indexContainer = el("span.index"),
                this.titleContainer = el("h1", options.title),
            ),
            el("main",
                ...nodes,
                el("footer",
                    this.continueButton = new Button({ title: options.continueButtonTitle ?? msg("gaia-components-stepper-continue-button") }),
                    this.backButton = new Button({ type: ButtonType.Text, title: msg("gaia-components-stepper-back-button") }),
                ),
            ),
        );

        this.continueButton.onDom("click", async () => {
            if (options.checkContinue !== undefined && !await options.checkContinue()) {
                return;
            }
            this.fireEvent("continue");
        });
        this.backButton.onDom("click", () => this.fireEvent("back"));
    }

    public set index(index: number) {
        this._index = index;
        this.indexContainer.text = (index + 1).toString();
        if (index === 0) {
            this.backButton.disable();
        }
    }

    public set title(title: string) {
        this.titleContainer.text = title;
    }

    public show(): void {
        this.deleteClass("hidden");
        if (this.options.onOpen !== undefined) {
            this.options.onOpen();
        }
    }

    public hide(): void { this.addClass("hidden"); }

    public check(): void { this.indexContainer.empty().append(el("i.fa-solid.fa-check")); }
    public uncheck(): void { this.indexContainer.text = (this._index + 1).toString(); }
}
