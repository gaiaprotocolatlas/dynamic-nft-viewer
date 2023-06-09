import Router from "./gaia-commons-browser/Router.js";
import GaiaProtocolGods from "./view/GaiaProtocolGods.js";
import ShigorSparrows from "./view/ShigorSparrows.js";
(async () => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("collection") && urlParams.has("tokenId")) {
        Router.goNoHistory(`${urlParams.get("collection")}/${urlParams.get("tokenId")}`);
    }
    Router.route("gaia-protocol-gods/{id}", GaiaProtocolGods);
    Router.route("shigor-sparrows/{id}", ShigorSparrows);
})();
//# sourceMappingURL=main.js.map