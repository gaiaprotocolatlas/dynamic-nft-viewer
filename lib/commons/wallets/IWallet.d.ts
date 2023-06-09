import { BigNumber, ethers } from "ethers";
import { BlockchainType, EventContainer, WalletType } from "gaia-commons-ts";
export default interface IWallet extends EventContainer {
    walletType: WalletType;
    provider: ethers.providers.Web3Provider | undefined;
    signer: ethers.providers.JsonRpcSigner | undefined;
    connect(): Promise<void>;
    connected(): Promise<boolean>;
    getAddress(): Promise<string | undefined>;
    currentChain(): Promise<BlockchainType | undefined>;
    changeChain(targetChain: BlockchainType): Promise<void>;
    getBalance(): Promise<BigNumber>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=IWallet.d.ts.map