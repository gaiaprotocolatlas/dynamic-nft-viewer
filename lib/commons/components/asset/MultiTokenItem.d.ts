import { BigNumber } from "ethers";
import { AssetMetadata } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
export default class MultiTokenItem extends GaiaComponent {
    private options;
    private checkboxContainer;
    private input;
    constructor(options: {
        metadata: AssetMetadata;
        maxAmount: BigNumber;
    });
    private check;
    private uncheck;
    get metadata(): AssetMetadata;
    get amount(): BigNumber;
    set amount(amount: BigNumber);
}
//# sourceMappingURL=MultiTokenItem.d.ts.map