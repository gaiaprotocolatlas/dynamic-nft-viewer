import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";
import NFTItem from "./NFTItem.js";
export default class NFTList extends GaiaComponent {
    itemSet = [];
    constructor(options) {
        super(".nft-list");
        this.metatdataSet = options.metadataSet;
    }
    set metatdataSet(metatdataSet) {
        this.empty();
        this.itemSet = [];
        this.deleteClass("empty");
        if (metatdataSet.length === 0) {
            this.addClass("empty");
            this.append(new WarningMessageBox({}, msg("gaia-components-nft-list-empty-message")));
        }
        else {
            for (const metadata of metatdataSet) {
                this.itemSet.push(new NFTItem({ metadata }).appendTo(this));
            }
        }
    }
    get selectedMetadataSet() {
        return this.itemSet.filter(item => item.selected).map(item => item.metadata);
    }
    select(tokenId) {
        const item = this.itemSet.find(item => item.metadata.tokenId === tokenId);
        item?.select();
    }
}
//# sourceMappingURL=NFTList.js.map