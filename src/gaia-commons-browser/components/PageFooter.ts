import el from "../dom/el.js";
import GaiaComponent from "./GaiaComponent.js";

export default class PageFooter extends GaiaComponent {

    constructor(options: {
        copyrightYear: number,
        companyName: string,
    }) {
        super("footer.page-footer");
        this.append(
            el("main",
                el("p.copyright", `Copyright © ${options.copyrightYear} ${options.companyName}.`),
            ),
        );
    }
}
