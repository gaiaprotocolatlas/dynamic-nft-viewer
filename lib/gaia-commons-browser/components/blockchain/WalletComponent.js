import { StringUtil } from "gaia-commons-ts";
import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
import Jazzicon from "./Jazzicon.js";
export default class WalletComponent extends GaiaComponent {
    walletManager;
    container;
    menuContainer;
    constructor(walletManager) {
        super(".wallet-component");
        this.walletManager = walletManager;
        this.append(this.container = el("main"), this.menuContainer = el(".menu-container"));
        this.onWindow("mousedown", () => this.deleteClass("open"));
        this.load();
    }
    async load() {
        this.walletManager.on("connect", () => this.load());
        this.walletManager.on("changeaccount", () => this.load());
        this.walletManager.on("disconnect", () => this.load());
        const address = await this.walletManager.address();
        if (address !== undefined) {
            this.container.empty().append(el("a.wallet-address", el("img", { src: "data:image/svg+xml;base64," + btoa(Jazzicon(address)) }), StringUtil.shortenEthereumAddress(address), {
                mousedown: (event) => {
                    event.stopPropagation();
                    this.toggleClass("open");
                },
            }));
            this.menuContainer.empty().append(el("a.menu", el("i.fa-solid.fa-unlink"), " ", "Disconnect", {
                mousedown: () => this.walletManager?.disconnect(),
            }));
        }
        else {
            this.container.empty().append(el("a.connect-button", el("i.fa-solid.fa-wallet"), " ", "Connect", {
                mousedown: () => this.walletManager?.connect(),
            }));
            this.menuContainer.empty();
        }
    }
}
//# sourceMappingURL=WalletComponent.js.map