import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class Tabs extends GaiaComponent {
    selectedTab;
    tabs = [];
    constructor(options, ...tabs) {
        super(".tabs" + (options.tag ?? ""));
        this.tabs = tabs;
        if (options.title !== undefined) {
            this.append(el(".title", options.title));
        }
        this.append(...tabs);
        for (const tab of tabs) {
            tab.on("select", () => {
                this.selectedTab?.deselect();
                this.selectedTab = tab;
                this.fireEvent("select", tab.data);
            });
        }
    }
    get data() {
        return this.selectedTab?.data;
    }
    select(data) {
        for (const tab of this.tabs) {
            if (tab.data === data) {
                tab.select();
                return;
            }
        }
    }
}
//# sourceMappingURL=Tabs.js.map