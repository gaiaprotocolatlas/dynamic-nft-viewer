import { BigNumber, ethers } from "ethers";
import { BlockchainType, EventContainer, WalletType } from "gaia-commons-ts";
import IWallet from "./IWallet.js";
declare class Kaikas extends EventContainer implements IWallet {
    walletType: WalletType;
    provider: ethers.providers.Web3Provider | undefined;
    signer: ethers.providers.JsonRpcSigner | undefined;
    private klaytn;
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
declare const _default: Kaikas;
export default _default;
//# sourceMappingURL=Kaikas.d.ts.map