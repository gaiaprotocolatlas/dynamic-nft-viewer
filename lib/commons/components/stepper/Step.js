import el from "../../dom/el.js";
import msg from "../../msg.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Step extends GaiaComponent {
    options;
    _index = 0;
    titleContainer;
    indexContainer;
    continueButton;
    backButton;
    constructor(options, ...nodes) {
        super((options.tag ?? "") + ".step");
        this.options = options;
        this.append(el("header", this.indexContainer = el("span.index"), this.titleContainer = el("h1", options.title)), el("main", ...nodes, el("footer", this.continueButton = new Button({ title: options.continueButtonTitle ?? msg("gaia-components-stepper-continue-button") }), this.backButton = new Button({ type: ButtonType.Text, title: msg("gaia-components-stepper-back-button") }))));
        this.continueButton.onDom("click", async () => {
            if (options.checkContinue !== undefined && !await options.checkContinue()) {
                return;
            }
            this.fireEvent("continue");
        });
        this.backButton.onDom("click", () => this.fireEvent("back"));
    }
    set index(index) {
        this._index = index;
        this.indexContainer.text = (index + 1).toString();
        if (index === 0) {
            this.backButton.disable();
        }
    }
    set title(title) {
        this.titleContainer.text = title;
    }
    show() {
        this.deleteClass("hidden");
        if (this.options.onOpen !== undefined) {
            this.options.onOpen();
        }
    }
    hide() { this.addClass("hidden"); }
    check() { this.indexContainer.empty().append(el("i.fa-solid.fa-check")); }
    uncheck() { this.indexContainer.text = (this._index + 1).toString(); }
}
//# sourceMappingURL=Step.js.map