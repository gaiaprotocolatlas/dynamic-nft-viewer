import el from "../dom/el.js";
import GaiaComponent from "./GaiaComponent.js";
export default class Table extends GaiaComponent {
    tbody;
    constructor(options, ...rows) {
        super((options.tag ?? "") + ".table");
        if (options.headers === undefined) {
            this.append(el("table", this.tbody = el("tbody")));
        }
        else {
            const columnHeaders = [];
            for (const columnHeader of options.headers) {
                columnHeaders.push(el("th" + (columnHeader.tag ?? ""), columnHeader.title));
            }
            this.append(el("table", el("thead", el("tr", ...columnHeaders)), this.tbody = el("tbody")));
        }
        for (const row of rows) {
            this.addRow(row);
        }
    }
    addRow(row) {
        this.tbody.append(row);
    }
    deleteAllRows() {
        this.tbody.empty();
    }
}
//# sourceMappingURL=Table.js.map