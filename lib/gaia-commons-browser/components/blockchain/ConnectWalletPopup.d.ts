import { BlockchainType } from "gaia-commons-ts";
import DomNode from "../../dom/DomNode.js";
import IWallet from "../../wallets/IWallet.js";
import Popup from "../Popup.js";
export default class ConnectWalletPopup extends Popup {
    private onConnect;
    content: DomNode;
    constructor(chain: BlockchainType | undefined, onConnect: (wallet: IWallet) => void);
    private connected;
}
//# sourceMappingURL=ConnectWalletPopup.d.ts.map