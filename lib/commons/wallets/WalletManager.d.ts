import { BigNumber, providers } from "ethers";
import { BlockchainType, EventContainer } from "gaia-commons-ts";
export default class WalletManager extends EventContainer {
    private chain?;
    private static readonly wallets;
    private __connectedWallet;
    constructor(chain?: BlockchainType | undefined);
    private init;
    private set _connectedWallet(value);
    private get _connectedWallet();
    get provider(): providers.Web3Provider;
    get signer(): providers.JsonRpcSigner;
    private connectedWallet;
    connected(): Promise<boolean>;
    connect(): Promise<void>;
    currentChain(): Promise<BlockchainType | undefined>;
    changeToTargetChain(): Promise<void>;
    getBalance(): Promise<BigNumber>;
    address(): Promise<string | undefined>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=WalletManager.d.ts.map