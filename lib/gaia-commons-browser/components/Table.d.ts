import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";
export default class Table extends GaiaComponent {
    private tbody;
    constructor(options: {
        tag?: string;
        headers?: {
            title: string;
            tag?: string;
        }[];
    }, ...rows: DomNode[]);
    addRow(row: DomNode): void;
    deleteAllRows(): void;
}
//# sourceMappingURL=Table.d.ts.map