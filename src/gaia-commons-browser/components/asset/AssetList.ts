import { Asset } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
import AssetItem from "./AssetItem.js";

export default class AssetList extends GaiaComponent {

    private _assets: Asset[] = [];
    private items: AssetItem[] = [];
    private selectedItem: AssetItem | undefined;

    constructor(options: {
        assets?: Asset[],
    }) {
        super(".asset-list");
        if (options.assets !== undefined) {
            this.assets = options.assets;
        }
    }

    public get selectedAsset() {
        return this.selectedItem?.asset;
    }

    public get selectedAssetId() {
        return this.selectedAsset?.id;
    }

    public set selectedAssetId(id: string | undefined) {
        if (id === undefined) {
            this.selectedItem?.uncheck();
            this.selectedItem = undefined;
        } else {
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

    public get assets(): Asset[] {
        return this._assets;
    }

    public set assets(assets: Asset[]) {

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
                } else {
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
