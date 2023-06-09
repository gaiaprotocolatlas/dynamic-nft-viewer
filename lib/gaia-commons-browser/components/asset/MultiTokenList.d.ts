import { BigNumber } from "ethers";
import { AssetMetadata } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
export default class MultiTokenList extends GaiaComponent {
    private options;
    private itemSet;
    constructor(options: {
        dataSet: {
            metadata: AssetMetadata;
            amount: BigNumber;
        }[];
    });
    set amounts(amounts: {
        [tokenId: string]: BigNumber;
    });
    get amounts(): {
        [tokenId: string]: BigNumber;
    };
    setAmount(tokenId: string, amount: BigNumber): void;
}
//# sourceMappingURL=MultiTokenList.d.ts.map