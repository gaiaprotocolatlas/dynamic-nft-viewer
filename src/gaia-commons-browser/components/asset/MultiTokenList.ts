import { BigNumber } from "ethers";
import { AssetMetadata } from "gaia-commons-ts";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import WarningMessageBox from "../messagebox/WarningMessageBox.js";
import MultiTokenItem from "./MultiTokenItem.js";

export default class MultiTokenList extends GaiaComponent {

    private itemSet: MultiTokenItem[] = [];

    constructor(private options: { dataSet: { metadata: AssetMetadata, amount: BigNumber }[] }) {
        super(".multi-token-list");
        const amounts: { [tokenId: string]: BigNumber } = {};
        for (const data of options.dataSet) {
            amounts[data.metadata.tokenId] = data.amount;
        }
        this.amounts = amounts;
    }

    public set amounts(amounts: { [tokenId: string]: BigNumber }) {
        this.empty();
        this.itemSet = [];

        this.deleteClass("empty");
        if (Object.keys(amounts).length === 0) {
            this.addClass("empty");
            this.append(new WarningMessageBox({}, msg("gaia-components-nft-list-empty-message")));
        } else {
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

    public get amounts(): { [tokenId: string]: BigNumber } {
        const amounts: { [tokenId: string]: BigNumber } = {};
        for (const item of this.itemSet) {
            amounts[item.metadata.tokenId] = item.amount;
        }
        return amounts;
    }

    public setAmount(tokenId: string, amount: BigNumber) {
        const item = this.itemSet.find(item => item.metadata.tokenId === tokenId);
        if (item !== undefined) {
            item.amount = amount;
        }
    }
}
