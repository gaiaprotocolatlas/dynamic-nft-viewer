import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, utils } from "ethers";
import { BlockchainInfos, EventContainer, WalletType } from "gaia-commons-ts";
import Constants from "../Constants.js";
class WalletConnect extends EventContainer {
    walletType = WalletType.WalletConnect;
    provider;
    signer;
    walletConnectProvider;
    constructor() {
        super();
        this.walletConnectProvider = new WalletConnectProvider({ rpc: "https://cloudflare-eth.com" });
        this.provider = new ethers.providers.Web3Provider(this.walletConnectProvider);
        this.signer = this.provider.getSigner();
        this.walletConnectProvider.on("chainChanged", () => this.fireEvent("changechain"));
        this.walletConnectProvider.on("accountsChanged", () => this.fireEvent("changeaccount"));
        this.checkAndFireConnectionEvent();
    }
    async checkAndFireConnectionEvent() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }
    async connect() {
        await this.walletConnectProvider.enable();
        this.checkAndFireConnectionEvent();
    }
    async connected() {
        return await this.getAddress() !== undefined;
    }
    async getAddress() {
        if (this.walletConnectProvider.connected !== true) {
            return undefined;
        }
        return (await this.provider.listAccounts())[0];
    }
    async currentChain() {
        const network = await this.provider.getNetwork();
        for (const [chain, info] of Object.entries(BlockchainInfos)) {
            if (info.chainId === network.chainId) {
                return chain;
            }
        }
    }
    async changeChain(targetChain) {
        const chainInfo = BlockchainInfos[targetChain];
        if (chainInfo === undefined) {
            throw new Error(`Unknown chain ${targetChain}`);
        }
        else {
            try {
                await this.walletConnectProvider.request({
                    method: "wallet_addEthereumChain", params: [{
                            chainId: ethers.utils.hexValue(chainInfo.chainId),
                            chainName: chainInfo.name,
                            nativeCurrency: chainInfo.currency,
                            rpcUrls: [chainInfo.rpc],
                            blockExplorerUrls: [chainInfo.blockExplorer]
                        }],
                });
            }
            catch (e) {
                console.error(e);
            }
            await this.walletConnectProvider.request({
                method: "wallet_switchEthereumChain", params: [{
                        chainId: ethers.utils.hexValue(chainInfo.chainId),
                    }],
            });
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
            return await this.walletConnectProvider.request({
                method: "personal_sign",
                params: [utils.hexlify(utils.toUtf8Bytes(message)), address],
            });
        }
    }
    async signMessageForGaiaLogin(nonce) {
        return await this.signMessage(Constants.GAIA_LOGIN_NONCE_PREFIX + nonce);
    }
    async disconnect() {
        await this.walletConnectProvider.disconnect();
        this.fireEvent("disconnect");
    }
}
export default new WalletConnect();
//# sourceMappingURL=WalletConnect.js.map