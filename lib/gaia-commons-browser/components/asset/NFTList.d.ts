import { AssetMetadata } from "gaia-commons-ts";
import GaiaComponent from "../GaiaComponent.js";
export default class NFTList extends GaiaComponent {
    private itemSet;
    constructor(options: {
        metadataSet: AssetMetadata[];
    });
    set metatdataSet(metatdataSet: AssetMetadata[]);
    get selectedMetadataSet(): AssetMetadata[];
    select(tokenId: string): void;
}
//# sourceMappingURL=NFTList.d.ts.map