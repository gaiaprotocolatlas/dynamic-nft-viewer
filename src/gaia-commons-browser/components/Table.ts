import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import GaiaComponent from "./GaiaComponent.js";

export default class Table extends GaiaComponent {

    private tbody: DomNode;

    constructor(options: {
        tag?: string,
        headers?: {
            title: string,
            tag?: string,
        }[],
    }, ...rows: DomNode[]) {
        super((options.tag ?? "") + ".table");

        if (options.headers === undefined) {
            this.append(
                el("table",
                    this.tbody = el("tbody"),
                ),
            );
        }

        else {

            const columnHeaders: DomNode[] = [];
            for (const columnHeader of options.headers) {
                columnHeaders.push(el("th" + (columnHeader.tag ?? ""), columnHeader.title));
            }

            this.append(
                el("table",
                    el("thead", el("tr", ...columnHeaders)),
                    this.tbody = el("tbody"),
                ),
            );
        }

        for (const row of rows) {
            this.addRow(row);
        }
    }

    public addRow(row: DomNode) {
        this.tbody.append(row);
    }

    public deleteAllRows() {
        this.tbody.empty();
    }
}
