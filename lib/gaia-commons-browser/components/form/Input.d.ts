import GaiaComponent from "../GaiaComponent.js";
export default class Input extends GaiaComponent {
    private input;
    private previousValue;
    constructor(options: {
        tag?: string;
        label: string;
        placeholder?: string;
        disabled?: boolean;
    });
    get value(): string;
    set value(value: string);
    private active;
    private inactive;
}
//# sourceMappingURL=Input.d.ts.map