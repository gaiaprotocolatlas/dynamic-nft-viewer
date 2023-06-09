import { ethers, utils } from "ethers";
import { BlockchainInfos, EventContainer, WalletType } from "gaia-commons-ts";
import Constants from "../Constants.js";
import Store from "../Store.js";
class Kaikas extends EventContainer {
    walletType = WalletType.Kaikas;
    provider;
    signer;
    klaytn = window.klaytn;
    get installed() { return this.klaytn !== undefined && this.klaytn.isKaikas === true; }
    store = new Store("kaikas-store");
    constructor() {
        super();
        if (this.installed === true) {
            this.provider = new ethers.providers.Web3Provider(this.klaytn);
            this.signer = this.provider.getSigner();
            this.klaytn.on("chainChanged", () => {
                this.provider = new ethers.providers.Web3Provider(this.klaytn);
                this.signer = this.provider.getSigner();
                this.fireEvent("changechain");
            });
            this.klaytn.on("accountsChanged", () => this.fireEvent("changeaccount"));
        }
        this.checkAndFireConnectionEvent();
    }
    async checkAndFireConnectionEvent() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async connect() {
        this.store.delete("temporarily-disconnected");
        if (this.installed === true) {
            await this.klaytn.request({ method: "eth_requestAccounts" });
            this.checkAndFireConnectionEvent();
        }
        else {
            open("https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi", "_blank");
        }
    }
    async connected() {
        return await this.getAddress() !== undefined;
    }
    async getAddress() {
        if (this.store.get("temporarily-disconnected") === true) {
            return undefined;
        }
        return this.provider === undefined ? undefined : (await this.provider.listAccounts())[0];
    }
    async currentChain() {
        if (this.installed === true) {
            const chainId = parseInt(this.klaytn.networkVersion);
            for (const [chain, info] of Object.entries(BlockchainInfos)) {
                if (info.chainId === chainId) {
                    return chain;
                }
            }
        }
        return undefined;
    }
    async changeChain(targetChain) {
        const chainInfo = BlockchainInfos[targetChain];
        if (chainInfo === undefined) {
            throw new Error(`Unknown chain ${targetChain}`);
        }
        else if (this.installed === true) {
            try {
                await this.klaytn.request({
                    method: "wallet_switchEthereumChain", params: [{
                            chainId: ethers.utils.hexValue(chainInfo.chainId),
                        }],
                });
            }
            catch (e) {
                if (e.code === 4902) {
                    try {
                        await this.klaytn.request({
                            method: "wallet_addEthereumChain", params: [{
                                    chainId: ethers.utils.hexValue(chainInfo.chainId),
                                    chainName: chainInfo.name,
                                    nativeCurrency: chainInfo.currency,
                                    rpcUrls: [chainInfo.rpc],
                                    blockExplorerUrls: [chainInfo.blockExplorer]
                                }],
                        });
                        await this.klaytn.request({
                            method: "wallet_switchEthereumChain", params: [{
                                    chainId: ethers.utils.hexValue(chainInfo.chainId),
                                }],
                        });
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else {
                    console.error(e);
                }
            }
        }
    }
    async getBalance() {
        if (this.provider === undefined) {
            throw new Error("Provider is undefined");
        }
        const address = await this.getAddress();
        if (address === undefined) {
            throw new Error("Address is undefined");
        }
        return await this.provider.getBalance(address);
    }
    async signMessage(message) {
        const address = await this.getAddress();
        if (address === undefined) {
            throw new Error("Address is not loaded");
        }
        else {
            return await this.klaytn.request({
                method: "klay_sign",
                params: [address, utils.hexlify(utils.toUtf8Bytes(message))],
            });
        }
    }
    async signMessageForGaiaLogin(nonce) {
        return await this.signMessage(Constants.GAIA_LOGIN_NONCE_PREFIX + nonce);
    }
    async disconnect() {
        this.store.set("temporarily-disconnected", true);
        this.fireEvent("disconnect");
    }
}
export default new Kaikas();
//# sourceMappingURL=Kaikas.js.map