import { Asset } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
export default class AssetList extends GaiaComponent {
    private _assets;
    private items;
    private selectedItem;
    constructor(options: {
        assets?: Asset[];
    });
    get selectedAsset(): Asset | undefined;
    get selectedAssetId(): string | undefined;
    set selectedAssetId(id: string | undefined);
    get assets(): Asset[];
    set assets(assets: Asset[]);
}
//# sourceMappingURL=AssetList.d.ts.map