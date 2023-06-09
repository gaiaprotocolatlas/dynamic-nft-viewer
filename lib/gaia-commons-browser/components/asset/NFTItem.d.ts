import { AssetMetadata } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
export default class NFTItem extends GaiaComponent {
    private options;
    private checkboxContainer;
    selected: boolean;
    constructor(options: {
        metadata: AssetMetadata;
    });
    select(): void;
    deselect(): void;
    toggle(): void;
    get metadata(): AssetMetadata;
}
//# sourceMappingURL=NFTItem.d.ts.map