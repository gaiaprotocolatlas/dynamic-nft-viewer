import { BigNumber, ethers } from "ethers";
import { BlockchainType, EventContainer, WalletType } from "gaia-commons-ts";
import IWallet from "./IWallet.js";
declare class Klip extends EventContainer implements IWallet {
    private static readonly BAPP_NAME;
    walletType: WalletType;
    provider: ethers.providers.Web3Provider | undefined;
    signer: ethers.providers.JsonRpcSigner | undefined;
    private store;
    private klipQRPopup;
    private request;
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
declare const _default: Klip;
export default _default;
//# sourceMappingURL=Klip.d.ts.map