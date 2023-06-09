import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
import Tab from "./Tab.js";

export default class Tabs extends GaiaComponent {

    private selectedTab: Tab | undefined;
    private tabs: Tab[] = [];

    constructor(options: {
        tag?: string,
        title?: string,
    }, ...tabs: Tab[]) {
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

    public get data() {
        return this.selectedTab?.data;
    }

    public select(data: any) {
        for (const tab of this.tabs) {
            if (tab.data === data) {
                tab.select();
                return;
            }
        }
    }
}
