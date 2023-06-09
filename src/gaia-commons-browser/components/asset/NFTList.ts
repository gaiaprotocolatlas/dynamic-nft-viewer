import { AssetMetadata } from "gaia-commons-ts";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";
import NFTItem from "./NFTItem.js";

export default class NFTList extends GaiaComponent {

    private itemSet: NFTItem[] = [];

    constructor(options: { metadataSet: AssetMetadata[] }) {
        super(".nft-list");
        this.metatdataSet = options.metadataSet;
    }

    public set metatdataSet(metatdataSet: AssetMetadata[]) {
        this.empty();
        this.itemSet = [];

        this.deleteClass("empty");
        if (metatdataSet.length === 0) {
            this.addClass("empty");
            this.append(new WarningMessageBox({}, msg("gaia-components-nft-list-empty-message")));
        } else {
            for (const metadata of metatdataSet) {
                this.itemSet.push(new NFTItem({ metadata }).appendTo(this));
            }
        }
    }

    public get selectedMetadataSet(): AssetMetadata[] {
        return this.itemSet.filter(item => item.selected).map(item => item.metadata);
    }

    public select(tokenId: string) {
        const item = this.itemSet.find(item => item.metadata.tokenId === tokenId);
        item?.select();
    }
}
