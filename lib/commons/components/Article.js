import GaiaComponent from "./GaiaComponent.js";
export default class Article extends GaiaComponent {
    constructor(options, ...nodes) {
        super("article" + (options.tag ?? ""), ...nodes);
    }
}
//# sourceMappingURL=Article.js.map