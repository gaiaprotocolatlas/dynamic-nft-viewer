import DomNode from "../dom/DomNode.js";
import GaiaComponent from "./GaiaComponent.js";
export default class TopBar extends GaiaComponent {
    private logoContainer;
    private menuPanel;
    private menuContainer;
    private menuContainerMain;
    constructor(options: {
        logo: DomNode;
        darkModeLogo?: DomNode;
        menu: {
            name: string;
            uri: string;
        }[];
    }, ...nodes: (DomNode | string | undefined)[]);
    private hideMobileMenu;
}
//# sourceMappingURL=TopBar.d.ts.map