import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";
import MultiTokenItem from "./MultiTokenItem.js";
export default class MultiTokenList extends GaiaComponent {
    options;
    itemSet = [];
    constructor(options) {
        super(".multi-token-list");
        this.options = options;
        const amounts = {};
        for (const data of options.dataSet) {
            amounts[data.metadata.tokenId] = data.amount;
        }
        this.amounts = amounts;
    }
    set amounts(amounts) {
        this.empty();
        this.itemSet = [];
        this.deleteClass("empty");
        if (Object.keys(amounts).length === 0) {
            this.addClass("empty");
            this.append(new WarningMessageBox({}, msg("gaia-components-nft-list-empty-message")));
        }
        else {
            for (const [tokenId, amount] of Object.entries(amounts)) {
                const data = this.options.dataSet.find(data => data.metadata.tokenId === tokenId);
                if (data !== undefined) {
                    this.itemSet.push(new MultiTokenItem({
                        metadata: data.metadata,
                        maxAmount: amount,
                    }).appendTo(this));
                }
            }
        }
    }
    get amounts() {
        const amounts = {};
        for (const item of this.itemSet) {
            amounts[item.metadata.tokenId] = item.amount;
        }
        return amounts;
    }
    setAmount(tokenId, amount) {
        const item = this.itemSet.find(item => item.metadata.tokenId === tokenId);
        if (item !== undefined) {
            item.amount = amount;
        }
    }
}
//# sourceMappingURL=MultiTokenList.js.map