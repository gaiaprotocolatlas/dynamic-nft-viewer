import { BlockchainType, EventContainer } from "gaia-commons-ts";
import ConnectWalletPopup from "../components/blockchain/ConnectWalletPopup.js";
import Kaikas from "./Kaikas.js";
import Klip from "./Klip.js";
import MetaMask from "./MetaMask.js";
import WalletConnect from "./WalletConnect.js";
export default class WalletManager extends EventContainer {
    chain;
    static wallets = {
        [BlockchainType.Ethereum]: [MetaMask, WalletConnect],
        [BlockchainType.Polygon]: [MetaMask, WalletConnect],
        [BlockchainType.BNB]: [MetaMask, WalletConnect],
        [BlockchainType.Klaytn]: [Kaikas, Klip, MetaMask, WalletConnect],
        [BlockchainType.Bifrost]: [MetaMask, WalletConnect],
    };
    __connectedWallet;
    constructor(chain) {
        super();
        this.chain = chain;
        this.init();
    }
    async init() {
        if (this.chain === undefined) {
            for (const wallet of [...new Set(Object.values(WalletManager.wallets).flat())]) {
                if (await wallet.connected() === true) {
                    this._connectedWallet = wallet;
                    break;
                }
            }
        }
        else {
            for (const wallet of WalletManager.wallets[this.chain]) {
                if (await wallet.connected() === true) {
                    this._connectedWallet = wallet;
                    break;
                }
            }
        }
        if (this._connectedWallet !== undefined) {
            this.fireEvent("connect");
        }
    }
    set _connectedWallet(wallet) {
        if (this.__connectedWallet !== undefined) {
            this.offDelegate(this.__connectedWallet);
        }
        this.__connectedWallet = wallet;
        if (wallet !== undefined) {
            this.onDelegate(wallet, "changechain", () => this.fireEvent("changechain"));
            this.onDelegate(wallet, "changeaccount", () => this.fireEvent("changeaccount"));
        }
    }
    get _connectedWallet() {
        return this.__connectedWallet;
    }
    get provider() {
        const provider = this._connectedWallet?.provider;
        if (provider === undefined) {
            throw new Error("provider is undefined");
        }
        return provider;
    }
    get signer() {
        const signer = this._connectedWallet?.signer;
        if (signer === undefined) {
            throw new Error("signer is undefined");
        }
        return signer;
    }
    async connectedWallet() {
        if (await this._connectedWallet?.connected() === true) {
            return this._connectedWallet;
        }
    }
    async connected() {
        return await this.connectedWallet() !== undefined;
    }
    async connect() {
        if (await this.connectedWallet() === undefined) {
            new ConnectWalletPopup(this.chain, (wallet) => {
                this._connectedWallet = wallet;
                this.fireEvent("connect");
            });
        }
    }
    async currentChain() {
        return (await this.connectedWallet())?.currentChain();
    }
    async changeToTargetChain() {
        if (this.chain === undefined) {
            throw new Error("chain is undefined");
        }
        (await this.connectedWallet())?.changeChain(this.chain);
    }
    async getBalance() {
        const wallet = await this.connectedWallet();
        if (wallet === undefined) {
            throw new Error("wallet is undefined");
        }
        return await wallet.getBalance();
    }
    async address() {
        return (await this.connectedWallet())?.getAddress();
    }
    async disconnect() {
        if (this._connectedWallet !== undefined) {
            await this._connectedWallet.disconnect();
            this._connectedWallet = undefined;
            this.fireEvent("disconnect");
        }
    }
}
//# sourceMappingURL=WalletManager.js.map