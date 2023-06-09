import GaiaComponent from "../GaiaComponent.js";
import Tab from "./Tab.js";
export default class Tabs extends GaiaComponent {
    private selectedTab;
    private tabs;
    constructor(options: {
        tag?: string;
        title?: string;
    }, ...tabs: Tab[]);
    get data(): any;
    select(data: any): void;
}
//# sourceMappingURL=Tabs.d.ts.map