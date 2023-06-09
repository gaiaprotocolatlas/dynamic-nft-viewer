import { BigNumber, ethers } from "ethers";
import { BlockchainType, EventContainer, WalletType } from "gaia-commons-ts";
import IWallet from "./IWallet.js";
declare class WalletConnect extends EventContainer implements IWallet {
    walletType: WalletType;
    provider: ethers.providers.Web3Provider;
    signer: ethers.providers.JsonRpcSigner;
    private walletConnectProvider;
    constructor();
    private checkAndFireConnectionEvent;
    connect(): Promise<void>;
    connected(): Promise<boolean>;
    getAddress(): Promise<string | undefined>;
    currentChain(): Promise<BlockchainType | undefined>;
    changeChain(targetChain: BlockchainType): Promise<void>;
    getBalance(): Promise<BigNumber>;
    signMessage(message: string): Promise<string>;
    signMessageForGaiaLogin(nonce: string): Promise<string>;
    disconnect(): Promise<void>;
}
declare const _default: WalletConnect;
export default _default;
//# sourceMappingURL=WalletConnect.d.ts.map