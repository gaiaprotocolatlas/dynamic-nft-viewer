import GaiaProtocolGods from "./view/GaiaProtocolGods.js";
import ShigorSparrows from "./view/ShigorSparrows.js";
(async () => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("collection") && urlParams.has("tokenId")) {
        if (urlParams.get("collection") === "gaia-protocol-gods") {
            new GaiaProtocolGods({ id: urlParams.get("tokenId") });
        }
        else if (urlParams.get("collection") === "shigor-sparrows") {
            new ShigorSparrows({ id: urlParams.get("tokenId") });
        }
    }
})();
//# sourceMappingURL=main.js.map