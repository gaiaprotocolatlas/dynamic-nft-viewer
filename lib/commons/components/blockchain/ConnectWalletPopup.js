import { BlockchainType } from "gaia-commons-ts";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import Kaikas from "../../wallets/Kaikas.js";
import MetaMask from "../../wallets/MetaMask.js";
import WalletConnect from "../../wallets/WalletConnect.js";
import GaiaComponent from "../GaiaComponent.js";
import Popup from "../Popup.js";
import Button from "../button/Button.js";
import ButtonType from "../button/ButtonType.js";
import ConnectWalletButton from "./ConnectWalletButton.js";
export default class ConnectWalletPopup extends Popup {
    onConnect;
    content;
    constructor(chain, onConnect) {
        super({ barrierDismissible: true });
        this.onConnect = onConnect;
        this.append(this.content = new GaiaComponent(".connect-wallet-popup", el("header", el("h1", msg("gaia-components-connect-wallet-popup-title")), new Button({
            type: ButtonType.Text,
            icon: el("i.fas.fa-times"),
            onClick: () => this.delete(),
        })), el("p", msg("gaia-components-connect-wallet-popup-description")), el("main", new ConnectWalletButton(MetaMask, () => this.connected(MetaMask)), new ConnectWalletButton(WalletConnect, () => this.connected(WalletConnect)), chain === BlockchainType.Klaytn || chain === undefined ? new ConnectWalletButton(Kaikas, () => this.connected(Kaikas)) : undefined)));
    }
    connected(wallet) {
        this.onConnect(wallet);
        this.delete();
    }
}
//# sourceMappingURL=ConnectWalletPopup.js.map