import { utils } from "ethers";
import Input from "./Input.js";
export default class TokenAmountInput extends Input {
    constructor(options) {
        super({
            tag: (options.tag ?? "") + ".token-amount-input",
            label: options.label,
            placeholder: options.placeholder,
            disabled: options.disabled,
        });
    }
    get amount() {
        return utils.parseEther(this.value);
    }
    set amount(amount) {
        this.value = utils.formatEther(amount);
    }
}
//# sourceMappingURL=TokenAmountInput.js.map