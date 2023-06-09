import { BigNumber } from "ethers";
import Input from "./Input.js";
export default class TokenAmountInput extends Input {
    constructor(options: {
        tag?: string;
        label: string;
        placeholder?: string;
        disabled?: boolean;
    });
    get amount(): BigNumber;
    set amount(amount: BigNumber);
}
//# sourceMappingURL=TokenAmountInput.d.ts.map