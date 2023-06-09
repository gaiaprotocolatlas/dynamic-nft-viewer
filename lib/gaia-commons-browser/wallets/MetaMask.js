import { ethers, utils } from "ethers";
import { BlockchainInfos, EventContainer, WalletType } from "gaia-commons-ts";
import Constants from "../Constants.js";
import Store from "../Store.js";
class MetaMask extends EventContainer {
    walletType = WalletType.MetaMask;
    provider;
    signer;
    ethereum = window.ethereum;
    get installed() { return this.ethereum !== undefined && this.ethereum.isMetaMask === true; }
    store = new Store("metamask-store");
    constructor() {
        super();
        if (this.installed === true) {
            this.provider = new ethers.providers.Web3Provider(this.ethereum);
            this.signer = this.provider.getSigner();
            this.ethereum.on("chainChanged", () => {
                this.provider = new ethers.providers.Web3Provider(this.ethereum);
                this.signer = this.provider.getSigner();
                this.fireEvent("changechain");
            });
            this.ethereum.on("accountsChanged", () => this.fireEvent("changeaccount"));
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
            await this.ethereum.request({ method: "eth_requestAccounts" });
            this.checkAndFireConnectionEvent();
        }
        else {
            open("https://metamask.io/download/", "_blank");
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
            const chainId = parseInt(this.ethereum.networkVersion);
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
                await this.ethereum.request({
                    method: "wallet_switchEthereumChain", params: [{
                            chainId: ethers.utils.hexValue(chainInfo.chainId),
                        }],
                });
            }
            catch (e) {
                if (e.code === 4902) {
                    try {
                        await this.ethereum.request({
                            method: "wallet_addEthereumChain", params: [{
                                    chainId: ethers.utils.hexValue(chainInfo.chainId),
                                    chainName: chainInfo.name,
                                    nativeCurrency: chainInfo.currency,
                                    rpcUrls: [chainInfo.rpc],
                                    blockExplorerUrls: [chainInfo.blockExplorer]
                                }],
                        });
                        await this.ethereum.request({
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
            return await this.ethereum.request({
                method: "personal_sign",
                params: [utils.hexlify(utils.toUtf8Bytes(message)), address],
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
export default new MetaMask();
//# sourceMappingURL=MetaMask.js.map