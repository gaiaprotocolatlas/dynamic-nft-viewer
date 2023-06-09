import { Asset } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
export default class AssetItem extends GaiaComponent {
    asset: Asset;
    private checkboxContainer;
    constructor(asset: Asset);
    check(): void;
    uncheck(): void;
}
//# sourceMappingURL=AssetItem.d.ts.map