import { BlockchainInfos, BlockchainType } from "gaia-commons-ts";
import DomNode from "../../dom/DomNode.js";
import el from "../../dom/el.js";
import msg from "../../msg.js";
import GaiaComponent from "../GaiaComponent.js";
import Tooltip from "../Tooltip.js";
class BlockchainLogo extends DomNode {
    tooltip;
    constructor(chain) {
        super(".blockchain-logo");
        this.append(el("img", { src: `https://resources.gaia.cc/blockchain-logos/${chain}.svg` }), this.tooltip = new Tooltip({}, BlockchainInfos[chain].name));
        this.onDom("mouseover", () => {
            const rect = this.rect;
            this.tooltip.show(rect.width / 2, rect.height);
        });
        this.onDom("mouseout", () => this.tooltip.hide());
    }
}
export default class AssetItem extends GaiaComponent {
    asset;
    checkboxContainer;
    constructor(asset) {
        super(".asset-item");
        this.asset = asset;
        this.append(el("img.logo", { src: asset.image }), el("main", el("h5", msg(asset.name)), el(".blockchain-logos", asset.addresses[BlockchainType.Ethereum] !== undefined ? new BlockchainLogo(BlockchainType.Ethereum) : undefined, asset.addresses[BlockchainType.Polygon] !== undefined ? new BlockchainLogo(BlockchainType.Polygon) : undefined, asset.addresses[BlockchainType.BNB] !== undefined ? new BlockchainLogo(BlockchainType.BNB) : undefined, asset.addresses[BlockchainType.Bifrost] !== undefined ? new BlockchainLogo(BlockchainType.Bifrost) : undefined, asset.addresses[BlockchainType.Klaytn] !== undefined ? new BlockchainLogo(BlockchainType.Klaytn) : undefined)), this.checkboxContainer = el(".checkbox-container"));
        this.onDom("click", () => this.fireEvent("select"));
    }
    check() {
        this.addClass("checked");
        this.checkboxContainer.empty().append(el("i.fa-solid.fa-check"));
    }
    uncheck() {
        this.deleteClass("checked");
        this.checkboxContainer.empty();
    }
}
//# sourceMappingURL=AssetItem.js.map