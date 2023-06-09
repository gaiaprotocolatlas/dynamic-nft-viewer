import { BigNumber, ethers } from "ethers";
import { BlockchainType, EventContainer, WalletType } from "gaia-commons-ts";
import IWallet from "./IWallet.js";
declare class MetaMask extends EventContainer implements IWallet {
    walletType: WalletType;
    provider: ethers.providers.Web3Provider | undefined;
    signer: ethers.providers.JsonRpcSigner | undefined;
    private ethereum;
    private get installed();
    private store;
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
declare const _default: MetaMask;
export default _default;
//# sourceMappingURL=MetaMask.d.ts.map