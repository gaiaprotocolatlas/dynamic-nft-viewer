import GaiaComponent from "../GaiaComponent.js";
export default class Tab extends GaiaComponent {
    private options;
    data: any;
    constructor(options: {
        tag?: string;
        title: string;
        data?: any;
    });
    select(): void;
    deselect(): void;
}
//# sourceMappingURL=Tab.d.ts.map