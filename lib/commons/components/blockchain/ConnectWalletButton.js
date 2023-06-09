import { WalletInfos } from "gaia-commons-ts";
import ResponsiveImage from "../../dom/ResponsiveImage.js";
import el from "../../dom/el.js";
import GaiaComponent from "../GaiaComponent.js";
export default class ConnectWalletButton extends GaiaComponent {
    constructor(wallet, callback) {
        super("a.connect-wallet-button");
        const info = WalletInfos[wallet.walletType];
        this.append(info.image.endsWith(".svg") ?
            el("img", { src: info.image }) :
            new ResponsiveImage("img", info.image), el("span", info.name), el("i.fa-solid.fa-chevron-right"));
        this.style({
            backgroundColor: info.backgroundColor,
            color: info.textColor,
        });
        this.onDom("click", async () => {
            await wallet.connect();
            callback();
        });
    }
}
//# sourceMappingURL=ConnectWalletButton.js.map