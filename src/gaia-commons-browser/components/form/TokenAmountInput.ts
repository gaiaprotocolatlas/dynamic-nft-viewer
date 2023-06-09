import { BigNumber, utils } from "ethers";
import Input from "./Input.js";

export default class TokenAmountInput extends Input {

    constructor(options: {
        tag?: string,
        label: string,
        placeholder?: string,
        disabled?: boolean,
    }) {
        super({
            tag: (options.tag ?? "") + ".token-amount-input",
            label: options.label,
            placeholder: options.placeholder,
            disabled: options.disabled,
        });
    }

    public get amount(): BigNumber {
        return utils.parseEther(this.value);
    }

    public set amount(amount: BigNumber) {
        this.value = utils.formatEther(amount);
    }
}
