import GaiaComponent from "../GaiaComponent.js";
import AssetItem from "./AssetItem.js";
export default class AssetList extends GaiaComponent {
    _assets = [];
    items = [];
    selectedItem;
    constructor(options) {
        super(".asset-list");
        if (options.assets !== undefined) {
            this.assets = options.assets;
        }
    }
    get selectedAsset() {
        return this.selectedItem?.asset;
    }
    get selectedAssetId() {
        return this.selectedAsset?.id;
    }
    set selectedAssetId(id) {
        if (id === undefined) {
            this.selectedItem?.uncheck();
            this.selectedItem = undefined;
        }
        else {
            for (const item of this.items) {
                if (item.asset.id === id) {
                    this.selectedItem?.uncheck();
                    this.selectedItem = item;
                    this.selectedItem.check();
                    break;
                }
            }
        }
        this.fireEvent("select", this.selectedAsset);
    }
    get assets() {
        return this._assets;
    }
    set assets(assets) {
        for (const item of this.items) {
            item.delete();
        }
        this.items = [];
        this._assets = assets;
        for (const asset of assets) {
            const item = new AssetItem(asset);
            item.on("select", () => {
                if (this.selectedItem === item) {
                    this.selectedItem.uncheck();
                    this.selectedItem = undefined;
                }
                else {
                    this.selectedItem?.uncheck();
                    this.selectedItem = item;
                    this.selectedItem.check();
                }
                this.fireEvent("select", this.selectedAsset);
            });
            this.items.push(item);
            this.append(item);
        }
    }
}
//# sourceMappingURL=AssetList.js.map